"use client";

import { useRouter, useParams } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";

export default function NewPostPage() {
  const router = useRouter();
  const { lang } = useParams<{ lang: string }>();

  return (
    <BlogEditor
      onSaved={(post) => {
        router.push(`/${lang}/admin/blog/${post._id}`);
      }}
    />
  );
}
