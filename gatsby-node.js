/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

const path = require('path');

exports.createPages = ({boundActionCreators, graphql}) => {
	const { createPage  } = boundActionCreators;
	//console.log('path', path.resolve);
	const blogPostTemplate = path.resolve('src/templates/blog-post.js');
	console.log('createPage', createPage);
	return graphql(`
	{
		allMarkdownRemark {
		  edges {
			node {
			  id
			  html
			  frontmatter {
				title
				path
				date
				excerpt
				parent
				tags
			  }
			}
		  }
		}
	}
	`).then(result => {
		if(result.errors) {
			return Promise.reject(result.errors);
		}
		const posts = result.data.allMarkdownRemark.edges;
		console.log('result', result);

		posts.forEach(({node}) => {
			console.log('node', node);
			createPage({
				path: node.frontmatter.path,
				component: blogPostTemplate,
				context: {
					path: node.frontmatter.path
				}
			});
		});
	});
};
