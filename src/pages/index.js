import * as React from 'react'
import Layout from '../components/layout'
import PageTitle from '../components/pageTitle'

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      This is the index page.
    </Layout>
  )
}

export default IndexPage

export const Head = () => <PageTitle title="Home Page" />
