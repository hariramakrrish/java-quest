"use client";

import { useMemo } from "react";

// Tiny, dependency-free markdown renderer.
// Supports: # h1-h3, **bold**, _italic_ / *italic*, `inline code`, ``` java fenced blocks ```,
// | tables |, - / 1. lists, links [t](u). Good enough for our concept text.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderInline(s: string): string {
  let out = escapeHtml(s);
  out = out.replace(/`([^`]+)`/g, '<code class="md-inline">$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|\W)_([^_]+)_(?!\w)/g, "$1<em>$2</em>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a class="md-link" href="$2" target="_blank" rel="noreferrer">$1</a>',
  );
  return out;
}

function renderTable(lines: string[]): string {
  const rows = lines.map((l) =>
    l
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim()),
  );
  if (rows.length < 2) return "";
  const header = rows[0];
  const body = rows.slice(2);
  const head =
    "<thead><tr>" +
    header.map((h) => `<th>${renderInline(h)}</th>`).join("") +
    "</tr></thead>";
  const tbody =
    "<tbody>" +
    body
      .map(
        (r) =>
          "<tr>" + r.map((c) => `<td>${renderInline(c)}</td>`).join("") + "</tr>",
      )
      .join("") +
    "</tbody>";
  return `<table class="md-table">${head}${tbody}</table>`;
}

function render(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  let out = "";
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // fenced code
    const fence = line.match(/^```\s*(\w+)?\s*$/);
    if (fence) {
      const lang = fence[1] || "";
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++; // closing
      out += `<pre class="md-code"><code class="lang-${lang}">${escapeHtml(
        buf.join("\n"),
      )}</code></pre>`;
      continue;
    }

    // table block
    if (/^\|.+\|$/.test(line) && /^\|.+\|$/.test(lines[i + 1] || "")) {
      const buf: string[] = [];
      while (i < lines.length && /^\|.+\|$/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      out += renderTable(buf);
      continue;
    }

    if (/^###\s+/.test(line)) {
      out += `<h3>${renderInline(line.replace(/^###\s+/, ""))}</h3>`;
      i++;
      continue;
    }
    if (/^##\s+/.test(line)) {
      out += `<h2>${renderInline(line.replace(/^##\s+/, ""))}</h2>`;
      i++;
      continue;
    }
    if (/^#\s+/.test(line)) {
      out += `<h1>${renderInline(line.replace(/^#\s+/, ""))}</h1>`;
      i++;
      continue;
    }

    // unordered list
    if (/^[-*]\s+/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        buf.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      out +=
        "<ul>" + buf.map((b) => `<li>${renderInline(b)}</li>`).join("") + "</ul>";
      continue;
    }

    // ordered list
    if (/^\d+\.\s+/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        buf.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      out +=
        "<ol>" + buf.map((b) => `<li>${renderInline(b)}</li>`).join("") + "</ol>";
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    // paragraph (collect until blank line)
    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^[#`|>]/.test(lines[i]) &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    if (buf.length) {
      out += `<p>${renderInline(buf.join(" "))}</p>`;
    }
  }
  return out;
}

export function Markdown({ source }: { source: string }) {
  const html = useMemo(() => render(source), [source]);
  return (
    <div
      className="md-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
