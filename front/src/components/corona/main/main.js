/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Doughnut, Bar } from "react-chartjs-2";
import styled from "styled-components";
import * as d3 from "d3";
import * as topojson from "topojson";
import koreaMap from "../../../data/map/skorea-municipalities-2018-topo-simple.json";
import DataBox from "./DataBox";
import DataTextContent from "./DataTextContent";
import TitleText from "./TitleText";
import SmallText from "./SmallText";
import DataTextList from "./DataTextList";

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 90%;
`;

const MapBox = styled.div`
  border: 1px solid #ccc;
  margin-top: 25px;
  width: 80%;
  display: flex;
  justify-content: center;
`;

// const DataTextBox = styled.div`
//   width: 100%;
// `;

const DataChartBox = styled.div`
  max-width: 500px;
  width: 50%;
  height: 100%;
  border: 1px solid #ccc;
`;

const DataTooltip = styled.div`
  background: white;
  position: absolute;
  white-space: pre;
  border-1px: 1px solid #ccc;
`;

const main = (props) => {
  const store = props.store.CoronaStore;

  const data = {
    labels: ["검사중", "양성", "음성"],
    datasets: [
      {
        data: [
          store.koreaData.checkingPercentage,
          store.koreaData.casePercentage,
          store.koreaData.notcasePercentage,
        ],
        backgroundColor: ["#0E4BEF", "#E71837", "#90ee90"],
        hoverBackgroundColor: ["#31639C", "#C4342D", "#FFCE56"],
      },
    ],
  };

  const options = {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 20,
      },
    },
    maintainAspectRatio: false,
  };

  const data2 = {
    labels: [
      store.koreaData.city1n,
      store.koreaData.city2n,
      store.koreaData.city3n,
      store.koreaData.city4n,
      store.koreaData.city5n,
    ],
    datasets: [
      {
        data: [
          store.koreaData.city1p,
          store.koreaData.city2p,
          store.koreaData.city3p,
          store.koreaData.city4p,
          store.koreaData.city5p,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FFED56",
          "#32A2BE",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FFED56",
          "#32A2BE",
        ],
      },
    ],
  };

  const barData = {
    labels: ["완치자 수", "사망자 수", "전날 대비 환자 수"],
    datasets: [
      {
        label: "오늘의 코로나 데이터",
        backgroundColor: "rgba(255,99,132,0.8)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,122,252,1)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [
          store.koreaData.TodayRecovered,
          store.koreaData.TodayDeath,
          store.koreaData.TotalCaseBefore,
        ],
      },
    ],
  };

  const showTooltip = (evt, d) => {
    console.log(d);
    let tooltip = document.getElementById("tooltip");
    tooltip.textContent = `${d.name}
    확진자: ${d.totalCase}
    격리해제: ${d.recovered}
    사망: ${d.death}`;
    // tooltip.innerHTML = `${d.name}
    // 확진자: ${d.totalCase}
    // 격리해제: ${d.recovered}
    // 사망: ${d.death}`;
    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX + 10 + "px";
    tooltip.style.top = evt.pageY + 10 + "px";
  };

  const hideTooltip = () => {
    let tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
  };

  const startDrawingMap = () => {
    const geojson = topojson.feature(
      koreaMap,
      koreaMap.objects.skorea_municipalities_2018_geo
    );
    const width = 800;
    const height = 600;
    const svg = d3
      .select(".d3")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    const map = svg.append("g");
    //geoMercator 메르카토르 투사법
    const projection = d3.geoMercator().scale(1).translate([0, 0]);
    //path 객체 따내기
    const path = d3.geoPath().projection(projection);
    //경계를 잡고 싶으면 bounds사용 bounds 1차원 배열은 xmax, xmin = longtitude, 2차원 배열은 ymax, ymin = lattitude
    const bounds = path.bounds(geojson);
    //축척 만들기
    const widthScale = (bounds[1][0] - bounds[0][0]) / width;
    const heightScale = (bounds[1][1] - bounds[0][1]) / height;
    const scale = 1 / Math.max(widthScale, heightScale);
    //translate
    const xoffset =
      width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2 + 10;
    const yoffset =
      height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2 - 10;
    const offset = [xoffset, yoffset];
    projection.scale(scale).translate(offset);
    map
      .selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("d", path);

    svg
      .append("g")
      .selectAll("svg")
      .data(store.cityData)
      .enter()
      .append("svg:image")
      .attr("width", 32)
      .attr("height", 32)
      .attr("x", (d) => projection([d.lon, d.lat])[0])
      .attr("y", (d) => projection([d.lon, d.lat])[1] - 100)
      .attr("opacity", 0)
      .attr("xlink:href", "/images/red.png")
      .on("mouseover", (d) => {
        showTooltip(d3.event, d);
      })
      .on("mouseout", () => {
        hideTooltip();
      })
      .transition()
      .ease(d3.easeElastic)
      .duration(3000)
      .delay((d, i) => i * 120)
      .attr("opacity", 1)
      .attr("y", (d) => projection([d.lon, d.lat])[1]);
  };

  useEffect(() => {
    store.getKoreaData().then(() => {
      store.getCityData().then(() => {
        startDrawingMap();
      });
    });
  }, [props.store.CoronaStore]);

  //data 배열로 받아서 리스트만큼 띄우게

  return (
    <DataContainer>
      <DataBox justify="center">
        <DataTextContent size="big">
          <p>총 확진자</p>
          <TitleText>{store.koreaData.TotalCase}명</TitleText>
          <SmallText>{store.koreaData.updateTime}</SmallText>
        </DataTextContent>
      </DataBox>
      <DataBox>
        <DataTextList
          colors={["white", "white", "white"]}
          labels={["현 확진자", "격리 해제", "총 사망"]}
          data={[
            store.koreaData.NowCase,
            store.koreaData.TotalRecovered,
            store.koreaData.TotalDeath,
          ]}
        />
      </DataBox>
      <DataBox>
        <DataTextList
          colors={["white", "white", "white"]}
          labels={barData.labels}
          data={[
            store.koreaData.TodayRecovered,
            store.koreaData.TodayDeath,
            store.koreaData.TotalCaseBefore,
          ]}
        />
        <DataChartBox>
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </DataChartBox>
      </DataBox>
      <DataBox>
        <DataChartBox>
          <Doughnut data={data} options={options} />
        </DataChartBox>
        <DataTextList
          colors={["white", "white", "white"]}
          labels={data.labels}
          data={[
            store.koreaData.checkingCounter,
            store.koreaData.caseCount,
            store.koreaData.notcaseCount,
          ]}
        />
      </DataBox>
      <DataBox>
        <DataTextList
          colors={["white", "white", "white", "white", "white"]}
          labels={data2.labels}
          data={[
            store.koreaData.city1p,
            store.koreaData.city2p,
            store.koreaData.city3p,
            store.koreaData.city4p,
            store.koreaData.city5p,
          ]}
        />
        <DataChartBox>
          <Doughnut data={data2} options={options} />
        </DataChartBox>
      </DataBox>
      <MapBox>
        <div className="d3" />
      </MapBox>
      <DataTooltip id="tooltip" />
    </DataContainer>
  );
};

export default inject("store")(observer(main));
