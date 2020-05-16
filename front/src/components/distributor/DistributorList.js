import React from "react";
import styled from "styled-components";
import DistributorInfo from "./DistributorInfo";

const DistributorListBox = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
`;

const DistributorList = (props) => {
  const list = props.data.map((info) => (
    <DistributorInfo key={info.code} info={info} />
  ));
  return <DistributorListBox>{list}</DistributorListBox>;
};

export default DistributorList;
