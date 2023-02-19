import styled from "styled-components";

export const SettingsContainer = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0;
  text-align: left;
  align-items: center;
  color: #000000;
  padding-bottom: 8px;
`

type ToolContainerProps = {
    width?: string
}
export const ToolContainer = styled.div<ToolContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 30px 0px;
  width: ${(props) => props.width ? props.width : '127px'};
`

export const Box = styled.div`
  box-sizing: border-box;
  width: 36px;
  height: 36px;
  left: 817px;
  top: 192px;
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SliderContainer = styled.div`
display: flex;
`
