import * as React from "react";

import { graphql } from "gatsby";

type BlogPostDataProps = {
  markdownRemark: {
    html: string;
    frontmatter: {
      date: string;
      slug: string;
      title: string;
      origin: string;
    };
  };
};

export default function BlogPostTemplate({
  data,
}: {
  data: BlogPostDataProps;
}) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll("h1, h2, h3");
      headings.forEach((heading) => {
        if (heading.tagName === "H1") {
          (heading as HTMLElement).style.fontSize = "2rem";
          (heading as HTMLElement).style.fontWeight = "bold";
        } else if (heading.tagName === "H2") {
          (heading as HTMLElement).style.fontSize = "1.5rem";
          (heading as HTMLElement).style.fontWeight = "600";
        } else if (heading.tagName === "H3") {
          (heading as HTMLElement).style.fontSize = "1.25rem";
          (heading as HTMLElement).style.fontWeight = "500";
        }
      });
    }
  }, [html]);
  return (
    <main>
      <div>
        <h1>{frontmatter.title}</h1>
        <a href={frontmatter.origin}>
          <h2>원본 바로가기</h2>
        </a>
        <div ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        origin
      }
    }
  }
`;
