import "server-only";
import sanitizeHtml from "sanitize-html";

/**
 * Blog HTML comes from the admin editor, but it is still stored and replayed to
 * every visitor — so it is whitelisted here rather than trusted.
 */
export function sanitizePostHtml(dirty: string) {
  return sanitizeHtml(dirty, {
    allowedTags: [
      "p", "br", "strong", "em", "u", "s", "blockquote", "code", "pre",
      "h2", "h3", "h4", "ul", "ol", "li", "a", "img", "hr",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
    },
    allowedSchemes: ["https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}

/** Plain text preview used when the author leaves the excerpt blank. */
export function excerptFromHtml(html: string, length = 160) {
  const text = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
  return text.length <= length ? text : `${text.slice(0, length).trimEnd()}…`;
}
