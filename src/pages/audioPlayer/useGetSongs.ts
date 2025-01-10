import { useEffect, useRef, useState } from "react";
import { usePlayerContext } from "./PlayerContext";
import { Song } from "./types";
import { songs } from "./constant/songs";

export default function useGetSongs() {
   const [isFetching, setIsFetching] = useState(true);

   const ranEffect = useRef(false);

   const { setSongs } = usePlayerContext();

   const api = async () => {
      try {
         const isDev = import.meta.env.DEV;

         if (isDev) {
            setSongs(songs);
         } else {
            const res = await fetch("https://nest-mp3.vercel.app/api/songs");

            if (res.ok) {
               const payload = (await res.json()) as { data: { songs: Song[] } };
               setSongs(payload.data.songs);
            }
         }
      } catch (error) {
         console.log({ message: error });
      } finally {
         setIsFetching(false);
      }
   };

   useEffect(() => {
      if (!ranEffect.current) {
         ranEffect.current = true;
         api();
      }
   }, []);

   return {
      isFetching,
   };
}
