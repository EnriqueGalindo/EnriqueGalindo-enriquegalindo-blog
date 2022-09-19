import React, { useRef } from 'react';
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
import styled from 'styled-components';

import { useOutsideAlerter } from '../helper/hooks';

const Container = styled.div`
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: black;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 3rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: white;
  width: 40rem;
  height: 20rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    width: 70%;
    height: 25rem;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
`;

const ModalBox = ({ children, closeEvent }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, closeEvent);

  return (
    <Container>
      <Wrapper ref={wrapperRef}>
        <Button
          aria-label='Close'
          className='absolute top-5 right-5 z-50'
          onClick={closeEvent}
        >
          <AiOutlineClose />
        </Button>
        <div className='flex h-full'>{children}</div>
      </Wrapper>
    </Container>
  );
};

export default ModalBox;
