import React from "react";

type PreProps = React.HTMLAttributes<HTMLPreElement> & {
  "data-language"?: string;
};

export function MdxPre({ children, className, "data-language": lang, ...props }: PreProps) {
  return (
    <div className="relative group/pre my-6 border border-border rounded-md overflow-hidden bg-black shadow-lg">
      <pre
        className={`!m-0 !p-4 !bg-transparent overflow-x-auto text-sm text-slate-100 ${className || ""}`}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
