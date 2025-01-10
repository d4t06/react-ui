import { MouseEventHandler, RefObject, useEffect, useMemo, useRef } from "react";
import useAudioControl from "./useAudioControl";
import { usePlayerContext } from "./PlayerContext";
import { getLocalStorage, setLocalStorage } from "@/share/appHelper";

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
   const { currentIndex, setCurrentSong, songs, currentSongRef } = usePlayerContext();

   const currentIndexRef = useRef<number | null>(null);
   const isPlayedAllSong = useRef(false); // for handle song end
   const firstTimeSongLoaded = useRef(true); // for update song current time

   const shouldSetPlayingStatus = useRef(false);

   const { pause, status, setStatus } = useAudioControl({
      audioEle: audioEle,
   });

   const memoStorage = useMemo(() => getLocalStorage(), []);

   /** update 5/11/2024
    * rewrite play method
    */

   // need update time to decide update audio time of not
   const play = async (props: { updateTime?: boolean } | undefined = {}) => {
      try {
         if (firstTimeSongLoaded.current) {
            firstTimeSongLoaded.current = false;

            if (props.updateTime) {
               const storage = getLocalStorage();

               const currentTime = storage["current_time"] || 0;
               audioEle.currentTime = currentTime;
            }
         }

         await audioEle.play();
      } catch (error) {}
   };

   const handlePlayPause = () => {
      status === "playing" ? pause() : status === "paused" && play({ updateTime: true });
   };

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
         if (status === "playing") setStatus("waiting");

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

      /** because playing event only fire onnce
       * there for we need to set playing status after time update
       * but only set playing status if song is paused
       */
      if (shouldSetPlayingStatus.current) setStatus("playing");

      // if (status !== "playing") setStatus("playing");
      updateTimeProgressEle(currentTime);

      if (Math.round(currentTime) % 3 === 0)
         setLocalStorage("current_time", Math.round(currentTime));
   };

   const handleEnded = () => {
      const storage = getLocalStorage();

      const timer = storage["timer"];

      if (!!timer && timer !== 1) return handleNext();

      if (timer === 1 || currentIndexRef.current === songs.length - 1)
         isPlayedAllSong.current = true;

      handleNext();
   };

   const handleLoadStart = () => {
      if (currentIndexRef.current) setStatus("waiting");
   };

   const handleLoaded = () => {
      if (isPlayedAllSong.current) {
         isPlayedAllSong.current = false;
         return setStatus("paused");
      }

      if (currentIndexRef.current) {
         setLocalStorage("current_index", currentIndexRef.current);
      }

      if (firstTimeSongLoaded.current) {
         console.log("go here");

         setStatus("paused");

         const currentTime = memoStorage["current_time"] || 0;
         updateTimeProgressEle(currentTime);
         return;
      }

      play();
   };

   // update localStorage
   useEffect(() => {
      if (!songs.length) return;

      const currentIndex = memoStorage["current_index"] || null;
      if (currentIndex) setCurrentSong(currentIndex);
      else firstTimeSongLoaded.current = false;
   }, [songs]);

   // add events listener
   useEffect(() => {
      if (!songs.length) return;

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
   }, [songs]);

   // reset ui, update currentIndexRef
   useEffect(() => {
      if (currentIndex === null) return;

      pause();
      currentIndexRef.current = currentIndex;
      if (currentSongRef.current) audioEle.src = currentSongRef.current.song_url;

      return () => {
         updateTimeProgressEle(0);
      };
   }, [currentIndex]);

   // upate
   useEffect(() => {
      if (status === "paused") shouldSetPlayingStatus.current = false;
      else if (status === "playing") shouldSetPlayingStatus.current = true;
   }, [status]);

   return {
      handleSeek,
      handlePlayPause,
      handleNext,
      handlePrevious,
      play,
      pause,
      status,
   };
}
