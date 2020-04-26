/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";

import styled from "styled-components";
import "./Map.css";

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const handleClick = (name) => {
  console.log(name);
};

const displayMarker = (markerPosition, stat, map, name, MapStore) => {
  let imageSrc = "images/logo.jpg";

  switch (stat) {
    case "plenty":
      imageSrc = "images/green.png";
      break;
    case "some":
      imageSrc = "images/orange.png";
      break;
    case "few":
      imageSrc = "images/red.png";
      break;
    case "empty":
      imageSrc = "images/gray.png";
      break;
    default:
      imageSrc = "images/black.png";
  }

  let imageSize = new kakao.maps.Size(64, 69);
  let imageOption = { offset: new kakao.maps.Point(27, 69) };

  let markerImage = new kakao.maps.MarkerImage(
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

  kakao.maps.event.addListener(marker, "mouseover", () => {
    imageSize = new kakao.maps.Size(92, 98);
    imageOption = { offset: new kakao.maps.Point(40, 90) };
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    marker.setImage(markerImage);
  });

  kakao.maps.event.addListener(marker, "mouseout", () => {
    imageSize = new kakao.maps.Size(64, 69);
    imageOption = { offset: new kakao.maps.Point(27, 69) };
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    marker.setImage(markerImage);
  });

  let $content = document.createElement("div");
  $content.innerHTML = name;
  $content.name = name;
  $content.className = "overlay";
  $content.addEventListener(
    "click",
    (event) => {
      MapStore.getDataToName(event.target.name);
    },
    { passive: true }
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
};

const Map = ({ store }) => {
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

  return <MapContainer id="map" />;
};

export default inject("store")(observer(Map));
