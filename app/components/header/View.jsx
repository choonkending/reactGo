import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { Menu, MenuItem } from './menu';
import { Logo } from './logo';

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #000000;
  height: 72px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-size: 0.875rem;

  &:hover {
    color: #33E4EA;
  }
`

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  width: calc(100% - 150px);
`;

export default ({ isLoggedIn, onLogOut }) => (
  <Header role="banner">
    <StyledLink to="/" title="to homepage"><Logo /></StyledLink>
    <Nav aria-label="Main Navigation">
      <Menu>
        <MenuItem>
          {
            isLoggedIn ? <StyledLink to="/" onClick={onLogOut}>Logout</StyledLink>: <StyledLink to="/login">Login</StyledLink>
          }
        </MenuItem>
        <MenuItem>
          <StyledLink to="/about">About ReactGo</StyledLink>
        </MenuItem>
      </Menu>
    </Nav>
  </Header>
);

