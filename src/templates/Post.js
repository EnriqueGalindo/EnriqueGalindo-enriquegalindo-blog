import React from 'react';
import { graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { options } from '../components/RichTextOptions';
import Seo from '../components/Seo';
import Header from '../components/Header';
import SocialShare from '../components/SocialShare';
import Author from '../components/Author';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

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
  width: 100%;
  height: 50vw;
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

const Post = ({ data }) => {
  const postData = data.contentfulBlogPost;
  const authorData = data.allContentfulAboutTheAuthor.edges[0].node;
  const footerData = data.allContentfulFooter.edges[0].node;

  const websiteSeo = data.allContentfulWebsiteSeo.edges[0].node;

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
    </>
  );
};

export const query = graphql`
  query ($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      date(formatString: "MMMM DD, YYYY")
      image {
        gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 2)
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
