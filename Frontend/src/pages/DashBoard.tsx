
import { useEffect, useState } from "react";
import API from "../api/API";
import Card from "../components/ui/Card";
import DashBoardHeader from "../components/ui/DashBoardHeader";
import SideBar from "../components/ui/Sidebar/SideBar";

interface ContentItem {
   _id: string;
   title: string;
   link: string;
   type: 'notes' | 'youtube' | 'twitter';
   addedAt: Date;
}

const DashBoard = () => {

   const [contents, setContents] = useState<ContentItem[]>([]);
   const [contentEmpty, setContentEmpty] = useState(true);

   const fetchContent = async () => {
      const token = localStorage.getItem("token");
      try {
         const response = await API.get("/content", {
            headers: {
               Authorization: token
            }
         });
         console.log(response.data.content.length);
         const data = response.data.content;
         if (data.length === 0 || !data) {
            setContentEmpty(true);
            setContents([]);
         } else {
            setContentEmpty(false);
            setContents(data)
         }
      } catch (error) {
         console.error("Error while fetching Content. ", error);
         setContentEmpty(true);
         setContents([]);
      }
   }


   //! Fetch Contents
   useEffect(() => {
      fetchContent();
   }, [])
   
   

   return (
      <div className="flex">

         {/* //! Sidebar */}
         <SideBar />

         {/* //! Main Content */}
         <div className="ml-72 flex-1 px-10 py-8 min-h-screen">
            <DashBoardHeader onContentModified={fetchContent} />

            {contentEmpty ? (
               <div className="text-gray-500 text-lg mt-10 text-center">
                  No content available. Click "Add Content" to get started.
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2">
                  {contents.map((item) => {
                     return (
                        <Card
                           title={item.title}
                           link={item.link}
                           type={item.type}
                           addedOn={item.addedAt}
                        />
                     )
                  })}
               </div>
            )}
         </div>
      </div>
   );
};


export default DashBoard;
