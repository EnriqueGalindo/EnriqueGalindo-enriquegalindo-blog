import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { navigate } from 'gatsby';

const Wrapper = styled.div`
  width: fit-content;
  height: ${(props) => (props.large ? '650px' : '550px')};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  background-color: white;
  padding: 15px;
  margin: 0 auto 50px;
  cursor: pointer;

  &:hover ${(props) => '#' + props.slug} {
    color: #263843c7;
  }

  @media only screen and (max-width: 600px) {
    width: 80vw;
    height: fit-content;
  }

  @media only screen and (min-width: 600px) and (max-width: 1000px) {
    width: 50vw;
  }
`;

const Content = styled.div`
  width: ${(props) => (props.large ? '540px' : '25vw')};
  margin-bottom: 25px;

  @media only screen and (max-width: 600px) {
    width: 80vw;
  }

  @media only screen and (min-width: 600px) and (max-width: 1000px) {
    width: 50vw;
  }
`;

const ImgWrapper = styled.div`
  margin-bottom: 35px;

  * {
    object-fit: cover;

    height: ${(props) => (props.large ? '340px' : '200px')};
  }

  @media only screen and (max-width: 600px) {
    * {
      width: 80vw;
    }
  }

  @media screen and (min-width: 600px) and (max-width: 1000px) {
    * {
      width: 50vw;
    }
  }
`;

const Title = styled.p`
  font-size: ${(props) => (props.large ? '27px' : '20px')};
  font-weight: 700;
  color: #263843;
  text-align: center;
  width: fit-content;
  margin: 25px auto 0px;
  cursor: pointer;
  transition-duration: 0.2s;
`;

const Info = styled.p`
  color: #c3ccd3;
  text-align: center;
  margin: none;
`;

const ShortDesc = styled.p`
  color: #768791;
  font-size: 14px;
  font-weight: 500;
  width: 90%;
  margin: auto;
  line-height: 30px;
`;

const ReadMore = styled.span`
  text-decoration: none;
  font-weight: bold;
  color: #f5381a;
  transition-duration: 0.2s;
  cursor: pointer;

  &:hover {
    color: #f5371aba;
  }
`;

const Card = ({ large, data }) => {
  const { date, slug, title, shortDescription, image } = data;

  return (
    <Wrapper
      large={large}
      slug={slug}
      onClick={() => navigate(`/posts/${slug}`)}
    >
      <Content large={large}>
        <ImgWrapper large={large}>
          <GatsbyImage image={image.gatsbyImageData} alt={image.title} />
        </ImgWrapper>
        <Title large={large} id={slug}>
          {title}
        </Title>
        <Info>{date}</Info>
        <ShortDesc>
          {shortDescription}
          <ReadMore onClick={() => navigate(`/posts/${slug}`)}>
            {` `}Read More
          </ReadMore>
        </ShortDesc>
      </Content>
    </Wrapper>
  );
};

export default Card;
