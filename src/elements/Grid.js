import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, padding, margin, bg, children } = props;

  const stlyes = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
  };

  return (
    <React.Fragment>
      <GridBox {...stlyes}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding:${props.padding}` : "")}
  ${(props) => (props.margin ? `margin:${props.margin}` : "")}
  ${(props) => (props.bg ? `background-olor:${props.bg}` : "")}
  ${(props) =>
    props.is_flex
      ? `display:flex; align-items:center; justify-content:space-between;`
      : ""}
`;
export default Grid;
