import React from "react";

// Renders "[text](url)" spans in content strings as anchor tags.
export default function withLinks(text) {
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a key={m.index} href={m[2]} target="_blank" rel="noopener noreferrer">
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  parts.push(text.slice(last));
  return parts;
}
