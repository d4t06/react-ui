import {
   cloneElement,
   ElementRef,
   forwardRef,
   HTMLProps,
   isValidElement,
   ReactNode,
   Ref,
   useEffect,
   useRef,
   useState,
} from "react";

type PropsFromPopup = {
   isOpen?: boolean;
   setTriggerRef?: (ele: ElementRef<"button">) => void;
   onClick?: () => void;
};

type Props = {
   children: ReactNode;
   className?: string;
   position?: string;
   isOpen?: boolean;
   isWrapped?: boolean;
   content: string;
};

function ToolTip(
   {
      children,
      className = "bg-slate-700 text-white p-2 text-sm font-[500]",
      position = "bottom-[calc(100%+8px)]",
      isWrapped = false,
      content,
      ...rest
   }: Props,
   _ref: Ref<ElementRef<"button">> // use set trigger ref instead
) {
   const [open, setOpen] = useState(false);

   const cloneEleRef = useRef<ElementRef<"button">>(null);

   const { isOpen, setTriggerRef, onClick } = rest as PropsFromPopup;

   const handleMouseEnter: EventListener = () => {
      setOpen(true);
   };

   const handleMouseLeave: EventListener = () => {
      setOpen(false);
   };

   useEffect(() => {
      const cloneEle = cloneEleRef.current as HTMLButtonElement;
      if (!cloneEle) return;

      if (setTriggerRef) {
         setTriggerRef(cloneEle);
      }

      cloneEle.addEventListener("mouseenter", handleMouseEnter);
      cloneEle.addEventListener("mouseleave", handleMouseLeave);

      return () => {
         cloneEle.removeEventListener("mouseenter", handleMouseEnter);
         cloneEle.removeEventListener("mouseleave", handleMouseLeave);
      };
   }, []);

   const jsxContent = (
      <>
         {isValidElement(children) && (
            <>
               {!!Object.keys(rest).length
                  ? cloneElement(children, {
                       ref: cloneEleRef,
                       onClick,
                    } as HTMLProps<HTMLButtonElement>)
                  : cloneElement(children, {
                       ref: cloneEleRef,
                    } as HTMLProps<HTMLButtonElement>)}

               {!isOpen && open && (
                  <div
                     className={`absolute whitespace-nowrap -translate-x-1/2 left-1/2 rounded-md ${position} ${className}`}
                  >
                     {content}
                  </div>
               )}
            </>
         )}
      </>
   );

   if (isValidElement(children))
      return (
         <>
            {isWrapped ? (
               jsxContent
            ) : (
               <div className="relative">{jsxContent}</div>
            )}
         </>
      );
}

export default forwardRef(ToolTip);
