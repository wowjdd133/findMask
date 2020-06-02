import styled from "styled-components";
import React from "react";
import { observer } from "mobx-react";

const TitleTextStyled = styled.h1`
  font-size: 4rem;
  margin-top: 15px;
`;

const TitleText = (props) => {
  return <TitleTextStyled>{props.children}</TitleTextStyled>;
};

export default observer(TitleText);
