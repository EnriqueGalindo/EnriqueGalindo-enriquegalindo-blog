require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Enrique Galindo Blog',
    description: 'This is my blog website. Enjoy!',
    author: 'Enrique Galindo',
    keywords: 'blog, tech',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.TRACKING_ID,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Enrique Galindo`,
        short_name: `Enrique`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#FBFA84`,
        display: `standalone`,
        icon: `src/images/plogo.jpeg`,
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Raleway'],
        },
      },
    },
    `gatsby-plugin-smoothscroll`,
  ],
};
