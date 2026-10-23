import { useCrudActions } from "./useCrudActions";
import { useChange } from "../store/useChange";

const useHandler = () => {
    const { useAdd, useDelete, useUpdate } = useCrudActions();
    const { selectedIdToDelete, setSelectedIdToDelete,resetForm } = useChange();

    const addMutation = useAdd({ queryKey:['add'], initialFormValues: {} });
    const updateMutation = useUpdate({ queryKey:['update'], initialFormValues: {} });
    const deleteMutation = useDelete({queryKey:['delete']});

    const handelAdd = (url, data) => {
        addMutation.mutate({ url, data });
        resetForm()
    };

    const handleUpdate = (id, data, url) => {
updateMutation.mutate({ id, data, url });
    };

    const confirmDelete = (url) => {
        if (!selectedIdToDelete) return;
        deleteMutation.mutate({ id: selectedIdToDelete, url });
        setSelectedIdToDelete(null);
    };

    return { handelAdd, handleUpdate, confirmDelete,isAdding: addMutation.isPending, isUpdating:updateMutation.isPending , isDeleting:deleteMutation.isPending };
};

export default useHandler;