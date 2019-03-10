import styled, { css } from "styled-components";

const Button = styled.button`
  color: #fff;
  padding: 20px;
  font-size: 16px;
  border: 0;
  margin-top: 20px;
  cursor: pointer;

  ${props =>
    props.rounded &&
    css`
      border-radius: 5px;
    `}

  ${props =>
    props.colorPrimary &&
    css`
      background: #e6207e;
    `}

  ${props =>
    props.colorBlue &&
    css`
      background: ##143a7c;
    `}

  ${props =>
    props.fluid &&
    css`
      width: 100%;
    `}

  ${props =>
    props.fluid &&
    css`
      width: 100%;
    `}
`;

export default Button;
