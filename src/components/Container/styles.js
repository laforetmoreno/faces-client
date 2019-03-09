import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  header {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: #fff;
      margin-left: 10px;
      font-size: 20px;
    }
  }
`;

export default Container;
