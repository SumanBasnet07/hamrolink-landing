"use client";

/**
 * JsonLdScript — renders a <script type="application/ld+json"> tag as a
 * CLIENT component so React treats it as a regular DOM element.
 *
 * Why "use client"?
 * React Server Components can hoist <script> tags during SSR, changing
 * their position in the rendered HTML tree. This causes hydration mismatches
 * because the client-side React tree expects the script at a specific position
 * but the actual DOM has it somewhere else (e.g. moved to <head>).
 * Marking this as a client component prevents RSC-level hoisting and ensures
 * the script stays exactly where React renders it.
 */
export function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
