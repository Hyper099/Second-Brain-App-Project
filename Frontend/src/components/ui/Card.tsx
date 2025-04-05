import { ReactElement } from "react";
import DocumentIcon from "../Icons/DocumentIcon";
import { ShareIcon } from "../Icons/ShareIcon";
import TrashIcon from "../Icons/TrashIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import YouTubeIcon from "../Icons/YouTubeIcon";

interface CardProps {
   title: string;
   link: string;
   type: "notes" | "youtube" | "twitter";
   addedOn: Date;
}

// Icons per type
const ConditionalIconLoader: Record<string, ReactElement> = {
   notes: <DocumentIcon />,
   youtube: <YouTubeIcon />,
   twitter: <TwitterIcon />,
};

// Main Card Component
const Card = (props: CardProps) => {
   const renderEmbedContent = () => {
      if (props.type === "youtube") {
         const trimmedLink = props.link.split("&")[0];
         const finalLik = trimmedLink.replace("watch?v=", "embed/");

         return (
            <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <iframe
               src={finalLik}
               className="absolute top-0 left-0 w-full h-full rounded-xl"
               title={props.title}
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
               referrerPolicy="strict-origin-when-cross-origin"
               allowFullScreen>
            
               </iframe>
            </div>
         );
      }

      if (props.type === "twitter") {
         return (
            <blockquote className="twitter-tweet">
               <a href={props.link.replace("x.com","twitter.com")}></a>
            </blockquote>
         );
      }

      return null;
   };

   return (
      <div className="bg-white text-black shadow rounded-xl p-6 min-h-[440px] w-full outline outline-gray-200 flex flex-col">
         <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 text-gray-500">
               <div className="text-xl">{ConditionalIconLoader[props.type]}</div>
               <h1 className="text-xl font-semibold text-black">{props.title}</h1>
            </div>

            <div className="flex items-center gap-3 text-gray-500">
               <ShareIcon size="md" />
               <TrashIcon />
            </div>
         </div>

         <div className="flex-grow mt-2 rounded-xl w-full">
            {renderEmbedContent()}
         </div>

         <div>
            <p className="text-sm text-gray-400 mt-4">
               Added on: {props.addedOn?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
               }) ?? "N/A"}
            </p>
            
         </div>

      </div>
   );
};

export default Card;
