import Button from "@/components/Button";

export default function ButtonPage() {
   return (
      <div className="flex flex-col space-y-[10px]">
         <Button>Click me</Button>
         <Button colors={"second"}>Click me</Button>
         <Button colors={"third"}>Click me</Button>
      </div>
   );
}
