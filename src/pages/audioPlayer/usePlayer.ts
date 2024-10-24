import { MouseEventHandler, RefObject, useEffect, useRef } from "react";
import useAudioControl from "./useAudioControl";
import { usePlayerContext } from "./PlayerContext";

type Props = {
   audioEle: HTMLAudioElement;
   processLineRef: RefObject<HTMLDivElement>;
   currentTimeRef: RefObject<HTMLDivElement>;
   timeHolderRef: RefObject<HTMLDivElement>;
};

export const formatTime = (time: number) => {
   const minutes = Math.floor(time / 60);
   const seconds = Math.floor(time % 60);
   return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function usePlayer({
   audioEle,
   currentTimeRef,
   processLineRef,
   timeHolderRef,
}: Props) {
   const { currentIndex, setCurrentSong, songs, currentSongRef } =
      usePlayerContext();

   const currentIndexRef = useRef<number | null>(null);

   const { handlePlayPause, play, pause, status, setStatus } = useAudioControl({
      audioEle: audioEle,
   });

   const updateTimeProgressEle = (time: number) => {
      const timeLine = processLineRef.current;
      const timeLineHolder = timeHolderRef.current;
      const currentTimeEle = currentTimeRef.current;

      if (audioEle.duration && timeLineHolder && timeLine) {
         if (time === 0) {
            timeLine.style.background = "rgba(255,255,255,.3)";
            timeLineHolder.style.left = `0%`;
         } else {
            const ratio = time / (audioEle.duration / 100);

            timeLine.style.background = `linear-gradient(to right, #fde68a ${ratio}%, rgba(255,255,255,.3) ${ratio}%, rgba(255,255,255,.3) 100%)`;
            timeLineHolder.style.left = `${ratio}%`;
         }
      }

      if (currentTimeEle) currentTimeEle.innerText = formatTime(time) || "0:00";
   };

   const handleSeek = <MouseEventHandler>function (e) {
      const node = e.target as HTMLElement;
      if (processLineRef.current) {
         setStatus("waiting");

         const clientRect = node.getBoundingClientRect();

         const length = e.clientX - clientRect.left;
         const lengthRatio = length / processLineRef.current.clientWidth;
         const newSeekTime = lengthRatio * audioEle.duration;

         audioEle.currentTime = newSeekTime;
         updateTimeProgressEle(newSeekTime);
      }
   };

   const handleNext = () => {
      if (currentIndexRef.current === null) return;

      let newIndex = currentIndexRef.current + 1;

      if (newIndex > songs.length - 1) newIndex = 0;

      setCurrentSong(newIndex);
   };

   const handlePrevious = () => {
      if (currentIndexRef.current === null) return;

      let newIndex = currentIndexRef.current - 1;
      if (newIndex < 0) newIndex = songs.length - 1;

      setCurrentSong(newIndex);
   };

   const handleTimeUpdate = () => {
      if (!audioEle) return;
      const currentTime = audioEle?.currentTime;

      if (status !== "playing") setStatus("playing");

      updateTimeProgressEle(currentTime);
   };

   const handleEnded = () => {
      handleNext();
   };

   const handleLoadStart = () => {
      setStatus("waiting");
   };

   const handleLoaded = () => {
      setStatus("paused");

      play();
   };

   // add events listener
   useEffect(() => {
      audioEle.addEventListener("timeupdate", handleTimeUpdate);
      audioEle.addEventListener("ended", handleEnded);
      audioEle.addEventListener("loadedmetadata", handleLoaded);
      audioEle.addEventListener("loadstart", handleLoadStart);

      return () => {
         audioEle.removeEventListener("timeupdate", handleTimeUpdate);
         audioEle.removeEventListener("ended", handleEnded);
         audioEle.removeEventListener("loadedmetadata", handleLoaded);
         audioEle.removeEventListener("loadstart", handleLoadStart);
      };
   }, []);

   // reset ui, update currentIndexRef
   useEffect(() => {
      if (currentIndex === null) return;

      pause();
      currentIndexRef.current = currentIndex;
      if (currentSongRef.current)
         audioEle.src = currentSongRef.current.song_url;

      return () => {
         updateTimeProgressEle(0);
      };
   }, [currentIndex]);

   return {
      handleSeek,
      handlePlayPause,
      handleNext,
      handlePrevious,
      status,
   };
}
