import React from "react";
import DataTextContent from "./DataTextContent";
import SmallText from "./SmallText";
import { observer } from "mobx-react";

const DataTextList = (props) => {
  console.log("DataTextList");
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

export default observer(DataTextList);
