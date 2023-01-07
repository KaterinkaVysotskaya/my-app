import styled from "styled-components";

export  const ProfileData = styled.div`
  display: flex;
  justify-content: space-between;
  width: 230px;
`
export const HeaderContainer = styled.div`
  height: 60px;
  background: rgba(252, 252, 252, 1);
  background: #FCFCFC;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 10px rgb(109 109 109 / 25%), inset 0px 1px 0px rgb(255 255 255 / 30%);
  padding: 0 136px;
`

export const ProfileName = styled.span`
  height: 32px;
  width: 35px;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  color: #000000;
`
export const ProfileAvatar = styled.img`
  display: flex;
  width: 36px;
  height: 36px;
`
