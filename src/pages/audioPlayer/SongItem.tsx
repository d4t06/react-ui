import { Song } from "./types";
import { formatTime } from "./usePlayer";

type Props = {
   song: Song;
   index: number;
   active: boolean;

   setCurrentSong: (i: number) => void;
};

export default function SongItem({
   song,
   active,
   index,
   setCurrentSong,
}: Props) {
   const handleSetSong = () => {
      if (!active) {
         setCurrentSong(index);
      }
   };

   const classes = {
      container:
         "flex w-full font-medium justify-between items-center rounded-md p-2",
   };

   const getActiveClass = () => {
      if (active) return "bg-amber-100 text-amber-800";
      return "cursor-pointer text-amber-100 hover:bg-amber-700";
   };

   return (
      <div
         onClick={handleSetSong}
         className={`${classes.container} ${getActiveClass()}`}
      >
         <div className="">
            <h5 className="">{song.name}</h5>
            <p className=" text-sm">{song.singer}</p>
         </div>
         <span className="">{formatTime(song.duration)}</span>
      </div>
   );
}
