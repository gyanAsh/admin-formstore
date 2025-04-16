import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import defaultStyle from "@/assets/default-style.png";
import candyStyle from "@/assets/candy-style.png";
import sandStyle from "@/assets/sand-style.png";

export default function FormStyles() {
  return (
    <div className="*:not-first:mt-2">
      <Select defaultValue="2">
        <SelectTrigger className="**:data-desc:hidden w-36">
          <SelectValue placeholder="Choose your style" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
          <SelectItem value="1" className=" cursor-pointer">
            <img
              src={defaultStyle}
              className=" aspect-3/2 w-22 object-cover"
              data-desc
            />

            <span>Default</span>
          </SelectItem>
          <SelectItem value="2" className=" cursor-pointer">
            <img
              src={candyStyle}
              className=" aspect-3/2 max-w-22 object-cover"
              data-desc
            />

            <span>Candy</span>
          </SelectItem>
          <SelectItem value="3" className=" cursor-pointer">
            <img
              src={sandStyle}
              className=" aspect-3/2 w-22 object-cover"
              data-desc
            />

            <span>Sand</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
