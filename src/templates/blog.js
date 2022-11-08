import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo'
import * as styles from './blog.module.css';

export default function BlogTemplate({ data, location, children }) {
  return (
    <Layout>
      <div className={styles.blog}>
        <h1>{data.mdx.frontmatter.title}</h1>
        <div>{children}</div>
      </div>
    </Layout>
  );
}

export const Head = ({ data: { mdx: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      frontmatter {
        title
        description
      }
    }
  }
`;
