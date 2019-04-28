import styled from 'styled-components';
import { mixins } from '../styles';

const Navbar = styled.nav`
  width: 100%;
  ${mixins.flexBetween};
`;

export default Navbar;
