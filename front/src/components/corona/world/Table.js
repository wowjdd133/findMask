import React from "react";
import TableContent from "rc-table";
import "./Table.css";
import styled from "styled-components";

const columns = [
  {
    title: "나라",
    dataIndex: "Country",
    key: "Country",
    width: 300,
    align: "center",
  },
  {
    title: "확진자",
    dataIndex: "TotalConfirmed",
    key: "TotalConfirmed",
    width: 300,
    align: "center",
  },
  {
    title: "격리 해제",
    dataIndex: "TotalRecovered",
    key: "TotalRecovered",
    width: 300,
    align: "center",
  },
  {
    title: "사망자",
    dataIndex: "TotalDeaths",
    key: "TotalDeaths",
    width: 300,
    align: "center",
  },
];

const BodyRow = styled.tr`
  & td {
    transition: all 0.3s;
    padding: 0,
    position: relative;
    border: 1px solid #ccc;
    border-top: 0;
    border-left: 0;
    box-sizing: 1px;
    white-space: normal;
    word-break: break-word;
  }
  &:hover td {
    background: palevioletred;
    transform: scale(1.01);
  }
`;

const components = {
  body: {
    row: BodyRow,
  },
};

const Table = (props) => {
  console.log("Table");
  return (
    <TableContent
      columns={columns}
      data={props.data}
      components={components}
      rowKey="Country"
    />
  );
};

export default React.memo(Table);
