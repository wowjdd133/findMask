import React from "react";
import DataBox from "./DataBox";
import DataTextContent from "./DataTextContent";
import SmallText from "./SmallText";

const DataTextList = (props) => {
  console.log(1);
  const { labels, data, colors } = props;
  const list = data.map((info, i) => {
    return (
      <DataTextContent color={colors[i]}>
        <SmallText>{labels[i]}</SmallText>
        <p>{info}</p>
      </DataTextContent>
    );
  });
  return <>{list}</>;
};

export default DataTextList;
