import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { AiOutlineMail } from '@react-icons/all-files/ai/AiOutlineMail';
import addToMailchimp from 'gatsby-plugin-mailchimp';

import { getCookie, setCookie, validateEmail } from '../helper/hooks';
import Hero from '../sections/Hero';
import Posts from '../sections/Posts';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import ModalBox from '../components/Modal';
import '../normalize.css';
import '../global.css';

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

const IndexPage = ({ data }) => {
  const heroSectionData = data.allContentfulHeroSection.edges[0].node;
  const blogPostsData = data.allContentfulBlogPost.edges;
  const footerData = data.allContentfulFooter.edges[0].node;
  const websiteSeoData = data.allContentfulWebsiteSeo.edges[0].node;
  const {
    name,
    siteTitle,
    websiteDescription,
    siteUrl,
    keywords,
    socialImage,
  } = websiteSeoData;

  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeState, setSubscribeState] = useState({ state: STATE.IDLE });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const subscribeOpened = getCookie('subscribeOpened');

    if (subscribeOpened !== 'true') {
      setTimeout(() => {
        setIsModalOpen(true);
        setCookie('subscribeOpened', true, 10);
      }, 3000);
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
    <main>
      <Seo
        title='Home'
        siteTitle={siteTitle}
        description={websiteDescription}
        author={name}
        keywords={keywords}
        image={socialImage}
        siteUrl={siteUrl}
      />
      <Hero data={heroSectionData} />
      <Posts data={blogPostsData} />
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
    </main>
  );
};

export const query = graphql`
  query MyQuery {
    allContentfulWebsiteSeo {
      edges {
        node {
          name
          websiteDescription
          siteUrl
          socialImage {
            gatsbyImageData
            fixed {
              width
              height
            }
            file {
              url
            }
            title
          }
          siteTitle
          keywords
        }
      }
    }
    allContentfulHeroSection {
      edges {
        node {
          backgroundImage {
            gatsbyImageData
            title
          }
          title
          subtitle
          buttonText
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
    allContentfulBlogPost(limit: 4, sort: { fields: date, order: DESC }) {
      edges {
        node {
          date(formatString: "MMMM DD, YYYY")
          slug
          title
          shortDescription
          image {
            gatsbyImageData
            title
          }
        }
      }
    }
  }
`;

export default IndexPage;
