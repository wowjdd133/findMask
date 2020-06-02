import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";

const DataTextContentStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 2rem;
  font-weight: 700;
  width: ${(props) => (props.size === "big" ? "80%" : "30%")};
  opacity: 0.7;
  background: ${(props) => props.color};
  border: 2px solid #ccc;
  border-radius: 15px;
  height: 100%;
  margin: 0px 15px 0px 15px;
`;

const DataTextContent = (props) => {
  console.log("DataTextContent");
  return (
    <DataTextContentStyle size={props.size}>
      {props.children}
    </DataTextContentStyle>
  );
};

export default observer(DataTextContent);
