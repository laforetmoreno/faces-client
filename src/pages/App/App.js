import React, { Component } from "react";
import GlobalStyle from "../../styles/global";
import Container from "../../components/Container/styles";
import {
  EmployeeCardContainer,
  EmployeeCardContent
} from "../../components/EmployeeCard/styles";
import CardsContent from "../../components/CardsContent/styles";
import Header from "../../components/Header/Header";
import api from "../../services/api";

class App extends Component {
  state = {
    users: [],
    st: false
  };

  async componentDidMount() {
    const req = await api.get("users");
    this.setState({ users: req.data });
  }

  render() {
    const { users, st } = this.state;
    return (
      <Container>
        <Header />
        <CardsContent>
          {users.map(user => (
            <div style={{ display: "flex" }}>
              <EmployeeCardContainer
                // className={classNames({ teste: st })}
                image={user.avatar}
                // onClick={this.teste}
              />
            </div>
          ))}
        </CardsContent>
        <GlobalStyle />
      </Container>
    );
  }
}

export default App;
