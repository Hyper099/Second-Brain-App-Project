import { ChangeEvent, FormEvent, useState } from "react";
import API from "../../API";

interface FormData {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
}

const SignUpForm = () => {
   const [formData, setFormData] = useState<FormData>({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
   });

   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      
      setFormData(prev => ({
         ...prev,
         [e.target.name]: e.target.value
      }));
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      setSuccess('');

      try {
         const response = await API.post('/signup', formData);
         setSuccess(response.data.message || 'Signup successful!');
         setFormData({ email: '', password: '', firstName: '', lastName: '' });
      } catch (err: any) {
         setError(err.response?.data?.error || 'Error registering');
      }
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-6">
         {error && <p className="text-red-500 text-center">{error}</p>}
         {success && <p className="text-green-500 text-center">{success}</p>}

         <div className="grid grid-cols-2 gap-4">
            <div>
               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
               </label>
               <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
               />
            </div>

            <div>
               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last name
               </label>
               <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
               />
            </div>
         </div>

         <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
               Email address
            </label>
            <input
               id="email"
               name="email"
               type="email"
               autoComplete="email"
               required
               value={formData.email}
               onChange={handleChange}
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
               autoComplete="new-password"
               required
               value={formData.password}
               onChange={handleChange}
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
