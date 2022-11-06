import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
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

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
  }
`;
