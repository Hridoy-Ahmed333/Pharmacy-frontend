import { useState } from "react";
import LoginForm from "../Components/LoginForm";
import SignUpFrom from "../Components/SignUpFrom";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f8ff; // LightSkyBlue
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  margin: 100px auto;
`;

function Login() {
  const [set, setSet] = useState(false);
  return (
    <FormContainer>
      <div>{set ? <LoginForm /> : <SignUpFrom setSet={setSet} />}</div>
      <button onClick={(e) => setSet(!set)}>{set ? "Login" : "Sign up"}</button>
    </FormContainer>
  );
}

export default Login;
