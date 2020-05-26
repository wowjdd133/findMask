import React from "react";
import styled from "styled-components";

const DataBoxStyle = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.justify === "center" ? "center" : "space-between"};
  height: 20%;
  width: 100%;
  margin-top: 25px;
  min-height: 200px;
`;

const DataBox = (props) => {
  return <DataBoxStyle justify={props.justify}>{props.children}</DataBoxStyle>;
};

export default DataBox;
