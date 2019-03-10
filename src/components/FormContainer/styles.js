import styled from "styled-components";

const Form = styled.form`
  padding: 20px 0;

  @media (max-width: 767px) {
    height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 10px;
  }

  input {
    padding: 10px;
    border: 1px solid #f4f4f4;
    border-radius: 4px;
    margin-bottom: 10px;
    font-size: 14px;
    width: 100%;
  }
`;

export default Form;
