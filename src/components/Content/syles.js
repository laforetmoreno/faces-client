import styled from "styled-components";

const Content = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 30px;

  @media (max-width: 767px) {
    margin: 0;
    height: calc(100vh - 74px);
    max-width: none;
  }
`;
export default Content;
