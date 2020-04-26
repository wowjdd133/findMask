import React from "react";
import styled from "styled-components";
import { Provider } from "mobx-react";
import Routes from "./components/routes";
import stores from "./stores";

const Content = styled.div`
  position: relative;
  margin-left: 240px;
  height: 100%;
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
