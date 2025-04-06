
const AuthPageUI = () => {
   return (
      <div className="md:w-1/2 bg-purple-700 text-white p-12 flex flex-col justify-between  md:block">
         <div>
            <h2 className="text-3xl font-bold mb-6">Second Brain</h2>
            <p className="text-purple-200 mb-6">
               Organize your thoughts, sources, and inspirations in one place.
               Never lose track of important information again.
            </p>
            <div className="border-t border-purple-500 pt-6">
               <p className="italic text-purple-200">
                  "The only difference between a stumbling block and a stepping stone is the way you use them."
               </p>
            </div>
         </div>
         <div className="mt-auto">
            <p className="text-sm text-purple-300">© 2025 Second Brain. All rights reserved.</p>
         </div>
      </div>
   );
}

export default AuthPageUI;
