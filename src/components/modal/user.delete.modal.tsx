import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
interface IUser {
  email?: string;
  name?: string;
  id?: number;
}
interface IProps {
  isOpenDeleteModal: boolean;
  setIsOpenDeleteModal: (isOpen: boolean) => void;
  dataUser: IUser | null;
}
const UserDeleteModal = (props: IProps) => {
  const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newUser: IUser) => {
      const res = await fetch(`http://localhost:8000/users/${dataUser?.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": " application/json",
        },
      });
      return res.json();
    },

    onSuccess(data, variables, context) {
      toast.success("Delete user successfully", { position: "top-right" });
      setIsOpenDeleteModal(false);
      //refetch users
      queryClient.invalidateQueries({ queryKey: ["fetchUser"] });
    },
  });
  const handleSubmit = () => {
    mutation.mutate({ id: dataUser?.id });
  };

  return (
    <Modal
      show={isOpenDeleteModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={false}
      onHide={() => setIsOpenDeleteModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete A User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the user: {dataUser?.email ?? ""}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => setIsOpenDeleteModal(false)}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteModal;
