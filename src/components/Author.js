import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 70%;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  max-width: 150px;
  max-height: 150px;
  margin: 0 25px;

  * {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
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
  justify-content: space-evenly;
  align-items: center;

  p {
    width: 40%;
    text-align: center;
  }

  @media only screen and (max-width: 800px) {
    flex-direction: column;

    p {
      width: 80%;
    }
  }
`;

const Author = ({ data }) => {
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
    </Wrapper>
  );
};

export default Author;
