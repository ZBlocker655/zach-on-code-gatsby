const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const filename = createFilePath({ node, getNode });

    if (filename.startsWith('/blog/')) {
      onCreateBlogNode(node, filename, createNodeField);
    }
  }
};

function onCreateBlogNode(node, filename, createNodeField) {
  // Pick out semantically significant information from the file path.
  const [, year, month, day, , sequence, slug] = filename.match(/^\/blog\/(\d{4})\/(\d{2})-(\d{2})-((\d{2})-)?([^\/\.]+)/);

  createNodeField({
    node,
    name: 'slug',
    value: slug,
  });

  createNodeField({
    node,
    name: 'contentKey',
    value: 'blog',
  });

  createNodeField({
    node,
    name: 'date',
    value: `${year}-${month}-${day}`,
  });

  createNodeField({
    node,
    name: 'sequence',
    value: `${year}-${month}-${day}-${sequence || '00'}`,
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          fields {
            contentKey
            slug
            date
            sequence
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  const blogPosts = result.data.allMdx.nodes
    .filter(node => node.fields.contentKey === 'blog');

  const blogPostTemplate = path.resolve('./src/templates/blog.js');

  blogPosts
    .forEach(node => {
      createPage({
        path: `blog/${node.fields.slug}`,
        component: `${blogPostTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          slug: node.fields.slug
        }
      });
    });
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      title: String
      description: String
      siteUrl: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
    }

    type Fields {
      slug: String
      contentKey: String
      date: Date @dateformat
      sequence: String
    }
  `)
}
