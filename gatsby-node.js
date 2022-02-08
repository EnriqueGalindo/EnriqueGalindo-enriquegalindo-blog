exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  data.allContentfulBlogPost.edges.forEach((edge) => {
    const slug = edge.node.slug;
    actions.createPage({
      path: `posts/${slug}`,
      component: require.resolve(`./src/templates/Post.js`),
      context: { slug: slug },
    });
  });
};
