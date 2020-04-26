import React from "react";
import styled from "styled-components";

const Sidebar = styled.div`
  display: flex;
  height: 100%;
  width: 25%;
  top: 0;
  right: 0;
  overflow-x: hidden;
  transition: 0.5s;
  background: white;
  align-items: center;
  justify-content: center;
`;

const SideContent = styled.div`
  text-align: center;
  height: 60%;
  padding: 15px 15px 25px 25px;
`;

const sidebar = ({ store }) => {
  console.log(store.selectData);
  return (
    <Sidebar>
      <SideContent>
        <h1>{store.selectData.name}</h1>
        <p>{store.getRemainStatToNum(store.selectData.remain_stat)}</p>
        <p>{store.selectData.addr}</p>
        <p>{store.selectData.stock_at}</p>
        <p>{store.selectData.created_at}</p>
      </SideContent>
    </Sidebar>
  );
};

export default sidebar;
