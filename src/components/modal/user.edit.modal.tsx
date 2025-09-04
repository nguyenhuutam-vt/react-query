import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

interface IUser {
  email?: string;
  name?: string;
  id?: number;
}
interface IProps {
  isOpenUpdateModal: boolean;
  setIsOpenUpdateModal: (isOpen: boolean) => void;
  dataUser: IUser | null;
}
const UserEditModal = (props: IProps) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, dataUser } = props;
  const [id, setId] = useState<number | string | undefined>();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (dataUser) {
      setId(dataUser?.id || "");
      setEmail(dataUser?.email || "");
      setName(dataUser?.name || "");
    }
  }, [dataUser]);

  const mutation = useMutation({
    mutationFn: async (newUser: IUser) => {
      const res = await fetch(`http://localhost:8000/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          email: newUser?.email,
          name: newUser?.name,
        }),
        headers: {
          "Content-Type": " application/json",
        },
      });
      return res.json();
    },

    onSuccess(data, variables, context) {
      toast.success("Update user successfully", { position: "top-right" });
      setIsOpenUpdateModal(false);
      setEmail("");
      setName("");
      //refetch users
      queryClient.invalidateQueries({ queryKey: ["fetchUser"] });
    },
  });

  const handleSubmit = () => {
    if (!email) {
      alert("email empty");
      return;
    }
    if (!name) {
      alert("name empty");
      return;
    }
    mutation.mutate({ email: email, name: name, id: id });
  };

  return (
    <>
      <Modal
        show={isOpenUpdateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenUpdateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Name">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => setIsOpenUpdateModal(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserEditModal;
