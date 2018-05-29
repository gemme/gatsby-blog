import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({data}) => {
 const { edges: posts } = data.allMarkdownRemark;
 return (<div>
  {posts.map((({node: post}, index) => {
      const { frontmatter } = post;
      return (
        <div key={index}>
          <h2>
            <Link to={frontmatter.path}>
              {frontmatter.title}
            </Link>
          </h2>
          <p>{frontmatter.date}</p>
          <p>{frontmatter.excerpt}</p>
        </div>
      )
  }))}
  </div>
)
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            path
            date
            excerpt
            _PARENT
            parent
          }
        }
      }
    }
  }
`

export default IndexPage
