import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import styled from 'styled-components';
import { FaArrowAltCircleUp } from '@react-icons/all-files/fa/FaArrowAltCircleUp';

const Button = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 1rem;
  margin: 0 auto;
  display: flex;
  align-items: center;

  * {
    color: black;
    transition-duration: 0.2s;
    cursor: pointer;
    text-decoration: underline;
  }

  &:hover * {
    color: gray;
  }
`;

const BackToTop = () => {
  return (
    <Button onClick={() => scrollTo('#top')}>
      <span style={{ marginRight: '0.5rem' }}>Back to top</span>
      <FaArrowAltCircleUp />
    </Button>
  );
};

export default BackToTop;
