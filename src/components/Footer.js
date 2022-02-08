import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #283c48;
  width: 100%;
  padding: 10px 0;
`;

const SocialLinks = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin-bottom: 20px;

  li {
    margin: 0 20px;

    &:hover {
      a {
        * {
          color: white;
        }
      }
    }

    a {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #c3ccd33b;
      display: flex;
      justify-content: center;
      align-items: center;

      * {
        color: #c3ccd3;
        width: 20px;
        height: 20px;
        transition-duration: 0.2s;
      }
    }
  }
`;

const Underline = styled.div`
  width: 70px;
  border-bottom: 2px solid #c3ccd3;
  margin: auto;
`;

const Copyright = styled.p`
  color: #c3ccd3;
  text-align: center;
`;

const Footer = ({ data }) => {
  const {
    facebookLink,
    twitterLink,
    instagramLink,
    linkedInLink,
    copyrightText,
  } = data;
  console.log(linkedInLink);

  return (
    <Container>
      <SocialLinks>
        <li>
          <a
            href={facebookLink}
            target='_blank'
            rel='noreferrer'
            aria-label='Facebook'
          >
            <FaFacebookF />
          </a>
        </li>
        <li>
          <a
            href={twitterLink}
            target='_blank'
            rel='noreferrer'
            aria-label='Twitter'
          >
            <FaTwitter />
          </a>
        </li>
        <li>
          <a
            href={instagramLink}
            target='_blank'
            rel='noreferrer'
            aria-label='Instagram'
          >
            <FaInstagram />
          </a>
        </li>
        <li>
          <a
            href={linkedInLink}
            target='_blank'
            rel='noreferrer'
            aria-label='Linked In'
          >
            <FaLinkedinIn />
          </a>
        </li>
      </SocialLinks>
      <Underline />
      <Copyright>{copyrightText}</Copyright>
    </Container>
  );
};

export default Footer;
