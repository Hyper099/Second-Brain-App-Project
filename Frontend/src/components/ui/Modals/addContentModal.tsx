import { Button } from "../Button";


const AddContentModal = () => {
   return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-blue-100/50 backdrop-blur-sm">
               <div className="bg-white w-[700px] h-3/4 opacity-100 rounded-2xl shadow-2xl flex justify-between p-10">
                  <div>
                     hi
                  </div>
                  <div>
                     <Button variant="primary" size="sm" text="Close" onclick={closeAddContentModal}/>
                  </div>
               </div>
            </div>
         );
}

export default AddContentModal;
