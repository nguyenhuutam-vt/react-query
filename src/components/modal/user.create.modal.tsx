import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { QUERY_KEYS } from "../../config/key";

interface IUser {
  email: string;
  name: string;
}

const UserCreateModal = (props: any) => {
  const queryClient = useQueryClient();
  const { isOpenCreateModal, setIsOpenCreateModal } = props;
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async (newUser: IUser) => {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
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
      toast.success("Create user successfully", { position: "top-right" });
      setIsOpenCreateModal(false);
      setEmail("");
      setName("");
      //refetch users
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.fetchUser });
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
    //call api => call redux
    // mutation dùng để thực hiện các thao tác thay đổi dữ liệu trên server như:
    // tạo mới, cập nhật, xóa (POST, PUT, DELETE...).
    mutation.mutate({ email: email, name: name });
  };

  return (
    <>
      <Modal
        show={isOpenCreateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add A New User</Modal.Title>
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
            onClick={() => setIsOpenCreateModal(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCreateModal;
