import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import Spinner from "react-spinner-material";
import Table from "rc-table";
import { Line } from "react-chartjs-2";
import "./World.css";

const WorldContainer = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Map = styled.div`
  margin-top: 25px;
  width: 1000px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

const chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const World = (props) => {
  const [loading, setLoading] = useState(false);
  const store = props.store.CoronaWorldStore;
  let coronaData = {
    data: {
      TotalConfirmed: {
        name: "확진자",
        format: "{0} 명",
        thousandSeparator: ",",
        thresholdMax: 1000000,
        thresholdMin: 10000,
      },
      TotalDeaths: {
        name: "사망자",
        format: "{0} 명",
      },
    },
    applyData: "TotalConfirmed",
    values: {},
  };

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

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await store.getWorldData();
      setLoading(false);
      console.log(store.worldData);
      store.worldData.Countries.forEach((data) => {
        coronaData.values[data.CountryCode] = {
          ...data,
        };
      });
      new svgMap({
        targetElementID: "svgCoronaMap",
        data: coronaData,
        colorMax: "#CC0033",
        colorMin: "#FFE5D9",
        colorNoData: "#E2E2E2",
      });

      const background = document.getElementsByClassName("svgMap-map-wrapper");
      background[0].setAttribute("background", "#E2E2E2");
    };
    getData();
  }, [store]);

  return (
    <WorldContainer>
      <Line data={chartData} />
      {loading != true ? (
        <Map id="svgCoronaMap" />
      ) : (
        <Map>
          <Spinner size={120} />{" "}
        </Map>
      )}
      <Table
        columns={columns}
        data={store.worldData.Countries}
        components={components}
      />
    </WorldContainer>
  );
};

export default inject("store")(observer(World));
