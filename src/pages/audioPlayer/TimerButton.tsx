import Button from "@/components/Button";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useCountDown from "./useCountdown";
import { useRef } from "react";
import Modal2, { ModalRef } from "../animationRendering/Modal2";

type Props = {
   audioEle: HTMLAudioElement;
   isPlaying: boolean;
   play: () => void;
   disbale?: boolean;
};

const COUNT_LIST = [3, 5, 7, 10];

type TimerModalProps = {
   active: (c: number) => void;
   closeModal: () => void;
};

function TimerModal({ active, closeModal }: TimerModalProps) {
   const handleSetTimer = (songCount: number) => {
      active(songCount);
      closeModal();
   };

   const classes = {
      button: `ml-2 mt-2 px-3  py-1 rounded-[99px]`,
   };

   const renderItems = COUNT_LIST.map((count) => {
      return (
         <Button
            colors={"four"}
            key={count}
            type="button"
            onClick={() => handleSetTimer(count)}
            className={`${classes.button} `}
         >
            {count} songs
         </Button>
      );
   });

   return (
      <div className="w-[300px] max-w-[calc(100vw-40px)] p-4 bg-amber-100 text-amber-800 rounded-lg">
         <h1 className="text-3xl mb-3">Sleep timer</h1>
         <div>
            <div className="flex flex-wrap -mt-2 -ml-2 mb-3">{renderItems}</div>
         </div>
      </div>
   );
}

export default function TimerButton({ audioEle, isPlaying, play, disbale }: Props) {
   const modalRef = useRef<ModalRef>(null);

   const { isActive, clearTimer, countDown, setIsActive } = useCountDown({
      audioEle,
      isPlaying,
      play,
   });

   const closeModal = () => modalRef.current?.close();

   const handleTriggerClick = () => {
      if (isActive) clearTimer(true);
      else modalRef.current?.open();
   };

   const classes = {
      triggerModalBtn: `p-2 group h-full timer-btn w-10`,
   };

   return (
      <>
         <Button
            disabled={disbale}
            className={classes.triggerModalBtn}
            size={"clear"}
            colors={"four"}
            active={!!isActive}
            onClick={handleTriggerClick}
         >
            {isActive ? (
               <>
                  <span className="group-hover:hidden leading-[1] mb-[2px]">
                     {countDown.toString().padStart(2, "0")}
                  </span>
                  <XMarkIcon className="w-6 hidden group-hover:block pointer-events-none" />
               </>
            ) : (
               <ClockIcon className="w-6 pointer-events-none" />
            )}
         </Button>

         <Modal2 ref={modalRef}>
            <TimerModal closeModal={closeModal} active={setIsActive} />
         </Modal2>
      </>
   );
}
