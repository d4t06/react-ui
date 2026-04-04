import { ClipboardEventHandler, useState } from "react";

export default function useReadCopiedImage() {
   const [imageUrl, setImageUrl] = useState("");

   const handleInputChange: ClipboardEventHandler = async (e) => {
      try {
         const fileLists = e.clipboardData?.files;
         if (!fileLists.length) return;

         e.preventDefault();

         setImageUrl(URL.createObjectURL(fileLists[0]));
      } catch (error) {
         console.log(error);
      }
   };

   return { imageUrl, handleInputChange };
}
