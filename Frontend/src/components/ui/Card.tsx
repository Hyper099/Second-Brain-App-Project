import DocumentIcon from "../Icons/DocumentIcon";
import { ShareIcon } from "../Icons/ShareIcon";
import TrashIcon from "../Icons/TrashIcon";

interface CardProps {
   title: string,
   link: string,
   type:string,
}

const Card = (props: CardProps) => {
   return (
      <div className="bg-white text-black shadow rounded-lg max-w-80 p-4 min-h-96" >

         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-500" >
               <DocumentIcon />
               <h1 className="text-xl font-semibold text-black">{props.title}</h1>
            </div>

            <div className="flex items-center gap-3 text-gray-500">
               <ShareIcon size="md" />
               <TrashIcon />

            </div>
         </div>

      </div>
   );
};

export default Card;
