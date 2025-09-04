import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IBlog } from "../blogs.table";
import { toast } from "react-toastify";

const BlogDeleteModal = (props: any) => {
  const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newBlog: IBlog) => {
      const res = await fetch(`http://localhost:8000/blogs/${dataBlog?.id}`, {
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
      queryClient.invalidateQueries({ queryKey: ["fetchBlog"] });
    },
  });
  const handleSubmit = () => {
    mutation.mutate({ id: dataBlog?.id });
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
        <Modal.Title>Delete A Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the blog: {dataBlog?.title ?? ""}</Modal.Body>
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

export default BlogDeleteModal;
