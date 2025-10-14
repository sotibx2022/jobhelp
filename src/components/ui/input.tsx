import * as React from "react"
import { cn } from "@/lib/utils"
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <>
      <style jsx global>{`
        :root {
          --autofill-bg: hsl(var(--background));
          --autofill-text: hsl(var(--foreground));
          --autofill-border: hsl(var(--input));
          --autofill-focus-border: hsl(var(--ring));
          --autofill-invalid-border: hsl(var(--destructive));
        }
        input:-webkit-autofill {
          -webkit-text-fill-color: var(--autofill-text) !important;
          -webkit-box-shadow: 0 0 0 1000px var(--autofill-bg) inset !important;
          border: 1px solid var(--autofill-border) !important;
          background-color: transparent !important;
          transition: background-color 9999s ease-in-out 0s;
        }
        input:-webkit-autofill:hover {
          border: 1px solid var(--autofill-border) !important;
        }
        input:-webkit-autofill:focus {
          border: 1px solid var(--autofill-focus-border) !important;
          -webkit-box-shadow: 
            0 0 0 1000px var(--autofill-bg) inset,
            0 0 0 1px var(--autofill-focus-border) !important;
        }
        input[aria-invalid="true"]:-webkit-autofill {
          border: 1px solid var(--autofill-invalid-border) !important;
        }
        input[aria-invalid="true"]:-webkit-autofill:focus {
          border: 1px solid var(--autofill-invalid-border) !important;
          -webkit-box-shadow: 
            0 0 0 1000px var(--autofill-bg) inset,
            0 0 0 1px var(--autofill-invalid-border) !important;
        }
        /* Force transparency on all states */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          background-color: transparent !important;
          background-clip: padding-box !important;
        }
      `}</style>
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    </>
  )
}
export { Input }