import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import styled from 'styled-components';
import { FaArrowAltCircleUp } from 'react-icons/fa';

const Button = styled.button`
  position: fixed;
  bottom: 5vh;
  right: 10vw;
  background-color: transparent;
  border: none;
  border-radius: 50%;

  * {
    width: 50px;
    height: 50px;
    color: #f5381a;
    transition-duration: 0.2s;
    cursor: pointer;
  }

  &:hover * {
    color: #f5371ad8;
  }
`;

const BackToTop = () => {
  return (
    <Button onClick={() => scrollTo('#top')}>
      <FaArrowAltCircleUp />
    </Button>
  );
};

export default BackToTop;
