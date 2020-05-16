import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 15%;
  background: #ccc;
  z-index: 9999;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
`;

const SearchText = styled.p`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  line-height: 70px;
`;

const SearchInput = styled.input`
  width: 100%;
  max-height: 50px;
  height: 40px;
`;

const SerachButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  font-size: 16px;
`;

const Search = (props) => {
  const { onSubmit, address, setAddress } = props;
  console.log(props);
  return (
    <SearchContainer>
      <SearchBox>
        <SearchText>주소 검색</SearchText>
        <form onSubmit={onSubmit}>
          <SearchInput
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="search"
            value={address}
            placeholder="도로명주소"
          />
          <SerachButton type="submit">검색</SerachButton>
        </form>
      </SearchBox>
      {props.children}
    </SearchContainer>
  );
};

export default Search;
