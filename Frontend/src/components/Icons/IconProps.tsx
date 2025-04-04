export interface IconProps{
   size: 'sm'|'md'|'lg';
}

export const iconSizes: Record<IconProps["size"], string> = {
   sm: 'w-4 h-4',  // 16px
   md: 'w-5 h-5',  // 24px
   lg: 'w-8 h-8'   // 32px
};



