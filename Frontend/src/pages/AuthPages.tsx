import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import GoogleIcon from '../components/Icons/GoogleIcon';
import GitHubIcon from '../components/Icons/GitHubIcon';
import SignUpForm from '../components/ui/SignUpForm';
import SignInForm from '../components/ui/SignInForm';


const AuthPages = () => {
   const [isSignIn, setIsSignIn] = useState(true);

   return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
         <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Left Side - Image */}
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

            {/* Right Side - Form */}
            <div className="md:w-1/2 p-8 md:p-12">
               {/* Toggle between Sign In and Sign Up */}
               <div className="flex mb-8 border-b">
                  <button
                     className={`pb-4 px-4 text-lg font-medium ${isSignIn ? 'text-purple-700 border-b-2 border-purple-700' : 'text-gray-400'}`}
                     onClick={() => setIsSignIn(true)}
                  >
                     Sign In
                  </button>
                  <button
                     className={`pb-4 px-4 text-lg font-medium ${!isSignIn ? 'text-purple-700 border-b-2 border-purple-700' : 'text-gray-400'}`}
                     onClick={() => setIsSignIn(false)}
                  >
                     Sign Up
                  </button>
               </div>

               <AnimatePresence mode="wait">
                  {isSignIn ? (
                     <motion.div
                        key="sign-in"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                     >
                        <SignInForm />
                     </motion.div>
                  ) : (
                     <motion.div
                        key="sign-up"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.4 }}
                     >
                        <SignUpForm />
                     </motion.div>
                  )}
               </AnimatePresence>


               {/* Social Auth Options */}
               <div className="mt-8">
                  <div className="relative">
                     <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                     </div>
                     <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                     </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                     <button className="flex items-center justify-center py-2 px-4 border rounded-md shadow-sm bg-white hover:bg-gray-50 text-gray-700 cursor-pointer">
                        <GoogleIcon/>
                        Google
                     </button>
                     <button className="flex items-center justify-center py-2 px-4 border rounded-md shadow-sm bg-black hover:bg-gray-900 text-white cursor-pointer">
                        <GitHubIcon/>
                        Github
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};




export default AuthPages;