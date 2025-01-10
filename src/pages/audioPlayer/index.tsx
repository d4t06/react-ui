import { ElementRef, useEffect, useRef, useState } from "react";
import Player from "./Player";
import PlayerProvider from "./PlayerContext";

export default function AudioPlayer() {
   const [_hadAudio, setHadAudio] = useState(false);

   const audioRef = useRef<ElementRef<"audio">>(null);

   useEffect(() => {
      setHadAudio(true);
   }, []);

   return (
      <PlayerProvider>
         <div className="absolute inset-0 translate-x-0 z-[99]">
            <audio ref={audioRef} className="hidden"></audio>
            {audioRef.current && <Player audioEle={audioRef.current} />}
         </div>
      </PlayerProvider>
   );
}
