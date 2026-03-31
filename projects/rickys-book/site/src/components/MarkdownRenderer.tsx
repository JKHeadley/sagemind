import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
