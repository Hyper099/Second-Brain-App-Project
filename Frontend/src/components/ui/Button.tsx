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
   "sm": "py-1 px-2",
   "md": "py-2 px-4",
   "lg": "py-3 px-6"
}

const defaultStyle = "rounded-xl flex gap-2 cursor-pointer items-center  "

export const Button = (props: ButtonProps) => {
   return (
      <button
         onClick={props.onclick}
         className={`
            ${variantStyles[props.variant]}
            ${defaultStyle}
            ${variantSizes[props.size]}
            
         `}


      >{props.startIcon}{props.text}{props.endIcon}</button>
   );

}

