import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
html {
  font-size: 62.5%;
}
body {
  font-size: 1.6rem;
  line-height: 1.5;
}
img {
  max-width: 100%;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
`;

export const Wrapper = styled.div`
  width: 95%;
  max-width: 1200px;
  margin: auto;
`;

export default GlobalStyles;
