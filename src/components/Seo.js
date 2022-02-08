import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function Seo({
  title,
  siteTitle,
  description,
  author,
  keywords,
  image: metaImage,
  lang,
  meta,
  pathname,
  siteUrl,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
          }
        }
      }
    `
  );
  const metaDescription = description || site.siteMetadata.description;
  const image =
    metaImage && metaImage.file && metaImage.file.url
      ? `${metaImage.file.url}`
      : null;
  const canonical = pathname ? `${siteUrl}${pathname}` : null;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteTitle ? siteTitle : site.siteMetadata.title}`}
      link={
        canonical
          ? [
              {
                rel: 'canonical',
                href: canonical,
              },
            ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: 'keywords',
          content: keywords
            ? keywords.join(',')
            : site.siteMetadata.keywords.join(','),
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:creator`,
          content: author ? author : site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          metaImage
            ? [
                {
                  property: 'og:image',
                  content: image,
                },
                {
                  property: 'og:image:width',
                  content: metaImage.fixed.width,
                },
                {
                  property: 'og:image:height',
                  content: metaImage.fixed.height,
                },
                {
                  name: 'twitter:card',
                  content: 'summary_large_image',
                },
              ]
            : [
                {
                  name: 'twitter:card',
                  content: 'summary',
                },
              ]
        )
        .concat(meta)}
    />
  );
}
Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};
Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
  pathname: PropTypes.string,
};
export default Seo;
