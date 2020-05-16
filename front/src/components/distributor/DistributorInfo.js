import React from "react";
import styled from "styled-components";

const DistributorBox = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  height: 200px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  padding-left: 35px;
  margin-bottom: 5px;
  background: #ffffff;
`;

const DistributorImage = styled.div`
  background-image: url("/images/${(props) => props.type}.png");
  background-size: cover;
  width: 100px;
  height: 100px;
`;

DistributorImage.defaultProps = {
  type: "pharmacy",
};

const DistributorTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  max-width: 400px;
`;

const DistributorInfo = (props) => {
  const { info } = props;
  console.log(info);
  return (
    <DistributorBox>
      <DistributorTextBox>
        <DistributorImage type={info.type} />
      </DistributorTextBox>
      <DistributorTextBox>
        <h1>{info.name}</h1>
        <h4>{info.addr}</h4>
      </DistributorTextBox>
      <DistributorTextBox>
        <h2>{info.remain_stat}</h2>
      </DistributorTextBox>
      <DistributorTextBox>
        <h3>{info.stock_at}</h3>
        <h2>{info.distance}KM</h2>
      </DistributorTextBox>
    </DistributorBox>
  );
};

export default DistributorInfo;
