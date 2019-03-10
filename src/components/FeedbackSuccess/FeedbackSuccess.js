import React from "react";
import FeedbackSuccessContainer from "./styles";
import { Button } from "../Button/styles";
import iconOk from "../../assets/ok.png";

const FeedbackSuccess = ({ onClick }) => (
  <FeedbackSuccessContainer>
    <img src={iconOk} alt="Sucesso" />
    <Button onClick={onClick} colorPrimary rounded fluid>
      Cadastrar mais funcionários
    </Button>
  </FeedbackSuccessContainer>
);

export default FeedbackSuccess;
