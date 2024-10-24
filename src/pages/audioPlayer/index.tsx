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
         <audio ref={audioRef}  className="hidden"></audio>
         {audioRef.current && <Player audioEle={audioRef.current} />}
      </PlayerProvider>
   );
}
