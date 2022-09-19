require('dotenv').config({
  path: `.env`,
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
          families: ['Roboto'],
        },
      },
    },
    `gatsby-plugin-smoothscroll`,
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://blog.us14.list-manage.com/subscribe/post?u=b634bdf381af3b784332e88da&id=3a6592a134&f_id=0046fbe0f0',
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
  ],
};
