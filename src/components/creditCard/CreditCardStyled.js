import styled from "styled-components";

export const CardContainerStyled = styled("div")`
  position: relative;
  width: 100%;
  height: 150px;
  margin: 20px auto 30px auto;
  @media (min-width: 400px) {
    width: 290px;
  }
  @media (min-width: 600px) {
    width: 370px;
    height: 200px;
  }
`;

export const FrontCardStyled = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${(props) => (props.rotateCard ? "-1" : "100")};
  width: 100%;
  height: 150px;
  padding: 10px;
  background-color: #614ad8;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  transform: ${(props) =>
    props.rotateCard
      ? "perspective(1000px) rotateY(-180deg)"
      : "perspective(1000px) rotateY(0deg)"};
  transition: transform 0.4s ease-out;
  @media (min-width: 400px) {
    width: 290px;
  }
  @media (min-width: 600px) {
    width: 370px;
    height: 200px;
  }
`;
export const BackCardStyled = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${(props) => (props.rotateCard ? "100" : "-1")};
  width: 100%;
  height: 150px;
  background-color: #614ad8;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  transform: ${(props) =>
    props.rotateCard
      ? "perspective(1000px) rotateY(0deg)"
      : "perspective(1000px) rotateY(180deg)"};
  transition: transform 0.4s ease-out;
  @media (min-width: 400px) {
    width: 290px;
  }
  @media (min-width: 600px) {
    width: 370px;
    height: 200px;
  }
`;
