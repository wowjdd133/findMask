/* eslint-disable spaced-comment */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";

import styled from "styled-components";
import "./Map.css";
import Sidebar from "./sidebar";
import Filter from "./Filter";
import SearchContainer from "./Search";

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

//카카오 지도, overlay, marker등을 이용해 판매처 정보 보여줌.
const Map = ({ store }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [filters, setFilters] = useState([true, true, true, true, true]);
  const [address, setAddress] = useState("");
  //filter checked 변경시 state 변경과 함께 마크 숨김
  const handleChange = (e) => {
    const data = [...filters];
    data[e.target.name] = !filters[e.target.name];
    setFilters([...data]);
    //마크 숨기기
    store.MapStore.hideMarker(data);
  };

  //마커 생성
  const createMarker = (markerPosition, imageSrc, map) => {
    const imageSize = new kakao.maps.Size(48, 48);
    const imageOption = {
      offset: new kakao.maps.Point(20, 60),
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

    return marker;
  };

  //overlay content 생성. event 적용시 htmlnode로 해야해서
  //createelement 사용.
  const createContent = (name, code, MapStore) => {
    const $content = document.createElement("div");
    $content.textContent = name;
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

    return $content;
  };

  const pushOverlay = (marker, overlay, stat, MapStore) => {
    MapStore.marker.push({ marker, stat });
    MapStore.overlay.push(overlay);
  };

  //map을 mapsotre쪽으로 쓰는걸로
  const displayMarker = (markerPosition, stat, map, name, code, MapStore) => {
    console.log(stat);
    let imageSrc = "images/logo.jpg";
    imageSrc = MapStore.getRemainStatToImage(stat);
    const content = createContent(name, code, MapStore);

    const customOverlay = new kakao.maps.CustomOverlay({
      position: markerPosition,
      content,
      yAnchor: 2,
      zIndex: 2,
      clickable: true,
    });

    customOverlay.setMap(map);

    pushOverlay(
      createMarker(markerPosition, imageSrc, map),
      customOverlay,
      stat,
      MapStore
    );
    // MapStore.marker.push(createMarker(markerPosition, imageSrc, map));
    // MapStore.overlay.push(customOverlay);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    // eslint-disable-next-line operator-linebreak
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=74bbccc964da61465f5c3490a8256a77&autoload=false&libraries=services";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.4968281, 126.997899),
          level: 5,
        };
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
            store.MapStore.map = map;
          });
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.MapStore]);

  //판매처 선택시 보여주는 함수 온클릭으로 바꾸자
  useEffect(
    () => () => {
      setShowSidebar(true);
    },
    [store.MapStore.selectData]
  );

  // const handleSearchChange = (e) => {
  //   setAddress(e.target.value);
  // };

  const handleSubmit = (e) => {
    let geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        store.MapStore.m = 2000;
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        store.MapStore.getData(result[0].y, result[0].x).then(() => {
          if (store.MapStore.maskData.count > 0) {
            const x = store.MapStore.maskData.count;
            for (let i = 0; i < x; i += 1) {
              let locPosition = new kakao.maps.LatLng(
                store.MapStore.maskData.stores[i].lat,
                store.MapStore.maskData.stores[i].lng
              );
              displayMarker(
                locPosition,
                store.MapStore.maskData.stores[i].remain_stat,
                store.MapStore.map,
                store.MapStore.maskData.stores[i].name,
                store.MapStore.maskData.stores[i].code,
                store.MapStore
              );
            }
          }
        });
        store.MapStore.map.setCenter(coords);
      } else {
        alert("주소가 정확하지 않습니다. 예) 제주시 제주특별자치도");
      }
    });
    e.preventDefault();
  };

  return (
    <MapContainer>
      <SearchContainer
        address={address}
        onSubmit={handleSubmit}
        setAddress={setAddress}
        displayMarker={displayMarker}
        store={store}
      >
        <Filter filters={filters} onChange={handleChange} />
      </SearchContainer>
      <MapContent id="map" />
      {showSidebar && <Sidebar store={store.MapStore} />}
    </MapContainer>
  );
};

export default inject("store")(observer(Map));
