
import { FaPen, FaTrashCan } from "react-icons/fa6";

export const TagOperatingElement = () => {
  return (
    <div className="flex items-center space-x-2">
      <FaPen className="w-8 h-8 p-2 border rounded-xl bg-stone-100 hover:bg-stone-200 cursor-pointer" />
      <FaTrashCan className="text-red-500 w-8 h-8 p-2 border rounded-xl bg-stone-100 hover:bg-stone-200 cursor-pointer" />
    </div>
  );
};
