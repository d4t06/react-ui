import { useEffect } from "react";

type Props = {
   tab: "playing" | "queue";
   back: () => void;
};

export default function useSongListEvent({ tab, back }: Props) {
   const scroll = (el: Element) => {
      el.scrollIntoView({
         behavior: "instant",
         block: "center",
      });
   };

   const handleWindowClick: EventListener = (e) => {
      const $ = document.querySelector.bind(document);

      const buttons = [$(".queue-btn")];
      const player = $(".player");
      const target = e.target as Node;

      if (
         !player ||
         player?.contains(target) ||
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
