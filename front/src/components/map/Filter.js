import React from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  z-index: 9999;
  border: 1px solid #000000;
  background: rgba(255, 255, 255, 0.8);
  padding-top: 15px;
`;

const FilterContent = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  display: block;
  margin-bottom: 20px;
`;

//code뭐시기에서 가져온 사진 사용
const FilterLabel = styled.label`
  padding-left: 70px;
  height: 65px;
  display: inline-block;
  line-height: 70px;
  font-size: 1.5rem;
  vertical-align: middle;
  cursor: pointer;
  opacity: 1;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-image: url("images/check${(props) => props.number}.png");
  background-position: ${(props) => (props.checked ? "0 -66px" : "0 0px")};
`;

const FilterCheckBox = styled.input.attrs({
  type: "checkbox",
})`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0px;
  border: 0;
`;

const Filter = (props) => {
  const { filters, onChange } = props;
  return (
    <FilterContainer>
      {filters.map((filter, index) => (
        <FilterContent>
          <FilterCheckBox
            checked={filter}
            onChange={onChange}
            name={index}
            id={index}
          />
          <FilterLabel htmlFor={index} checked={filter} number={index + 1}>
            {index === 0 && <div>100 이상</div>}
            {index === 1 && <div>30~99</div>}
            {index === 2 && <div>2~29</div>}
            {index === 3 && <div>0~1</div>}
            {index === 4 && <div>판매중지</div>}
          </FilterLabel>
        </FilterContent>
      ))}
    </FilterContainer>
  );
};

export default Filter;
