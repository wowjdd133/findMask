/* eslint-disable no-undef */
import React, { useEffect } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import DistributorList from "./DistributorList";

const DistributorContainer = styled.div`
  width: 80%;
  height: 100%;
`;

const Distributor = ({ store }) => {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        store.MapStore.getData(
          position.coords.latitude,
          position.coords.longitude
        ).then(() => {
          store.MapStore.addDistanceToData(
            position.coords.latitude,
            position.coords.longitude
          ).then(() => {
            store.MapStore.sortData().then(() => {
              store.MapStore.loadingComplete();
            });
          });
        });
      });
    }
  }, []);
  return (
    <DistributorContainer>
      {!store.MapStore.loading && (
        <DistributorList data={store.MapStore.maskData.stores} />
      )}
    </DistributorContainer>
  );
};

export default inject("store")(observer(Distributor));
