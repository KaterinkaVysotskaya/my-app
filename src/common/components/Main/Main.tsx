import Routes from "../Routing/Routes";
import React from "react";
import styled from "styled-components";

export const MainComponent = styled.div`
  min-height: 100vh;
  min-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /*align-items: center;*/
  flex-wrap: wrap;
  background: #F9F9FA;
`
export const Main = ()=>{
    return(
        <MainComponent>
            <Routes/>
        </MainComponent>

    )
}