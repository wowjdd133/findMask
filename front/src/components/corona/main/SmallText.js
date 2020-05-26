import styled from "styled-components";

import React from "react";

const SmallTextStyled = styled.p`
  margin-top: 0.2rem;
  font-size: 0.75rem;
  margin-bottom: 0.44rem;
  color: gray;
`;

const SmallText = (props) => {
  return <SmallTextStyled>{props.children}</SmallTextStyled>;
};

export default SmallText;
