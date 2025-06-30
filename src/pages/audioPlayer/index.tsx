import { ElementRef, useRef } from "react";
import Player from "./Player";
import PlayerProvider from "./PlayerContext";
import useGetSongs from "./useGetSongs";

function Content() {
   const audioRef = useRef<ElementRef<"audio">>(null);

   useGetSongs();

   return (
      <>
         <audio ref={audioRef} className="hidden"></audio>
         {audioRef.current && <Player audioEle={audioRef.current} />}
      </>
   );
}

export default function AudioPlayer() {
   return (
      <PlayerProvider>
         <Content />
      </PlayerProvider>
   );
}
