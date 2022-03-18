import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import styled from 'styled-components';

const Bold = styled.span`
  font-weight: bold;
`;

const Text = styled.p`
  margin: 32px 0;
  color: #000000d2;
  line-height: 1.5;
`;

const A = styled.a`
  text-decoration: none;
  font-weight: bold;
`;

export const options = {
  renderText: (text) => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      const { gatsbyImageData, title } = node.data.target;

      return <GatsbyImage image={gatsbyImageData} alt={title} />;
    },
    hyperlink: (node, children) => {
      const { data } = node;
      return (
        <A href={data.uri} target='_blank' aria-label='Link to another page'>
          {children}
        </A>
      );
    },
  },
};
