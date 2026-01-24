import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { blogPost } from "@/app/components/blog";




async function BlogPage({ params }: { params: { id: string } }){

  const postId = (await params).id

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" , marginTop:"90px"}}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{blogPost.title}</h1>
      <p style={{ color: "#555" }}>
        By {blogPost.author} • {new Date(blogPost.date).toLocaleDateString()}
      </p>
      <div style={{ margin: "1rem 0" }}>
        {blogPost.tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: "inline-block",
              background: "#e0f2f1",
              color: "#004d40",
              padding: "0.3rem 0.6rem",
              borderRadius: "4px",
              marginRight: "0.5rem",
              fontSize: "0.85rem",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <article style={{ lineHeight: "1.6", fontSize: "1.05rem" }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
       {blogPost.content}
          
          
          
        </ReactMarkdown>
      </article>
    </main>
  );
};

export default BlogPage;