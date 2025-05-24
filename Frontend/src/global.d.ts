// src/global.d.ts
export { };

declare global {
   interface Window {
      twttr?: {
         widgets?: {
            load: () => void;
         };
      };
   }
}
