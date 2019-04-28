import { createGlobalStyle } from 'styled-components';
import theme from './theme';
import media from './media';

const { colors, fontSizes, fonts, transition } = theme;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    width: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${colors.lightGrey};
    color: ${colors.brown};
    line-height: 1.45;
    font-family: ${fonts.ProximaNova};
    font-size: ${fontSizes.large};
    ${media.phablet`font-size: ${fontSizes.medium};`}

    &.hidden {
      overflow: hidden;
    }
    &.blur {
      overflow: hidden;
      #root > .container > * {
        filter: blur(5px) brightness(0.7);
        transition: ${theme.transition};
        pointer-events: none;
        user-select: none;
      }
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: 600;
    margin: 0 0 10px 0;
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }


  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;
  }

  a {
    font-family: ${fonts.Karla};
    position: relative;
    overflow: hidden;
    text-decoration: none;
    color: ${colors.brown};
    margin: 20px;
    padding: 5px;
  
    ::after {
      content: "";
      background: ${colors.mintGreenRGB};
      position: absolute;
      left: 12px;
      bottom: 5px;
      width: calc(100% - 13px);
      height: calc(100% - 24px);
      z-index: -1;
      transition: ${transition};
    }
    :hover {
      color: ${colors.brown};
      text-decoration: none;
    }
    :hover:after {
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 100%;
    }
  }
  


  input, textarea {
    border-radius: 0;
    outline: 0;

    &:focus {
      outline: 0;
    }
    &::placeholder {
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 15px 0;
  }

  ul, ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

export default GlobalStyle;
