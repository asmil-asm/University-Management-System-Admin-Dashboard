import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import API from '../services/API';
import { useChange } from '../store/useChange';
import { queryClient } from '../lib/queryClient';
import { useMutation } from '@tanstack/react-query';

const prepareApiData = (data) => {
    if (data instanceof FormData) return data;

    let hasFile = false;
    const formData = new FormData();

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            
            if (key === 'existing_file') continue;

            if (key === 'form_file' && !(value instanceof File || value instanceof Blob)) {
                continue; 
            }

            if (value instanceof File || value instanceof Blob) {
                hasFile = true;
                formData.append(key, value);
            } else if (Array.isArray(value) && value.some(item => item instanceof File)) {
                hasFile = true;
                value.forEach(item => formData.append(key, item));
            } else if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        }
    }
    return hasFile ? formData : data;
};

export const useCrudActions = () => {
    const { t } = useTranslation();
    const { setShowAdd, setShowEidte, setShowDelete, setFormDataDirect,resetForm} = useChange();

    const handleError = (error) => {
        console.error(error);
        if (error.response?.data) {
            const errorData = error.response.data;
            if (typeof errorData === 'string') {
                toast.error(errorData);
                return;
            }
            const firstKey = Object.keys(errorData)[0];
            const firstErrorValue = errorData[firstKey];
            const firstErrorMessage = Array.isArray(firstErrorValue) ? firstErrorValue[0] : firstErrorValue;
            toast.error(`${firstKey}: ${firstErrorMessage}`);
        } else {
            toast.error(t('Server Error'));
        }
    };

    const getConfig = (isFormData = false) => {
        const token = localStorage.getItem("access");
        
        if (isFormData) {
            return {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };
        }

        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
    };

    const useAdd = ({ queryKey, initialFormValues }) => {
        return useMutation({
            mutationFn: async ({ url, data }) => {
                const processedData = prepareApiData(data);
                const isFormData = processedData instanceof FormData;
                
                const config = getConfig(isFormData);
                const response = await API.post(url, processedData, config);
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries( [queryKey] );
                toast.success(t('Added'));
if (initialFormValues) {
                setFormDataDirect(initialFormValues);
            } else {
                resetForm();   
            }                setShowAdd(false);
            },
            onError: handleError
        });
    };

    const useUpdate = ({ successMessage, queryKey, initialFormValues }) => {
        return useMutation({
            mutationFn: async ({ id, data, url }) => {
                const processedData = prepareApiData(data);
                const isFormData = processedData instanceof FormData;

                const config = getConfig(isFormData);
                const response = await API.patch(`${url}${id}/`, processedData, config);
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries( [queryKey] );
                toast.success(t(successMessage || 'Updated'));
if (initialFormValues) {
        setFormDataDirect(initialFormValues);
    } else {
        resetForm();
    }                setShowEidte(false);

                
            },
            onError: handleError,
        });
    };

    const useDelete = ({ queryKey, isFormData = false }) => {
        return useMutation({
            mutationFn: async ({ id, url }) => {
                const config = getConfig(isFormData);
                const response = await API.delete(`${url}${id}/`, config);
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries( [queryKey] );
                toast.success(t('Deleted'));
                setShowDelete(false);
            },
            onError: handleError,
        });
    };

    return { useAdd, useUpdate, useDelete };
};