import "./Awards.css";
import type { DefaultProps } from "@/util";

type AwardsProps = DefaultProps & {

};

export default function Awards( props: AwardsProps ){
  return (
    <div 
    id="awards_page" 
    className={props.className} 
    style={props.style}
    >
      {/* TODO: Figmaでデザインしてから実装する */}
    </div>
  );
}