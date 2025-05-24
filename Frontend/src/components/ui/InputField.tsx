
interface InputProps{
   placeholder: string
   size: "sm" | "md" | "lg"
   value: string
   name:string
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const sizeVariants = {
  sm: "text-sm px-2 py-1",
  md: "text-base px-3 py-2",
  lg: "text-lg px-4 py-3",
};

const defaultStyle = "border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow w-full"

export const InputField = (props: InputProps) => {
   return (
      <input
         type="text"
         placeholder={props.placeholder}
         name={props.name}
         value={props.value}
         onChange={props.onChange}
         className={`
            ${sizeVariants[props.size]}
            ${defaultStyle}
         `}
      />
   );
}