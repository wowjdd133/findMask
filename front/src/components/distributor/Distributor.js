/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import DistributorList from "./DistributorList";

const DistributorContainer = styled.div`
  width: 80%;
  height: 100%;
`;

const DistributorSearchBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: #0000ff;
  box-shadow: 3px 3px gray;
  margin-bottom: 3px;
`;

const DistributorSearch = styled.input`
  width: 20%;
  height: 35%;
  background: #fff;
`;

const Distributor = ({ store }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const searchList = () => {
    const data = store.MapStore.maskData.stores.filter((item) => {
      return item.name.indexOf(search) > -1;
    });

    return <DistributorList data={data} />;
  };

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
            store.MapStore.changeTimeToElapsedTime().then(() => {
              store.MapStore.sortData().then(() => {
                store.MapStore.loadingComplete();
              });
            });
          });
        });
      });
    }
  }, []);
  return (
    <DistributorContainer>
      <DistributorSearchBox>
        <DistributorSearch onChange={handleChange} value={search} />
      </DistributorSearchBox>
      {!store.MapStore.loading &&
        (search ? (
          searchList()
        ) : (
          <DistributorList data={store.MapStore.maskData.stores} />
        ))}
    </DistributorContainer>
  );
};

export default inject("store")(observer(Distributor));
