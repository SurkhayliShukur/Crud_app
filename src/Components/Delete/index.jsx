import React, { useContext } from 'react'
import { Context } from "../../Context/Context"
import { toast } from "react-toastify";
import { DeleteUsers } from '../../Api/apiRequest';
import { useMutation, useQueryClient } from "react-query";

const Delete = () => {
    const { show, deleteItem, closeDelModal } = useContext(Context)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: DeleteUsers, // (userId) => DeleteUser(userId),
        onSuccess: () => {
          queryClient.invalidateQueries(["users"]);
          closeDelModal();
          toast.success("User deleted successfully!", {
            autoClose: 1000,
          });
        },
      });
    return (
        <>

            <dialog className="modal" open={show} onClose={closeDelModal}>
                <div className="modal-box">
                    Are you sure you want to delete
                    <br />
                    <span>
                        {deleteItem && deleteItem.fullName} ?
                    </span>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <button
                                className='btn btn-error text-white'
                                onClick={() => mutation.mutate(deleteItem.id)}>
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Delete