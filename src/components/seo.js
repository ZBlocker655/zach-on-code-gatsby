import * as React from 'react';
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from 'gatsby';

const Seo = ({ title, description }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  const metaDescription = description || data.site.siteMetadata.description;

  return (
    <>
      <title>{title} | {data.site.siteMetadata.title}</title>
      <meta name="description" content={metaDescription} />
    </>
  )
};

Seo.defaultProps = {
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default Seo
