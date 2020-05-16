/* eslint-disable */
import React from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

const Menu = styled.div`
  position: fixed;
  width: 200px;
  left: 0;
  height: 100%;
  z-index: 1;
  border-right: 1px solid #bdbdbd;
`;

const Menu_logo = styled.div`
  background-image: url("images/logo.jpg");
  width: 100%;
  height: 100px;
  background-size: cover;
  border-bottom: 1px solid #000000;
`;

const Menu_ul = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Menu_ll = styled.li`
  text-align: center;
  width: 100%;
  height: 50px;
  margin-top: 25px;
  font-size: 15px;
`;

const header = () => (
  <Menu>
    <Menu_logo />
    <Menu_ul>
      <Menu_ll>
        <Link to="/map">공적 마스크 위치 확인하기</Link>
      </Menu_ll>
      <Menu_ll>
        <Link to="/distributor">판매처 목록 확인하기</Link>
      </Menu_ll>
      <Menu_ll>
        <Link to="/world">세계 코로나 정보 확인하기</Link>
      </Menu_ll>
      <Menu_ll>
        <Link to="/">메인으로 돌아가기</Link>
      </Menu_ll>
    </Menu_ul>
  </Menu>
);

export default header;
