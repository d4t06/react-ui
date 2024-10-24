import { ElementRef, useRef, useState } from "react";
import usePlayer, { formatTime } from "./usePlayer";
import {
   ArrowPathIcon,
   BackwardIcon,
   ForwardIcon,
   PauseIcon,
   PlayIcon,
   QueueListIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import { usePlayerContext } from "./PlayerContext";
import SongList from "./SongList";
import useGetSongs from "./useGetSongs";

type Props = {
   audioEle: HTMLAudioElement;
};

export type Tab = "playing" | "queue";

export default function Player({ audioEle }: Props) {
   const { currentSongRef, songs, setCurrentSong } = usePlayerContext();

   const [tab, setTab] = useState<Tab>("playing");

   const processLineRef = useRef<ElementRef<"div">>(null);
   const timeHolderRef = useRef<ElementRef<"div">>(null);
   const currentTimeRef = useRef<ElementRef<"div">>(null);

   const { isFetching } = useGetSongs();
   const { handlePlayPause, handleSeek, handleNext, handlePrevious, status } =
      usePlayer({
         currentTimeRef,
         processLineRef,
         timeHolderRef,
         audioEle,
      });

   const _handlePlayPause = () => {
      if (currentSongRef.current === null)
         setCurrentSong(Math.round(Math.random() * songs.length - 1));
      else handlePlayPause();
   };

   const renderPlayButton = () => {
      switch (status) {
         case "playing":
            return <PauseIcon className="w-10" />;

         case "paused":
            return <PlayIcon className="w-10" />;

         case "waiting":
            return <ArrowPathIcon className="w-10 animate-spin" />;
      }
   };

   const classes = {
      timeLineRef: `relative group h-full sm:h-1 hover:h-full  w-full rounded-full bg-[#fff]/30 before:content-[''] before:w-[100%] before:h-[16px] before:absolute before:top-[50%] before:translate-y-[-50%]`,
      timeLineHolderRef:
         "absolute pointer-events-none h-6 w-3 rounded-sm bg-amber-900 border-[2px] border-amber-200 top-1/2 -translate-y-1/2 -translate-x-1/2",
      toggleButton: "queue-btn p-2 ",
   };

   const handleShowHide = (active: boolean) => {
      if (active) return "opacity-100 h-auto";
      else return "opacity-0 pointer-events-none h-0";
   };

   if (isFetching) return <ArrowPathIcon className="animate-spin w-6" />;

   return (
      <>
         <div className="w-[400px] max-w-[75vw] ">
            <div className="p-3 bg-amber-800 text-amber-100 rounded-[16px] border-[4px] border-amber-900 border-b-[8px]">
               <div className={` ${handleShowHide(tab === "playing")} `}>
                  <div className="text-center">
                     <p className="font-bold text-2xl line-clamp-1">
                        {currentSongRef.current?.name || "..."}
                     </p>
                     <p className="text-sm font-medium line-clamp-1">
                        {currentSongRef.current?.singer || "..."}
                     </p>
                  </div>

                  <div
                     className={`${
                        !currentSongRef.current ? "disabled" : ""
                     } h-[6px] mt-5 mb-2 flex items-center"`}
                  >
                     <div
                        ref={processLineRef}
                        onClick={handleSeek}
                        className={`${classes.timeLineRef}`}
                     >
                        <div
                           ref={timeHolderRef}
                           className={classes.timeLineHolderRef}
                        ></div>
                     </div>
                  </div>

                  <div className="flex justify-between items-center h-[30px]">
                     <div ref={currentTimeRef}>0:00</div>
                     <div>
                        {formatTime(currentSongRef.current?.duration || 0)}
                     </div>
                  </div>

                  <div
                     className={`flex my-2 justify-center items-center space-x-3 `}
                  >
                     <Button
                        disabled={!songs.length}
                        colors={"four"}
                        onClick={handlePrevious}
                     >
                        <BackwardIcon className="w-8" />
                     </Button>

                     <Button colors={"four"} onClick={_handlePlayPause}>
                        {renderPlayButton()}
                     </Button>

                     <Button
                        disabled={!songs.length}
                        colors={"four"}
                        onClick={handleNext}
                     >
                        <ForwardIcon className="w-8" />
                     </Button>
                  </div>
               </div>

               <div className={`${handleShowHide(tab === "queue")} `}>
                  <SongList
                     tab={tab}
                     back={() => setTab("playing")}
                     songs={songs}
                  />
               </div>
            </div>
         </div>

         <div className="absolute bottom-8 right-8 flex space-x-2">
            <Button
               className={classes.toggleButton}
               size={"clear"}
               colors={"four"}
               onClick={() =>
                  tab === "playing" ? setTab("queue") : setTab("playing")
               }
            >
               <QueueListIcon className="w-6" />
            </Button>
         </div>
      </>
   );
}
