import Button from "@/components/Button";

export default function BrowserBackground() {
   // <meta content="#bcbbff" data-react-helmet="true" name="theme-color" />

   type Color = "black" | "amber";

   const handleSetBrowserBackground = (cl: Color) => {
      const meta = document.querySelector(".my-tag");
      if (meta) {
         switch (cl) {
            case "black":
               return meta.setAttribute("content", "#000");

            case "amber":
               return meta.setAttribute("content", "#fef3c7");
         }
      }
   };

   return (
      <>
         <Button onClick={() => handleSetBrowserBackground("black")}>
            Black
         </Button>
         <p>&nbsp;</p>
         <Button onClick={() => handleSetBrowserBackground("amber")}>
            Amber
         </Button>
      </>
   );
}
