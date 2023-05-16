import { Link, graphql } from "gatsby";
import * as React from "react";

import { Layout, Seo } from "../components/shared";

const BlogIndex = ({ data }) => {
  const edges = data.allFile.edges;
  const posts: any = [];
  edges.forEach(({ node }: any) => {
    posts.push(node.childMarkdownRemark);
  });

  if (posts.length === 0) {
    return (
      <Layout>
        <p>No blog posts found.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2 className="pf-u-mb-0">
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />;

export const query = graphql`
  query FeaturedBlogsQuery {
    allFile(filter: { sourceInstanceName: { eq: "blog" } }) {
      edges {
        node {
          childMarkdownRemark {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              preview
              featured
            }
            id
          }
        }
      }
    }
  }
`;