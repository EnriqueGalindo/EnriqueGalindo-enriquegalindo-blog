import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  padding: 50px;
  background-color: #263843;
  h1 {
    padding: 0;
    margin: 0;

    * {
      text-decoration: none;
      color: white;
    }
  }
`;

const Header = ({ name }) => {
  return (
    <Wrapper id='top'>
      <h1>
        <Link to='/'>{name}</Link>
      </h1>
    </Wrapper>
  );
};

export default Header;
