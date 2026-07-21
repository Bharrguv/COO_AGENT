import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User } from "lucide-react";

export default function ChatBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}

      {!isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
          <Bot size={20} className="text-indigo-600" />
        </div>
      )}

      {/* Bubble */}

      <div
        className={`
          max-w-[90%]
          rounded-2xl
          px-5
          py-4
          shadow-sm
          transition-all

          ${
            isUser
              ? "bg-indigo-600 text-white"
              : "border border-slate-200 bg-white text-slate-800"
          }
        `}
      >
        {isUser ? (
          <p className="leading-7 whitespace-pre-wrap">
            {message.content}
          </p>
        ) : (
          <div className="prose prose-slate max-w-none">

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-3 text-2xl font-bold">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-3 mt-6 text-xl font-semibold">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-2 mt-5 text-lg font-semibold">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="mb-4 leading-7">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="mb-4 list-disc space-y-2 pl-6">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-4 list-decimal space-y-2 pl-6">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li>{children}</li>
                ),

                strong: ({ children }) => (
                  <strong className="font-bold text-slate-900">
                    {children}
                  </strong>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-4 border-l-4 border-indigo-500 pl-4 italic text-slate-600">
                    {children}
                  </blockquote>
                ),

                table: ({ children }) => (
                  <div className="overflow-auto rounded-xl border border-slate-200">
                    <table className="w-full border-collapse">
                      {children}
                    </table>
                  </div>
                ),

                th: ({ children }) => (
                  <th className="border-b bg-slate-50 p-3 text-left font-semibold">
                    {children}
                  </th>
                ),

                td: ({ children }) => (
                  <td className="border-b p-3">
                    {children}
                  </td>
                ),

                code({ inline, children }) {
                  if (inline) {
                    return (
                      <code className="rounded bg-slate-100 px-1.5 py-1 text-pink-600">
                        {children}
                      </code>
                    );
                  }

                  return (
                    <pre className="overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm text-slate-100">
                      <code>{children}</code>
                    </pre>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>

          </div>
        )}
      </div>

      {/* User Avatar */}

      {isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200">
          <User size={18} className="text-slate-600" />
        </div>
      )}
    </div>
  );
}

