
import { useEffect, useState } from "react";
import API from "../api/API";
import Card from "../components/ui/Card";
import DashBoardHeader from "../components/ui/DashBoardHeader";
import SideBar from "../components/ui/Sidebar/SideBar";

interface ContentItem {
   title: string;
   link: string;
   type: 'notes' | 'youtube' | 'twitter';
   addedAt: Date;
}

const DashBoard = () => {

   const [contents, setContents] = useState<ContentItem[]>([]);
   const [contentEmpty, setContentEmpty] = useState(true);
   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
   const [loading, setLoading] = useState(true);

   //! Fetch Contents from Backend.
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
      } finally {
         setLoading(false);
      }
   }

   //! Listen for Sidebar Changes.
   useEffect(() => {
      const handleSidebarToggle = () => {
         const sidebar = document.querySelector('[data-sidebar]');
         if (sidebar) {
            setSidebarCollapsed(sidebar.classList.contains('w-20'));
         }
      };

      const observer = new MutationObserver(handleSidebarToggle);
      const sidebar = document.querySelector('[data-sidebar]');

      if (sidebar) {
         observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
      }

      return () => observer.disconnect();
   }, []);


   //! Fetch Contents
   useEffect(() => {
      fetchContent();
   }, [])
   
   

   return (
      <div className="flex">

         {/* //! Sidebar */}
         <SideBar />

         {/* //! Main Content */}
         <div className={`
            flex-1 px-5 py-8 min-h-screen
            ${sidebarCollapsed
               ? 'ml-20'
               : 'ml-70'
            }
            `}>
            <DashBoardHeader onContentModified={fetchContent} />
            {loading ? (
               <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading...</span>
               </div>
            ) : contentEmpty ? (
               <div className="text-gray-500 text-lg mt-10 text-center">
                  No content available. Click "Add Content" to get started.
               </div>
            ) : (
               <div className={`
                  grid gap-5
                  ${sidebarCollapsed
                     ? 'grid-cols-1 sm:grid-cold-2 lg:grid-cols-3 xl:grid-cols-4'
                     : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                     }`}
                  >
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
