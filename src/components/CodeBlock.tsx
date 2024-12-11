import SyntaxHighlighter from "react-syntax-highlighter";

// import { CopyToClipboard } from "react-copy-to-clipboard";

// import { Copy } from "lucide-react";

import "../styles/codeBlock.css";

// type PropsCopyButton = {
//   code: string;
// };
// function CopyButton({ code }: PropsCopyButton) {
//   return (
//     <button className="CopyButtonClass">
//       <CopyToClipboard text={code}>
//         <div>
//           <Copy size={20} />
//         </div>
//       </CopyToClipboard>
//     </button>
//   );
// }

type Props = {
  code: string;
  language: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any;
};
export default function CodeBlock({ code, style, language }: Props) {
  return (
    <div className="CodeBlockClass mb-3">
      {/* <CopyButton code={code} /> */}
      <SyntaxHighlighter
        language={language}
        style={style}
        wrapLines={true}
        wrapLongLines={true}
        showLineNumbers={true}
        showInlineLineNumbers={false}
        customStyle={{
          border: "1px solid #c3c3c3",
          borderRadius: "5px",
          fontSize: "0.85rem",
        }}
        PreTag={"span"}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
