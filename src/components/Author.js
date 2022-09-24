import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 70%;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media only screen and (max-width: 800px) {
    width: 90%;
    padding: 1rem;
  }
`;

const ProfileWrapper = styled.div`
  max-width: 150px;
  max-height: 150px;
  margin: 2rem 0;

  * {
    border-radius: 50%;
  }
`;

const Info = styled.div`
  line-height: 1.5;
  h1 {
    font-size: 40px;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  h3 {
    color: #c3ccd3;
    margin: 0;
    padding: 0;
    text-align: center;
  }
`;

const Paragraph = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    width: 45%;
    text-align: center;
    line-height: 2rem;
  }

  @media only screen and (max-width: 800px) {
    flex-direction: column;

    p {
      width: 100%;
    }
  }
`;

const SubscribeButton = styled.button`
  margin-top: 2rem;
  background-color: transparent;
  color: #f5381a;
  font-weight: bold;
  border: none;
  border: 2px solid #f5371acf;
  border-radius: 0.2rem;
  width: 220px;
  height: 60px;
  font-size: 19px;
  font-weight: 600;
  transition: ease-out 0.3s;
  cursor: pointer;

  &:hover {
    color: #f5371aa0;
    border: 1px solid #f5371aa0;
  }
`;

const Author = ({ data, setIsModalOpen }) => {
  const {
    name,
    status,
    profilePicture: { gatsbyImageData, title },
    paragraph1: { paragraph1 },
    paragraph2: { paragraph2 },
  } = data;

  return (
    <Wrapper>
      <ProfileWrapper>
        <GatsbyImage image={gatsbyImageData} alt={title} />
      </ProfileWrapper>
      <Info>
        <h1>{name}</h1>
        <h3>{status}</h3>
        <Paragraph>
          <p>{paragraph1}</p>
          <p>{paragraph2}</p>
        </Paragraph>
      </Info>
      <SubscribeButton onClick={setIsModalOpen}>Subscribe</SubscribeButton>
    </Wrapper>
  );
};

export default Author;
