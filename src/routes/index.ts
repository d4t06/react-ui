import BrowserBackground from "@/pages/BrowserBackground";
import ButtonPage from "@/pages/ButtonPage";
import ImageModal from "@/pages/ImageModal";
import AnimationRendering from "@/pages/animationRendering";
import Gallery from "@/pages/gallery";
import PopupPage from "@/pages/popup";
import ScrollTexPage from "@/pages/scrollText";
import AudioPlayer from "@/pages/audioPlayer";
import Tet from "@/pages/tet";
import GeneratePdfPage from "@/pages/generatePdf";
import SliderPage from "@/pages/slider";

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
   {
      path: "/browser-background",
      component: BrowserBackground,
      title: "Browser Bg",
   },
   {
      path: "/tet",
      component: Tet,
      title: "Snow",
   },
   {
      path: "/pdf",
      component: GeneratePdfPage,
      title: "Generate Pdf",
   },
   {
      path: "/slider",
      component: SliderPage,
      title: "Slider",
   },
];

export { publicRoutes };
