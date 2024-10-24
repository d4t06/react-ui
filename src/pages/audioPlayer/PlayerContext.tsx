import { ReactNode, createContext, useContext, useRef, useState } from "react";
import { Song } from "./types";

const usePlayer = () => {
   const [songs, setSongs] = useState<Song[]>([]);

   const currentSongRef = useRef<Song | null>(null);
   const [currentIndex, setCurrentIndex] = useState<number | null>(null);

   const setCurrentSong = (index: number) => {
      setCurrentIndex(index);
      currentSongRef.current = songs[index];
   };

   return { songs, currentSongRef, setCurrentSong, currentIndex, setSongs };
};

type ContextType = ReturnType<typeof usePlayer>;

const Context = createContext<ContextType | null>(null);

export default function PlayerProvider({ children }: { children: ReactNode }) {
   return <Context.Provider value={usePlayer()}>{children}</Context.Provider>;
}

export function usePlayerContext() {
   const context = useContext(Context);

   if (!context) throw new Error("");

   return context;
}
