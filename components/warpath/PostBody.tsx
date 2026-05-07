import Image from "next/image";
import type { BlogNode } from "@/lib/data/blog";

/**
 * Slugify a heading so we can deep-link from the TOC.
 */
export function slugifyHeading(text: string, fallback: string): string {
  const s = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return s || fallback;
}

export function buildToc(body: BlogNode[]) {
  const out: { id: string; text: string; level: 2 | 3 | 4 }[] = [];
  body.forEach((n, i) => {
    if (n.type === "heading" && (n.level === 2 || n.level === 3)) {
      const id = slugifyHeading(n.text, `section-${i}`);
      out.push({ id, text: n.text, level: n.level as 2 | 3 });
    }
  });
  return out;
}

type Props = {
  body: BlogNode[];
};

export function PostBody({ body }: Props) {
  return (
    <div className="prose-policy max-w-none text-[15px] sm:text-[16px] leading-[1.75] text-ash-800 grid gap-5">
      {body.map((node, i) => {
        if (node.type === "heading") {
          const id = slugifyHeading(node.text, `section-${i}`);
          if (node.level === 2) {
            return (
              <h2
                key={i}
                id={id}
                className="scroll-mt-24 font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.5rem,3vw,2rem)] text-combat-900 mt-6 first:mt-0"
              >
                <span
                  aria-hidden="true"
                  className="font-mono font-bold text-[10px] tracking-[.32em] text-brass-700 block mb-2 uppercase"
                >
                  §
                </span>
                {node.text}
              </h2>
            );
          }
          return (
            <h3
              key={i}
              id={id}
              className="scroll-mt-24 font-stencil font-extrabold text-[clamp(1.125rem,2vw,1.375rem)] uppercase tracking-[.02em] leading-tight text-combat-900 mt-4"
            >
              {node.text}
            </h3>
          );
        }
        if (node.type === "paragraph") {
          return (
            <p key={i} className="text-ash-800">
              {node.text}
            </p>
          );
        }
        if (node.type === "list") {
          const Tag = node.ordered ? "ol" : "ul";
          return (
            <Tag
              key={i}
              className={`grid gap-2 ${node.ordered ? "list-none pl-0" : "list-none pl-0"}`}
            >
              {node.items.map((item, j) => (
                <li
                  key={j}
                  className="grid grid-cols-[28px_1fr] gap-3 items-baseline border-b border-canvas-300 pb-2 last:border-b-0 last:pb-0"
                >
                  <span className="font-mono font-bold text-[10px] tracking-[.22em] text-brass-700 tabular-nums">
                    {node.ordered
                      ? String(j + 1).padStart(2, "0")
                      : "▸"}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </Tag>
          );
        }
        if (node.type === "quote") {
          return (
            <blockquote
              key={i}
              className="border-l-[3px] border-brass-500 pl-5 sm:pl-6 py-1 my-4 font-italic italic text-[16px] sm:text-[18px] leading-[1.55] text-combat-900"
            >
              &ldquo;{node.text}&rdquo;
            </blockquote>
          );
        }
        if (node.type === "image") {
          // External (live CDN) → render with native <img> via next/image unoptimized
          // Locally-hosted → next/image optimized
          const isExternal = /^https?:\/\//.test(node.src);
          return (
            <figure key={i} className="my-4 sm:my-6 border border-combat-900 bg-bone-200">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={node.src}
                  alt={node.alt || ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="object-cover object-center"
                  unoptimized={isExternal}
                />
              </div>
              {node.alt && (
                <figcaption className="px-3 sm:px-4 py-2 font-mono font-semibold text-[10px] tracking-[.16em] uppercase text-ash-600 border-t border-canvas-300">
                  {node.alt}
                </figcaption>
              )}
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}
