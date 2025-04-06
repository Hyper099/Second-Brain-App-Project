import { ReactElement } from "react";
import DocumentIcon from "../Icons/DocumentIcon";
import LinkIcon from "../Icons/LinkIcon";
import TagsIcon from "../Icons/TagsIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import YouTubeIcon from "../Icons/YouTubeIcon";

interface SideBarProps{
   text:string,
}

const SideBarIcons: Record<string, ReactElement> = {
   "Videos": <YouTubeIcon />,
   "Tweets": <TwitterIcon />,
   "Documents": <DocumentIcon />,
   "Links": <LinkIcon />,
   "Tags" : <TagsIcon/>
}



const SideBarItem = (props: SideBarProps) => {
   return (
      <div className="flex items-center text-lg cursor-pointer p-3 rounded-xl
                     bg-transparent group
                     hover:bg-gray-100
                     transition-colors duration-200">
         <div className="text-gray-800 group-hover:text-black transition-all duration-200 w-8 flex justify-center group-hover:scale-110">
            {SideBarIcons[props.text]}
         </div>

         <div className="text-gray-600 group-hover:text-black transition-colors duration-200 text-lg ml-4 font-medium">
            {props.text}
         </div>
      </div>
   );
};

export default SideBarItem;
