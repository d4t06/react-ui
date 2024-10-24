import { ElementRef, useRef } from "react";
import { usePlayerContext } from "./PlayerContext";
import SongItem from "./SongItem";
import { Song } from "./types";
import useSongListEvent from "./useSongList";
import { Tab } from "./Player";

type Props = {
   songs: Song[];
   back: () => void;
   tab: Tab;
};

export default function SongList({ songs, back, tab }: Props) {
   const { setCurrentSong, currentIndex } = usePlayerContext();

   const songListContainer = useRef<ElementRef<"div">>(null);

   useSongListEvent({ back, tab, songListContainer });

   return (
      <div
         ref={songListContainer}
         className="max-h-[40vh] overflow-auto no-scrollbar"
      >
         {songs.map((s, i) => (
            <SongItem
               active={currentIndex === i}
               setCurrentSong={setCurrentSong}
               key={i}
               song={s}
               index={i}
            />
         ))}
      </div>
   );
}
