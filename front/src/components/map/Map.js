/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";

import styled from "styled-components";
import "./Map.css";
import Sidebar from "./sidebar";

const MapContent = styled.div`
  width: 100%;
  height: 100%;
`;

const MapContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
`;

const FilterContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 0;
  bottom: 0;
  width: 260px;
  height: 300px;
  z-index: 9999;
  border: 1px solid #000000;
  background: rgba(124, 255, 124, 0.6);
`;

const FilterContent = styled.div``;

const Map = ({ store }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [filters, setFilters] = useState([true, true, true, true, true]);
  // const [plentyChecked, setPlentyChecked] = useState(true);
  // const [someChecked, setSomeChecked] = useState(true);
  // const [fewChecked, setFewChecked] = useState(true);
  // const [emptyChecked, setEmptyChecked] = useState(true);
  // const [breakChecked, setBreakChecked] = useState(true);

  const handleChange = (e) => {
    // setFilters(...filters, !filters[e.target.name]);
    let data = [...filters];
    data[e.target.name] = !filters[e.target.name];
    setFilters([...data]);
    store.MapStore.hideMarker(data);
  };

  //create랑 display 나누기
  const displayMarker = (markerPosition, stat, map, name, code, MapStore) => {
    let imageSrc = "images/logo.jpg";
    imageSrc = MapStore.getRemainStatToImage(stat);

    const imageSize = new kakao.maps.Size(64, 69);
    const imageOption = {
      offset: new kakao.maps.Point(27, 69),
    };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
      clickable: true,
    });

    marker.setMap(map);

    const $content = document.createElement("div");
    $content.innerHTML = name;
    $content.name = code;
    $content.className = "overlay";
    $content.addEventListener(
      "click",
      (event) => {
        MapStore.getDataToCode(event.target.name);
      },
      {
        passive: true,
      }
    );

    const content = $content;

    const customOverlay = new kakao.maps.CustomOverlay({
      position: markerPosition,
      content,
      yAnchor: 2,
      zIndex: 2,
      clickable: true,
    });

    customOverlay.setMap(map);

    MapStore.setMarker(customOverlay, stat);

    // if (stat === "plenty" && !plentyChecked) {
    //   marker.setVisible(false);
    //   customOverlay.setVisible(false);
    // } else if (stat === "some" && !someChecked) {
    //   marker.setVisible(false);
    //   customOverlay.setVisible(false);
    // } else if (stat === "few" && !fewChecked) {
    //   marker.setVisible(false);
    //   customOverlay.setVisible(false);
    // } else if (stat === "empty" && !emptyChecked) {
    //   marker.setVisible(false);
    //   customOverlay.setVisible(false);
    // } else if (stat === "break" && !breakChecked) {
    //   marker.setVisible(false);
    //   customOverlay.setVisible(false);
    // }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    // eslint-disable-next-line operator-linebreak
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=74bbccc964da61465f5c3490a8256a77&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        store.MapStore.getData(33.450701, 126.570667);

        // eslint-disable-next-line no-unused-vars
        const map = new window.kakao.maps.Map(container, options);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            let locPosition = new kakao.maps.LatLng(lat, lng);

            store.MapStore.getData(lat, lng).then(() => {
              if (store.MapStore.maskData.count > 0) {
                const x = store.MapStore.maskData.count;
                for (let i = 0; i < x; i += 1) {
                  locPosition = new kakao.maps.LatLng(
                    store.MapStore.maskData.stores[i].lat,
                    store.MapStore.maskData.stores[i].lng
                  );
                  displayMarker(
                    locPosition,
                    store.MapStore.maskData.stores[i].remain_stat,
                    map,
                    store.MapStore.maskData.stores[i].name,
                    store.MapStore.maskData.stores[i].code,
                    store.MapStore
                  );
                }
              }
            });

            map.setCenter(locPosition);
          });
        }
      });
    };
  }, []);

  useEffect(() => {
    return () => {
      setShowSidebar(true);
    };
  }, [store.MapStore.selectData]);

  useEffect(() => {
    return () => {
      store.MapStore.getMarker();
    };
  }, []);

  return (
    <MapContainer>
      <FilterContainer>
        {filters.map((filter, index) => (
          <FilterContent>
            <input
              type="checkbox"
              checked={filter}
              onChange={handleChange}
              name={index}
            />
          </FilterContent>
        ))}
        {/* <FilterContent>
                <input
                  type="checkbox"
                  checked={plentyChecked}
                  onChange={handleChange}
                />
                <div>몇 개</div>
              </FilterContent> */}
        {/* <FilterContent>
                <input
                  type="checkbox"
                  checked={someChecked}
                  onChange={handleChange1}
                />
                <div>몇 개</div>
              </FilterContent>
              <FilterContent>
                <input
                  type="checkbox"
                  checked={fewChecked}
                  onChange={handleChange2}
                />
                <div>몇 개</div>
              </FilterContent>
              <FilterContent>
                <input
                  type="checkbox"
                  checked={emptyChecked}
                  onChange={handleChange3}
                />
                <div>몇 개</div>
              </FilterContent>
              <FilterContent>
                <input
                  type="checkbox"
                  checked={breakChecked}
                  onChange={handleChange4}
                />
                <div>몇 개</div> */}
        {/* </FilterContent> */}
      </FilterContainer>
      <MapContent id="map" />
      {showSidebar && (
        <Sidebar
          // data={store.MapStore.selectData}
          // getRemainStatToEng={store.MapStore.getRemainStatToEng}
          store={store.MapStore}
        />
      )}
    </MapContainer>
  );
};

export default inject("store")(observer(Map));
