import React from "react";
import styled from "styled-components";

const MapStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Map = () => {
  console.log("map");
  return <MapStyle id="svgMap"></MapStyle>;
};

export default Map;
