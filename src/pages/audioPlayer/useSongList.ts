import { RefObject, useEffect } from "react";

type Props = {
   tab: "playing" | "queue";
   back: () => void;
   songListContainer: RefObject<HTMLDivElement>;
};

export default function useSongListEvent({
   tab,
   back,
   songListContainer,
}: Props) {
   const scroll = (el: Element) => {
      el.scrollIntoView({
         behavior: "instant",
         block: "center",
      });
   };

   const handleWindowClick: EventListener = (e) => {
      const $ = document.querySelector.bind(document);

      const buttons = [$(".queue-btn")];
      const target = e.target as Node;

      if (
         !songListContainer ||
         songListContainer.current?.contains(target) ||
         !!buttons.find((btn) => btn?.contains(target))
      )
         return;

      back();
   };

   useEffect(() => {
      if (tab !== "queue") return;

      const activeSongEle = document.querySelector(".active-song-item");
      if (activeSongEle) scroll(activeSongEle);

      window.addEventListener("click", handleWindowClick);

      return () => {
         window.removeEventListener("click", handleWindowClick);
      };
   }, [tab]);
}
