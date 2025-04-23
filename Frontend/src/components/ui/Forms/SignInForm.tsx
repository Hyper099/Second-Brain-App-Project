import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/API";
import { useAuth } from "../../../context/AuthContext";

interface SignInFormData {
   email: string,
   password: string,
}

const SignInForm = () => {
   
   const [signInForm, setSignInForm] = useState<SignInFormData>({
      email: '',
      password : '',
   })
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
   const navigate = useNavigate();
   const { login } = useAuth();

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSignInForm({
         ...signInForm,
         [e.target.name]: e.target.value
      });
   }

   const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      setSuccess('');

      try {
         const response = await API.post('/signin', signInForm);
         // console.log(response.data);
         login(response.data.token)
         setSuccess(response.data.message || 'SignIn successful!');
         setSignInForm({ email: '', password: '' });
         navigate('/dashboard');
      } catch (error:any) {
         setError(error.response?.data?.error || 'Error Signing In');
      }

   }

   return (
      <form onSubmit={handleSubmit} className="space-y-6">
         {error && <p className="text-red-500 text-center">{error}</p>}
         {success && <p className="text-green-500 text-center">{success}</p>}
         <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
               Email address
            </label>
            <input
               id="email"
               name="email"
               type="email"
               autoComplete="email"
               value={signInForm.email}
               onChange={handleChange}
               required
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
         </div>

         <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
               Password
            </label>
            <input
               id="password"
               name="password"
               type="password"
               value={signInForm.password}
               onChange={handleChange}
               autoComplete="current-password"
               required
               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
         </div>

         <div className="flex items-center justify-between">
            <div className="flex items-center">
               <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
               />
               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
               </label>
            </div>

            <div className="text-sm">
               <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                  Forgot your password?
               </a>
            </div>
         </div>

         <div>
            <button
               type="submit"
               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 hover:cursor-pointer"
            >
               Sign in
            </button>
         </div>
      </form>
   );
};

export default SignInForm;