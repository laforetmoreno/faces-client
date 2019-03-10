import React, { Component } from "react";
import Form from "./styles";
import Button from "../Button/styles";

class FormContainer extends Component {
  state = {
    name: "",
    profession: "",
    sector: "",
    email: "",
    phone: ""
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    const { onSubmit } = this.props;

    e.preventDefault();

    if (onSubmit) {
      onSubmit(this.state);
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <input
          onChange={this.onChange}
          type="text"
          placeholder="Nome do funcionáio"
          name="name"
        />
        <input
          onChange={this.onChange}
          type="text"
          placeholder="Profissão"
          name="profession"
        />
        <input
          onChange={this.onChange}
          type="text"
          placeholder="Setor"
          name="sector"
        />
        <input
          onChange={this.onChange}
          type="text"
          placeholder="E-mail"
          name="email"
        />
        <input
          onChange={this.onChange}
          type="text"
          placeholder="Telefone (Opcional)"
          name="phone"
        />
        <Button colorPrimary rounded fluid>
          Cadastrar
        </Button>
      </Form>
    );
  }
}

export default FormContainer;
