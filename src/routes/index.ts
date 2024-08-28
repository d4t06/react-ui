import ButtonPage from "@/pages/ButtonPage";
import ImageModal from "@/pages/ImageModal";
import Gallery from "@/pages/gallery";

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
];

export { publicRoutes };
