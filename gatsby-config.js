const siteConfig = require('./config.js')

module.exports = {
  siteMetadata: {
    title: siteConfig.title,
    description: "Zach Blocker's professional portfolio and blog",
    siteUrl: siteConfig.url,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [siteConfig.googleAnalyticsId],
        pluginConfig: {
          head: true
        }
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": `${__dirname}/src/images/icon.png`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": `${__dirname}/src/images/`
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": `${__dirname}/src/pages/`
      },
      __key: "pages"
    },
    "gatsby-plugin-mdx",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`
      },
      __key: "content"
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-plugin-feed-mdx',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.fields.date,
                  url: site.siteMetadata.siteUrl + "/blog/" + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + "/blog/" + edge.node.fields.slug,
                });
              });
            },
            query: `
              {
                allMdx(
                  filter: {fields: {contentKey: {eq: "blog"}}}
                  sort: {fields: fields___sequence, order: DESC}
                ) {
                  edges {
                    node {
                      excerpt
                      fields {
                        date
                        slug
                      }
                      frontmatter {
                        title
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Zach on Code Blog",
          }
        ]
      }
    }
  ]
};
