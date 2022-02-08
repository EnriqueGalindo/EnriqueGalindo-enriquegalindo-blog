import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'react-share';
import styled from 'styled-components';

const List = styled.ul`
  padding: 0;
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 45px;

  li {
    margin: 0 25px;
  }
`;

const SocialShare = ({ data }) => {
  const { postUrl, title, shortDescription, siteTitle } = data;

  return (
    <div>
      <List>
        <li>
          <FacebookShareButton url={postUrl}>
            <FacebookIcon round={true} />
          </FacebookShareButton>
        </li>
        <li>
          <LinkedinShareButton
            url={postUrl}
            title={title}
            summary={shortDescription}
            source={siteTitle}
          >
            <LinkedinIcon round={true} />
          </LinkedinShareButton>
        </li>
        <li>
          <TwitterShareButton url={postUrl} title={title}>
            <TwitterIcon round={true} />
          </TwitterShareButton>
        </li>
      </List>
    </div>
  );
};

export default SocialShare;
