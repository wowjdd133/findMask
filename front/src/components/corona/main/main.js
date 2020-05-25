/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Doughnut, Bar } from "react-chartjs-2";
import styled from "styled-components";
import * as d3 from "d3";
import * as topojson from "topojson";
import koreaMap from "../../../data/map/skorea-municipalities-2018-topo-simple.json";

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 80%;
`;

const DataBox = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.justify === "center" ? "center" : "space-between"};
  height: 20%;
  width: 100%;
  border: 1px solid #ccc;
  margin-top: 25px;
  min-height: 200px;
`;

const MapBox = styled.div`
  border: 1px solid #ccc;
  margin-top: 25px;
  width: 80%;
  display: flex;
  justify-content: center;
`;

const DataTextBox = styled.div`
  width: 100%;
`;

const DataChartBox = styled.div`
  max-width: 400px;
  width: 40%;
  height: 100%;
  border: 1px solid #ccc;
`;

const DataTooltip = styled.div`
  background: white;
  position: absolute;
  white-space: pre;
  border-1px: 1px solid #ccc;
`;

const DataTextContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 2rem;
  font-weight: 700;
  width: ${(props) => (props.size === "big" ? "80%" : "30%")};
  opacity: 0.7;
  background: ${(props) => props.color};
  border-radius: 2px;
  height: 100%;
`;

const TitleText = styled.h1`
  font-size: 4rem;
  margin-top: 15px;
`;

const SmallText = styled.p`
  margin-top: 0.2rem;
  font-size: 0.75rem;
  margin-bottom: 0.44rem;
  color: gray;
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

  useEffect(() => {
    console.log(store);
    store.getKoreaData().then(() => {
      store.getCityData().then(() => {
        console.log(store.cityData);
        //topojson을 통해 koreaMap geoJson 객체 리턴
        const geojson = topojson.feature(
          koreaMap,
          koreaMap.objects.skorea_municipalities_2018_geo
        );
        //d3.geoCentroid로 geoJSON객체 중심 잡기.
        const center = d3.geoCentroid(geojson);
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

        const icons = svg
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
          .duration(2000)
          .delay((d, i) => i * 50)
          .attr("opacity", 1)
          .attr("y", (d) => projection([d.lon, d.lat])[1]);
      });
    });
  }, [props.store.CoronaStore]);

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
        <DataTextContent color="orange">
          <SmallText>현 확진자</SmallText>
          <p>{store.koreaData.NowCase}</p>
        </DataTextContent>
        <DataTextContent color="green">
          <SmallText>총 격리해제</SmallText>
          <p>{store.koreaData.TotalRecovered}</p>
        </DataTextContent>
        <DataTextContent color="red">
          <SmallText>총 사망</SmallText>
          <p>{store.koreaData.TotalDeath}</p>
        </DataTextContent>
      </DataBox>
      <DataBox>
        <p>여기는 오늘 확진자, 격리해제, 검사중?</p>
        <DataChartBox>
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </DataChartBox>
      </DataBox>
      <DataBox>
        <DataChartBox>
          <Doughnut data={data} options={options} />
        </DataChartBox>
        <DataTextBox>
          <p>양성, 음성, 검사중 자세한 데이터</p>
        </DataTextBox>
      </DataBox>
      <DataBox>
        <DataTextBox>
          <p data-tip="hello world">%를 글로 나타내기</p>
        </DataTextBox>
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
