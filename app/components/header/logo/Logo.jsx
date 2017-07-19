import React from 'react';
import styled from 'styled-components';
import logoSrc from './ReactGo.svg';

const LogoBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: middle;
  width: 220px;
  height: 72px;
  background-color: #33E4EA;
`;

export default () => (
  <LogoBackground>
    <img
      src={logoSrc}
      alt="ReactGo" />
  </LogoBackground>
);

