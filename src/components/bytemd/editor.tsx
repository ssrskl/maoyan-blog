"use client";

import { Editor, type EditorProps } from "@bytemd/react";
import zh_Hans from "bytemd/locales/zh_Hans.json";
import { plugins, sanitize } from "./config";


type BytemdEditorProps = {
  body?: string;
  setContent: (body: string) => void;
  editorProps?: Partial<EditorProps>;
};

export const BytemdEditor = ({
  body,
  setContent,
  editorProps,
}: BytemdEditorProps) => {
  return (
    <Editor
      value={body ?? ""}
      plugins={plugins}
      placeholder="请输入内容..."
      sanitize={sanitize}
      onChange={(v) => setContent(v)}
      locale={zh_Hans}
      editorConfig={{
        ...editorProps,
      }}
    />
  );
};
