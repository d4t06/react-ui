import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import useReadCopiedImage from "./_hooks/useReadCopiedImage";
import Image from "./_components/MyImage";

export default function Gallery() {
   const [openModal, setOpenModal] = useState(false);

   const { imageUrl } = useReadCopiedImage();

   const classes = {
      container: "w-[85vw] h-[80vh] flex flex-col",
      imageContainer: "relative pt-[100%]",
      imageFrame:
         "absolute flex w-full items-center justify-center bg-[#f1f1f1] inset-0 rounded-[8px] border-[2px] border-[#ccc] hover:border-[#cd1818] overflow-hidden",
      galleryTop: "flex justify-between border-b border-[#ccc] mb-[10px] pb-[10px]",
      galleryBody: "flex-grow overflow-hidden flex mx-[-10px]",
      bodyLeft: "w-full sm:w-2/3 overflow-auto px-[10px]",
      bodyRight: "hidden sm:block px-[10px] w-1/3 border-l-[2px] space-y-[14px]",
   };

   return (
      <>
         <input className="hidden" type="file" id="image-upload" />

         {imageUrl && <Image className="w-[400px]" src={imageUrl} />}

         <p>Past image here</p>

         <Button onClick={() => setOpenModal(true)}>Open</Button>

         {openModal && (
            <Modal closeModal={() => setOpenModal(false)}>
               <div className={classes.container}>
                  <div className={classes.galleryTop}>
                     <div className={"flex items-center"}>
                        <p className="text-[18px] sm:text-[22px] font-[500]">Gallery</p>
                        <Button
                           colors={"second"}
                           size="clear"
                           className="ml-[10px] h-full"
                        >
                           <label
                              className="flex items-center px-[10px]"
                              htmlFor="image-upload"
                           >
                              <ArrowUpTrayIcon className="w-[20px]" />
                              <span className="hidden sm:block ml -[6px]">Upload</span>
                           </label>
                        </Button>
                     </div>

                     <Button>Select</Button>
                  </div>
                  <div className={classes.galleryBody}>
                     <div className={classes.bodyLeft}>
                        <div className="flex flex-wrap mt-[-8px] overflow-x-hidden overflow-y-auto mx-[-4px]">
                           <p>images</p>
                        </div>
                     </div>
                     <div className={classes.bodyRight}>
                        {true && (
                           <>
                              <h2 className="break-words">image</h2>

                              <Button>Delete</Button>
                           </>
                        )}
                     </div>
                  </div>
               </div>
            </Modal>
         )}
      </>
   );
}
