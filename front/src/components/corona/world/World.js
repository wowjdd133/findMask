import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import styled from "styled-components";
import Line from "./LineChart";
import Table from "./Table";
import Spinner from "./Spinner";
import Map from "./Map";

const WorldContainer = styled.div`
  height: 100%;
  width: 80%;
`;

const WorldContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DataBox = styled.div`
  margin-top: 25px;
  width: 80%;
`;

const World = (props) => {
  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "확진자",
        fill: false,
        backgroundColor: "rgb(0,0,255)",
        borderColor: "rgb(0,0,255)",
        data: [],
      },
      {
        label: "사망",
        fill: false,
        backgroundColor: "rgb(255,0,0)",
        borderColor: "rgb(255,0,0)",
        data: [],
      },
      {
        label: "격리 해제",
        fill: false,
        backgroundColor: "rgb(0,255,0)",
        borderColor: "rgb(0,255,0)",
        data: [],
      },
    ],
  });
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

  const setData = (country) => {
    coronaData.values[country.CountryCode] = {
      ...country,
    };
  };

  useEffect(() => {
    setLoading(true);
    store
      .getWorldWIPDataToISODate()
      .then(() => {
        reformChartData(store.worldWIPData).then(() => {
          store
            .getWorldData()
            .then(() => {
              setLoading(false);
              store.worldData.Countries.forEach((country) => {
                setData(country);
              });
              new svgMap({
                targetElementID: "svgMap",
                data: coronaData,
                colorMax: "#CC0033",
                colorMin: "#FFE5D9",
                colorNoData: "#E2E2E2",
              });
              console.log("done");
            })
            .catch((err) => {
              console.error(err);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //array.push가 먹히지 않아서 array를 새로 선언하고 그대로 넣어줌.
  const reformChartData = async (data) => {
    let array = [];
    let array2 = [];
    let array3 = [];
    let array4 = [];
    await data.forEach((wipData, i) => {
      array4.unshift(i + "일전");
      array.push(wipData.TotalConfirmed);
      array2.push(wipData.TotalDeaths);
      array3.push(wipData.TotalRecovered);
    });
    setChartData({
      labels: array4,
      datasets: [
        {
          ...chartData.datasets[0],
          data: array,
        },
        {
          ...chartData.datasets[1],
          data: array2,
        },
        {
          ...chartData.datasets[2],
          data: array3,
        },
      ],
    });
  };

  return (
    <WorldContainer>
      <WorldContent>
        <DataBox>
          <Line data={chartData} loading={loading} />
        </DataBox>
        <DataBox>{loading ? <Spinner /> : <Map />}</DataBox>
        <DataBox>
          <Table data={store.worldData.Countries} />
        </DataBox>
      </WorldContent>
    </WorldContainer>
  );
};

export default inject("store")(observer(World));
