import { css } from 'styled-components';
import media from './media';
import theme from './theme';
const { fonts, colors, transition } = theme;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  flexEnd: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,

  link: css`
    font-family: ${fonts.Karla};
    position: relative;
    overflow: hidden;
    text-decoration: none;
    color: ${colors.navyBlue};
    margin: 20px;
    padding: 5px;
    cursor: pointer;

    ::after {
      content: '';
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
      color: ${colors.navyBlue};
      text-decoration: none;
    }
    :hover:after {
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 100%;
    }
  `,

  sidePadding: css`
    padding: 0 10px;
    ${media.tablet`padding: 0px;`};
  `,

  button: css`
    margin: 2%;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    border: 4px solid ${colors.navyBlue};
    color: ${colors.navyBlue};
    background: ${colors.white};
    outline: none;
    position: relative;
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    width: 20%;
    ${media.thone`width: 50%;`};

    ::after {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid ${colors.navyBlue};
      background-color: ${colors.navyBlue};
      left: 10px;
      top: 10px;
      z-index: -1;
      content: '';
      -webkit-transition: all 0.5s;
      -moz-transition: all 0.5s;
      -o-transition: all 0.5s;
    }
    &:hover {
      top: 2px;
      left: 2px;
      border: 4px solid ${colors.salmonPink};
      color: ${colors.salmonPink};
      background: ${colors.white};
    }
    &:hover:after {
      top: -2px;
      left: -2px;
    }
  `,
};

export default mixins;
