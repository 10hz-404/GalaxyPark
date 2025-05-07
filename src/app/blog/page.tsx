import React from "react";
import { PostList } from "@/components/Post";

export default function BlogRoute() {
  return (
    <div className="container mx-auto slide-enter-content">
      <PostList />
    </div>
  );
}
