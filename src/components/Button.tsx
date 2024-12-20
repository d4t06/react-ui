import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { VariantProps, cva } from "class-variance-authority";
import { ElementRef, forwardRef, ReactNode, Ref } from "react";
import { Link } from "react-router-dom";

const classes = {
   active: "before:shadow-none font-[500] translate-y-[2px] text-[#cd1818]",
   button: "inline-flex relative  items-center justify-center z-0",
};

const ButtonVariant = cva(classes.button, {
   variants: {
      variant: {
         primary:
            "before:content-[''] before:absolute before:z-[-1] before:inset-0 before:rounded-[8px] rounded-[8px]  active:translate-y-[2px] active:before:shadow-none",
         clear: "",
      },
      size: {
         clear: "",
         primary: "px-[15px] py-[5px]",
      },
      colors: {
         primary:
            "before:border-[#a00000] text-[#fff] bg-[#cd1818] before:shadow-[0_2px_0_#a00000]",
         second:
            "before:border-[#ccc] text-[#333] bg-[#f6f6f6] before:shadow-[0_2px_0_#ccc]",
         third: "before:border-[#a00000] bg-[#fff] text-[#000] before:shadow-[0_2px_0_#a00000]",
         four: "text-amber-100 before:bg-amber-800 before:border-[#78350f] before:shadow-[0_2px_0_#78350f]" ,
         clear: "",
      },
      border: {
         primary: "before:border-[2px]",
         thin: "before:border-[1px]",
         clear: "before:border-b-[2px]",
      },
      fontWeight: {
         primary: "font-[500]",
         thin: "",
      },
   },
   defaultVariants: {
      size: "primary",
      colors: "primary",
      variant: "primary",
      border: "primary",
      fontWeight: "primary",
   },
});

interface Props extends VariantProps<typeof ButtonVariant> {
   onClick?: () => void;
   loading?: boolean;
   children: ReactNode;
   disabled?: boolean;
   className?: string;
   type?: HTMLButtonElement["type"];
   href?: string;
   active?: boolean;
}
function Button(
   {
      onClick,
      disabled,
      type = "button",
      children,
      loading,
      className,
      size,
      variant,
      colors,
      href,
      active,
      fontWeight,
      border,
   }: Props,
   ref: Ref<ElementRef<"button">>
) {
   const content = (
      <>
         {loading && <ArrowPathIcon className="w-[24px] animate-spin" />}
         {!loading && children}
      </>
   );

   return (
      <>
         {href ? (
            <Link
               to={href}
               className={`${ButtonVariant({
                  variant,
                  size,
                  colors,
                  border,
                  fontWeight,
                  className,
               })} ${active ? classes.active : ""}`}
            >
               {content}
            </Link>
         ) : (
            <button
               ref={ref}
               type={type || "button"}
               onClick={onClick}
               disabled={loading || disabled}
               className={`${ButtonVariant({
                  variant,
                  size,
                  colors,
                  border,
                  fontWeight,
                  className,
               })} ${active ? classes.active : ""}`}
            >
               {content}
            </button>
         )}
      </>
   );
}

export default forwardRef(Button);
