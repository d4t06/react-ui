import { useEffect, useState } from "react";

export default function useReadCopiedImage() {
   const [imageUrl, setImageUrl] = useState("");

   const handleReadImage = async (e: ClipboardEvent) => {
      try {
         const fileLists = e.clipboardData?.files;

         if (!fileLists) return;

         setImageUrl(URL.createObjectURL(fileLists[0]));
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      window.addEventListener("paste", handleReadImage);

      return () => {
         window.removeEventListener("paste", handleReadImage);
      };
   }, []);

   return { imageUrl };
}
