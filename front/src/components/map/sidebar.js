import React, { useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

const Sidebar = styled.div`
  display: flex;
  height: 100%;
  width: 480px;
  top: 0;
  right: 0;
  overflow-x: hidden;
  transition: 0.5s;
  background: white;
  align-items: center;
  justify-content: center;
`;

const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 60%;
  padding: 15px 15px 25px 25px;
  font-size: 23px;
`;

const GetDirectionBox = styled.div`
  border: 1px solid #000000;
  background: rgba(255, 255, 255, 0.4);
  font-size: 32px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

const Button = styled.button`
  width: 45px;
  height: 45px;
  background-image: url("/images/exit.png");
  background-size: cover;
`;

//select Data 보여주는 바
const sidebar = ({ store, setShowSidebar }) => {
  let data = store.selectData;
  console.log(data);
  return (
    <Sidebar>
      <SideContent>
        <Button
          onClick={(e) => {
            setShowSidebar(false);
          }}
        />
        <h1>{data.name}</h1>
        <p>수량: {store.getRemainStatToNum(data.remain_stat)}</p>
        <p>입고시간: {data.stock_at}</p>
        <p>갱신일자: {data.created_at}</p>
        <p>주소: {data.addr}</p>
        <GetDirectionBox>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://map.kakao.com/link/to/${data.name},${data.lat},${data.lng}`}
          >
            길찾기
          </a>
        </GetDirectionBox>
      </SideContent>
    </Sidebar>
  );
};

export default observer(sidebar);
