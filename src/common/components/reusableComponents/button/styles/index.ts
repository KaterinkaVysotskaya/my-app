import styled from "styled-components";

export const ButtonWrap = styled.div<ButtonWrap>`
  button {
    width: ${(props) => props.width ? props.width : '127px'};
    height: 36px;
    background: rgba(54, 110, 255, 1);
    box-shadow: 0 4px 18px rgba(54, 110, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    border: 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.01em;
    color: #fff;
    cursor: pointer;
  }

  button:hover {
    background: rgb(34, 93, 241);;
  }
`

type ButtonWrap = { width?: string }