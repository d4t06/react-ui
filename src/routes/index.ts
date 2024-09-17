import ButtonPage from "@/pages/ButtonPage";
import ImageModal from "@/pages/ImageModal";
import AnimationRendering from "@/pages/animationRendering";
import Gallery from "@/pages/gallery";
import ScrollTexPage from "@/pages/scrollText";

const publicRoutes = [
   {
      path: "/image-modal",
      component: ImageModal,
      title: "Image Modal",
   },
   {
      path: "/button",
      component: ButtonPage,
      title: "Button",
   },
   {
      path: "/gallery",
      component: Gallery,
      title: "Gallery",
   },
   {
      path: "/scroll-text",
      component: ScrollTexPage,
      title: "Scroll Text  ",
   },
   {
      path: "/animation-rendering",
      component: AnimationRendering,
      title: "Animation",
   },
];

export { publicRoutes };
