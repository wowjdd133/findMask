import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

const LineChart = (props) => {
  console.log("chart", props.data);
  return <Line data={props.data} />;
};

export default LineChart;
