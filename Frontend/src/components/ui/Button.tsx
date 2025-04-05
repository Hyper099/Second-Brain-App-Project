import { ReactNode } from 'react'

interface ButtonProps {
   onclick: () => void
   variant: 'primary' | 'secondary'
   size: 'sm' | 'md' | 'lg'
   text: string
   startIcon?: ReactNode
   endIcon?: ReactNode
}

const variantStyles: Record<string, string> = {
   "primary": "bg-purpleLight text-purpleDark",
   "secondary": "bg-purpleDark text-purpleLight"
}

const variantSizes: Record<string, string> = {
   "sm": "py-1 px-2 text-sm",
   "md": "py-2 px-4 text-base",
   "lg": "py-3 px-6 text-lg"
}

const defaultStyle = "rounded-xl flex gap-2 cursor-pointer items-center transition-all duration-200  ease-in-out font-medium group"

export const Button = (props: ButtonProps) => {
   return (
      <button
         onClick={props.onclick}
         className={`
            ${variantStyles[props.variant]}
            ${defaultStyle}
            ${variantSizes[props.size]}
         `}>
         {props.startIcon &&
            <span className="transform transition-transform duration-200 group-hover:scale-110 flex items-center">
               {props.startIcon}
            </span>
         }
         {props.text}
         {props.endIcon}
      </button>
   );
}