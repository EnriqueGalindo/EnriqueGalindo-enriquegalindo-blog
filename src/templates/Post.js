import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { GatsbyImage } from 'gatsby-plugin-image';
import { AiOutlineMail } from '@react-icons/all-files/ai/AiOutlineMail';
import styled from 'styled-components';
import addToMailchimp from 'gatsby-plugin-mailchimp';

import { getCookie, setCookie } from '../helper/hooks';
import { options } from '../components/RichTextOptions';
import Seo from '../components/Seo';
import Header from '../components/Header';
import SocialShare from '../components/SocialShare';
import Author from '../components/Author';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import ModalBox from '../components/Modal';

import '../normalize.css';
import '../global.css';

const Wrapper = styled.div`
  width: 100%;

  h1 {
    text-align: center;
    font-size: 40px;
    font-weight: bold;
  }

  @media only screen and (max-width: 800px) {
    width: 90%;
  }
`;

const ImageWrapper = styled.div`
  margin: auto;
  text-align: center;
  width: 80%;
  overflow: hidden;
`;

const Paragraph = styled.p`
  text-align: center;
  color: #c3ccd3;
`;

const RichText = styled.div`
  width: 70vw;
  margin: 32px auto 0;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  padding: 64px;

  * {
    line-height: 2.5rem;
  }
`;

const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  text-align: center;
  width: 100%;
`;
const Desc = styled.div`
  text-align: center;
`;
const SubscribeInput = styled.div`
  margin: 2rem 0;
  display: flex;
  width: 100%;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }

  input {
    box-sizing: border-box;
    outline: none;
    padding: 1rem 0 1rem 1rem;
    width: 100%;

    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }

  button {
    background-color: black;
    color: white;
    padding: 1rem 2rem;
    transition-duration: 300ms;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }

    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }
`;

const STATE = {
  IDLE: 'IDLE',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

const Post = ({ data }) => {
  const postData = data.contentfulBlogPost;
  const authorData = data.allContentfulAboutTheAuthor.edges[0].node;
  const footerData = data.allContentfulFooter.edges[0].node;

  const websiteSeo = data.allContentfulWebsiteSeo.edges[0].node;

  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeState, setSubscribeState] = useState({ state: STATE.IDLE });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const subscribeOpened = getCookie('subscribeOpened');

    if (subscribeOpened !== 'true') {
      setTimeout(() => {
        setIsModalOpen(true);
        setCookie('subscribeOpened', true, 7);
      }, 5000);
    }
  }, []);

  const handleSubscribe = async () => {
    const data = await addToMailchimp(subscribeEmail);

    if (data.result === 'error') {
      setSubscribeState({ state: STATE.ERROR, message: data.msg });
    } else {
      setSubscribeState({ state: STATE.SUCCESS });
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }
  };

  return (
    <>
      <Seo
        title={postData.seo.title}
        siteTitle={websiteSeo.siteTitle}
        description={postData.seo.shortDescription}
        author={authorData.name}
        keywords={websiteSeo.keywords}
        image={postData.seo.image}
        siteUrl={websiteSeo.siteUrl}
      />

      <Header name={authorData.name} />

      <Wrapper>
        <ImageWrapper>
          <GatsbyImage
            image={postData.image.gatsbyImageData}
            alt={postData.image.title}
            objectFit='cover'
          />
        </ImageWrapper>

        <SocialShare
          data={{
            postUrl: typeof window !== 'undefined' ? window.location.href : '',
            title: postData.seo.title,
            shortDescription: postData.seo.shortDescription,
            siteTitle: websiteSeo.siteTitle,
          }}
        />

        <h1>{postData.title}</h1>

        <Paragraph>{authorData.name}</Paragraph>
        <Paragraph>{postData.createdAt}</Paragraph>
        <RichText>
          {renderRichText(postData.postContent, options)}

          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <BackToTop />
          </div>
        </RichText>
      </Wrapper>

      <Author data={authorData} />

      <Footer data={footerData} />

      {isModalOpen && (
        <ModalBox closeEvent={() => setIsModalOpen(false)}>
          <IconWrapper>
            <AiOutlineMail style={{ fontSize: '5rem', margin: '0 auto' }} />
          </IconWrapper>
          <Title>Want to stay updated?</Title>
          {subscribeState.state !== STATE.SUCCESS ? (
            <>
              <Desc>You can keep up with my posts in the future.</Desc>
              {subscribeState.state === STATE.ERROR && (
                <div
                  style={{
                    textAlign: 'center',
                    color: 'red',
                    paddingTop: '1rem',
                  }}
                >
                  {subscribeState.message}
                </div>
              )}
              <SubscribeInput>
                <input
                  type='text'
                  placeholder='Enter your email here'
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                />
                <button onClick={handleSubscribe}>Subscribe</button>
              </SubscribeInput>
            </>
          ) : (
            <div
              style={{
                textAlign: 'center',
                color: 'green',
                fontWeight: 'bold',
              }}
            >
              Successfully subscribed!
            </div>
          )}
        </ModalBox>
      )}
    </>
  );
};

export const query = graphql`
  query ($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      date(formatString: "MMMM DD, YYYY")
      image {
        gatsbyImageData(layout: FULL_WIDTH)
        title
      }
      postContent {
        raw
      }
      seo {
        title
        shortDescription
        image {
          file {
            url
          }
          fixed {
            width
            height
          }
        }
      }
    }
    allContentfulAboutTheAuthor {
      edges {
        node {
          name
          status
          profilePicture {
            gatsbyImageData
            title
          }
          paragraph1 {
            paragraph1
          }
          paragraph2 {
            paragraph2
          }
        }
      }
    }
    allContentfulFooter {
      edges {
        node {
          facebookLink
          twitterLink
          instagramLink
          linkedInLink
          copyrightText
        }
      }
    }
    allContentfulWebsiteSeo {
      edges {
        node {
          name
          websiteDescription
          siteTitle
          siteUrl
          socialImage {
            gatsbyImageData
            title
          }
          keywords
        }
      }
    }
  }
`;

export default Post;
