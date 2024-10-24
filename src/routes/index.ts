import ButtonPage from "@/pages/ButtonPage";
import ImageModal from "@/pages/ImageModal";
import AnimationRendering from "@/pages/animationRendering";
import Gallery from "@/pages/gallery";
import PopupPage from "@/pages/popup";
import ScrollTexPage from "@/pages/scrollText";
import AudioPlayer from "@/pages/audioPlayer";

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
   {
      path: "/popup",
      component: PopupPage,
      title: "Popup",
   },

   {
      path: "/music-player",
      component: AudioPlayer,
      title: "Music Player",
   },
];

export { publicRoutes };
