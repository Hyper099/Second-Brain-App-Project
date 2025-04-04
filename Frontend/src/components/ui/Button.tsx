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

export const Button = (props: ButtonProps) => {
   return (
      <button
         onClick={props.onclick}
         className={variantStyles[props.variant]}

      >{props.text}</button>
   );

}

