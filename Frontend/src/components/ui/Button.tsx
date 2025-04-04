import { ReactNode } from 'react'

interface ButtonProps {
   onclick: () => void
   variant: 'primary' | 'secondary'
   size: 'sm' | 'md' | 'lg'
   text: string
   startIcon?: ReactNode
   endIcon?: ReactNode
}

export const Button = (props: ButtonProps) => {
   return (
      <button onClick={props.onclick} 
         
      >{props.text}</button>
   ); 
      
}

    <Button />
