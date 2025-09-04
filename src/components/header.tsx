import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFetchUsers } from "../config/fetch";
function Header() {
  const [mode, setMode] = useState("light");
  const queryClient = useQueryClient();

  // const [count, setCount] = useState(0);
  const { count } = useFetchUsers(1);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  return (
    <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
      <Container>
        <Navbar.Brand href="#home">Hỏi Dân IT React Query {count}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form.Check
            defaultChecked={mode === "light" ? false : true}
            onChange={(e) => {
              setMode(e.target.checked === true ? "dark" : "light");
            }}
            type="switch"
            id="custom-switch"
            label={
              mode === "light" ? (
                <Navbar.Text>Light mode</Navbar.Text>
              ) : (
                <Navbar.Text>Dark mode</Navbar.Text>
              )
            }
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
