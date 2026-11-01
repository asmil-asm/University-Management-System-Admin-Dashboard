import { useCrudActions } from "./useCrudActions";
import { useChange } from "../store/useChange";

const useHandler = ({listQueryKey}) => {
    const { useAdd, useDelete, useUpdate } = useCrudActions();
    const { selectedIdToDelete, setSelectedIdToDelete} = useChange();

    const addMutation    = useAdd({ queryKey: listQueryKey });
    const updateMutation = useUpdate({ queryKey: listQueryKey });
    const deleteMutation = useDelete({ queryKey: listQueryKey });

    const handelAdd = (url, data) => {
        addMutation.mutate({ url, data });
    };

    const handleUpdate = (id, data, url) => {
updateMutation.mutate({ id, data, url });
    };

    const confirmDelete = (url) => {
        if (selectedIdToDelete == null) return; 
        deleteMutation.mutate({ id: selectedIdToDelete, url });
        setSelectedIdToDelete(null);
    };

    return { handelAdd, handleUpdate, confirmDelete,isAdding: addMutation.isPending, isUpdating:updateMutation.isPending , isDeleting:deleteMutation.isPending };
};

export default useHandler;