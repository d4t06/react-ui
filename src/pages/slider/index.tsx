import ImageSlider from "./Slider";

const images = [
	"https://placehold.co/400",
	"https://placehold.co/400",
	"https://placehold.co/400",
];
export default function SliderPage() {
	return (
		<div className="h-[200px] aspect-[16/9]">
			<ImageSlider autoPlay images={images} />
		</div>
	);
}
