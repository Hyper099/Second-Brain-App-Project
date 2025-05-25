import { useState } from "react";
import { Button } from "../Button";
import { InputField } from "../InputField";

interface ShareContentModalProps {
   isOpen: boolean
   onClose: () => void
}

const ShareContentModal = ({ isOpen, onClose }: ShareContentModalProps) => {
   const [shareForm, setShareForm] = useState({
      email: "",
      message: ""
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setShareForm(prev => ({
         ...prev,
         [name]: value
      }));
   };

   const shareContent = async () => {
      try {
         // TODO: Implement share functionality
         console.log("Sharing with:", shareForm);
         alert(`Brain shared with ${shareForm.email}`);
         setShareForm({ email: "", message: "" });
         onClose();
      } catch (error) {
         console.error("Error while sharing content:", error);
      }
   }

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
         <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
               <h2 className="text-lg font-semibold text-gray-800">Share Your Brain</h2>
               <Button text="X" variant="primary" size="sm" onclick={onClose} />
            </div>

            <div className="flex flex-col gap-4">
               <InputField
                  placeholder="Enter Email Address"
                  size="md"
                  name="email"
                  value={shareForm.email}
                  onChange={handleChange}
               />
               <InputField
                  placeholder="Enter Message (Optional)"
                  size="md"
                  name="message"
                  value={shareForm.message}
                  onChange={handleChange}
               />
            </div>

            <div className="flex gap-2 pt-2">
               <Button
                  variant="primary"
                  size="md"
                  text="Cancel"
                  onclick={onClose}
               />
               <Button
                  variant="secondary"
                  size="md"
                  text="Share Brain"
                  onclick={shareContent}
               />
            </div>
         </div>
      </div>
   );
};

export default ShareContentModal;