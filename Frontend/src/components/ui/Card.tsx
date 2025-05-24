import { ReactElement, useEffect } from "react";
import DocumentIcon from "../Icons/DocumentIcon";
import { ShareIcon } from "../Icons/ShareIcon";
import TrashIcon from "../Icons/TrashIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import YouTubeIcon from "../Icons/YouTubeIcon";

interface CardProps {
   title: string;
   link: string;
   type: "notes" | "youtube" | "twitter";
   addedOn: Date | string;
}

// Icons per type
const ConditionalIconLoader: Record<string, ReactElement> = {
   notes: <DocumentIcon />,
   youtube: <YouTubeIcon />,
   twitter: <TwitterIcon />,
};

const Card = (props: CardProps) => {
   // When it's a Twitter card, after the blockquote is rendered
   // call twttr.widgets.load() so Twitter turns it into an embed.
   useEffect(() => {
      if (props.type === "twitter") {
         // If the widgets.js script is already loaded, just re-run
         if (window?.twttr?.widgets) {
            window.twttr.widgets.load();
         } else {
            // Otherwise inject the script once
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            document.body.appendChild(script);
         }
      }
   }, [props.link, props.type]);

   const renderEmbedContent = () => {
      if (props.type === "youtube") {
         const trimmedLink = props.link.split("&")[0];
         const finalLink = trimmedLink.replace("watch?v=", "embed/");
         return (
            <div className="relative w-full h-0 pb-[56.25%]">
               <iframe
                  src={finalLink}
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  title={props.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
               />
            </div>
         );
      }

      if (props.type === "twitter") {
         // The blockquote + link alone is enough; widgets.js will hydrate it.
         return (
            <blockquote className="twitter-tweet">
               <a href={props.link.replace("x.com", "twitter.com")} />
            </blockquote>
         );
      }

      return null;
   };

   return (
      <div className="bg-white text-black shadow rounded-xl p-6 min-h-[440px] w-full outline outline-gray-200 flex flex-col">
         {/* Header */}
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

         {/* Embed */}
         <div className="flex-grow mt-2 rounded-xl w-full">{renderEmbedContent()}</div>

         {/* Footer */}
         <div>
            <p className="text-sm text-gray-400 mt-4">
               Added on:{" "}
               {new Date(props.addedOn).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
               })}
            </p>
         </div>
      </div>
   );
};

export default Card;
