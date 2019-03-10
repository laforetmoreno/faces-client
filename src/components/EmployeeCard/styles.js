import styled from "styled-components";

export const EmployeeCardContainer = styled.div`
  width: 200px;
  height: 300px;
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 20px;
`;

export const EmployeeCardContent = styled.div`
  width: 200px;
  height: 300px;
  position: absolute;
  margin: 0 50px;
  color: transparent;
`;
