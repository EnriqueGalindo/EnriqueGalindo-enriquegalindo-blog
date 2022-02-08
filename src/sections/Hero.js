import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import scrollTo from 'gatsby-plugin-smoothscroll';
import Fade from 'react-reveal/Fade';

const Container = styled.div`
  position: relative;
`;

const Background = styled.div`
  * {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
`;

const Effect = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
`;

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  text-align: center;

  color: white;

  * {
    margin: 25px;
  }

  @media only screen and (max-width: 600px) {
    width: 300px;
  }

  @media only screen and (min-width: 600px) and (max-width: 900px) {
    width: 500px;
  }
`;

const Title = styled.p`
  font-size: 42px;
  font-weight: 600;
  line-height: 1.5;

  @media only screen and (max-width: 600px) {
    font-size: 25px;
  }

  @media only screen and (min-width: 600px) and (max-width: 900px) {
    font-size: 35px;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;

  @media only screen and (max-width: 600px) {
    font-size: 15px;
  }
`;

const Button = styled.button`
  width: 220px;
  height: 60px;
  border-radius: 64px;
  cursor: pointer;
  transition: ease-out 0.3s;

  font-size: 19px;
  font-weight: 600;
  color: white;
  background-color: transparent;
  border: 2px solid white;
  letter-spacing: 2px;

  &:hover {
    color: #ffffffc3;
    border-color: #ffffffc3;
  }

  @media only screen and (max-width: 600px) {
    font-size: 10px;
    width: 150px;
  }

  @media only screen and (min-width: 600px) and (max-width: 900px) {
    font-size: 15px;
    width: 200px;
  }
`;

const Hero = ({ data }) => {
  const { backgroundImage, title, subtitle, buttonText } = data;

  return (
    <Container>
      <Background>
        <GatsbyImage
          image={backgroundImage.gatsbyImageData}
          alt={backgroundImage.title}
        />
        <Effect />
      </Background>
      <Wrapper>
        <Fade delay={200}>
          <Title>{title}</Title>
        </Fade>
        <Fade delay={400}>
          <Subtitle>{subtitle}</Subtitle>
        </Fade>
        <Fade delay={600}>
          <Button onClick={() => scrollTo('#posts')}>{buttonText}</Button>
        </Fade>
      </Wrapper>
    </Container>
  );
};

export default Hero;
