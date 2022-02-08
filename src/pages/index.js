import * as React from 'react';
import { graphql } from 'gatsby';

import Hero from '../sections/Hero';
import Posts from '../sections/Posts';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import '../normalize.css';
import '../global.css';

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
