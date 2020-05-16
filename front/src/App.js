import React from "react";
import styled from "styled-components";
import { Provider } from "mobx-react";
import Routes from "./components/routes";
import stores from "./stores";

const Content = styled.div`
  position: relative;
  height: 100%;
  padding-left: 200px;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <Provider store={stores}>
      <Content>
        <Routes />
      </Content>
    </Provider>
  );
}

export default App;
