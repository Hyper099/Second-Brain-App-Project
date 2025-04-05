const SignUpForm = () => {
   return (
      <form className="space-y-6">
         <div className="grid grid-cols-2 gap-4">
            <div>
               <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  First name
               </label>
               <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
               />
            </div>
            <div>
               <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Last name
               </label>
               <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
               />
            </div>
         </div>

         <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
               Email address
            </label>
            <input
               id="signup-email"
               name="email"
               type="email"
               autoComplete="email"
               required
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
         </div>

         <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
               Password
            </label>
            <input
               id="signup-password"
               name="password"
               type="password"
               autoComplete="new-password"
               required
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
         </div>

         <div>
            <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700">
               Confirm password
            </label>
            <input
               id="password-confirm"
               name="password-confirm"
               type="password"
               autoComplete="new-password"
               required
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
         </div>

         <div className="flex items-center">
            <input
               id="terms"
               name="terms"
               type="checkbox"
               className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
               required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
               I agree to the <a href="#" className="text-purple-600 hover:text-purple-500">Terms of Service</a> and <a href="#" className="text-purple-600 hover:text-purple-500">Privacy Policy</a>
            </label>
         </div>

         <div>
            <button
               type="submit"
               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
               Create account
            </button>
         </div>
      </form>
   );
};

export default SignUpForm;