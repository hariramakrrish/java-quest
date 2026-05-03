"use client";

import dynamic from "next/dynamic";
import type { editor } from "monaco-editor";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[280px] animate-pulse rounded-xl bg-white/5" />
  ),
});

interface Props {
  value: string;
  onChange: (next: string) => void;
  height?: number | string;
  readOnly?: boolean;
}

export function CodeEditor({ value, onChange, height = 280, readOnly }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a18]">
      <MonacoEditor
        height={height}
        defaultLanguage="java"
        value={value}
        theme="vs-dark"
        onChange={(v) => onChange(v ?? "")}
        beforeMount={(monaco) => {
          monaco.editor.defineTheme("javaQuest", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: {
              "editor.background": "#0a0a18",
              "editor.lineHighlightBackground": "#11112255",
            },
          });
          monaco.editor.setTheme("javaQuest");
        }}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "JetBrains Mono, ui-monospace, monospace",
          scrollBeyondLastLine: false,
          tabSize: 4,
          padding: { top: 12, bottom: 12 },
          automaticLayout: true,
          readOnly,
          smoothScrolling: true,
          wordWrap: "on",
        } satisfies editor.IStandaloneEditorConstructionOptions}
      />
    </div>
  );
}
