"use client";
// app/admin/blog/new/page.tsx

import { useRouter } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";

export default function NewPostPage() {
  const router = useRouter();
  return (
    <BlogEditor
      onSaved={(post) => {
        router.push(`/admin/blog/${post._id}`);
      }}
    />
  );
}
