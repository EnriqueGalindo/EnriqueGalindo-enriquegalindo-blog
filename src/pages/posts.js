import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import fuzzysort from 'fuzzysort';

import Seo from '../components/Seo';
import Header from '../components/Header';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { FaSearch } from '@react-icons/all-files/fa/FaSearch';

const Title = styled.h1`
  margin-top: 50px;
  text-align: center;
`;

const Underline = styled.div`
  margin: 0;
  border-bottom: 2px solid #f5381a;
  width: 70px;
  margin: -10px auto 50px;
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 50px auto;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: auto;

  label {
    margin-right: 20px;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Input = styled.div`
  display: flex;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 8px;
  margin-bottom: 50px;
  width: fit-content;

  input {
    border: none;
    outline: none;
    padding: 1rem;
  }

  button {
    color: black;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 1rem;
  }

  @media only screen and (max-width: 600px) {
    margin: 25px auto;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 50px;

  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 10px;
  }
`;

const Error = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: auto;
  height: calc(100vh - 400px);
`;

const Select = styled.select`
  padding: 1rem;
  margin-left: 1rem;
  width: 8rem;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  outline: none;

  option {
    padding: 1rem;
  }
`;

const Posts = ({ data }) => {
  const [sortNew, setSortNew] = useState(true);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [updatedPosts, setUpdatedPosts] = useState(null);
  const [searchValue, setSearchValue] = useState('');

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

  useEffect(() => {
    let newArray;

    if (sortNew === true) {
      newArray = blogPostsData;
    } else {
      newArray = blogPostsData.slice(0).reverse();
    }

    setSortedPosts(newArray);

    updatedPosts && setUpdatedPosts(updatedPosts.slice(0).reverse());
    // eslint-disable-next-line
  }, [sortNew]);

  const handleSearch = () => {
    let newArray;

    if (searchValue === '') {
      newArray = sortedPosts;
    } else if (updatedPosts) {
      newArray = sortedPosts.filter((edge) => {
        const result = fuzzysort.single(searchValue, edge.node.title);
        if (result) {
          return true;
        }

        return false;
      });
    } else {
      newArray = sortedPosts.filter((edge) => {
        const result = fuzzysort.single(searchValue, edge.node.title);
        if (result) {
          return true;
        }

        return false;
      });
    }

    setUpdatedPosts(newArray);
  };

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSort = (e) => {
    if (e.target.value === 'New') {
      setSortNew(true);
    } else if (e.target.value === 'Old') {
      setSortNew(false);
    }
  };

  return (
    <main>
      <Seo
        title='Posts'
        siteTitle={siteTitle}
        description={websiteDescription}
        author={name}
        keywords={keywords}
        image={socialImage}
        siteUrl={siteUrl}
      />
      <Header name={name} />
      <Title>The Library</Title>
      <Underline />

      <Wrapper>
        <Options>
          <div>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Sort By
            </span>
            <Select onChange={handleSort}>
              <option>New</option>
              <option>Old</option>
            </Select>
          </div>
          <Input>
            <input
              value={searchValue}
              placeholder='Search'
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchEnter}
            />
            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </Input>
        </Options>

        <Content>
          {updatedPosts
            ? updatedPosts.map((edge, i) => {
                return (
                  <Fade
                    bottom
                    delay={i % 2 === 0 ? 0 : 200}
                    distance='60px'
                    key={i}
                  >
                    <Card large={true} data={edge.node} />
                  </Fade>
                );
              })
            : sortedPosts.map((edge, i) => {
                return (
                  <Fade
                    bottom
                    delay={i % 2 === 0 ? 0 : 200}
                    distance='120px'
                    key={i}
                  >
                    <Card large={true} data={edge.node} />
                  </Fade>
                );
              })}
        </Content>
        {updatedPosts && updatedPosts.length === 0 && (
          <Error>No matching post found.</Error>
        )}
      </Wrapper>
      <Footer data={footerData} />
    </main>
  );
};

export const query = graphql`
  query PostQuery {
    allContentfulBlogPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          date(formatString: "MMMM DD, YYYY")
          slug
          title
          shortDescription
          image {
            gatsbyImageData(layout: FULL_WIDTH, aspectRatio: 2)
            title
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
  }
`;

export default Posts;
