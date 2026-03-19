import "./Works.css";
import type { DefaultProps } from "@/util";

type WorksProps = DefaultProps & {

};

export default function Works( props: WorksProps ){
  return (
    <div 
    id="works_page"
    className={props.className} 
    style={props.style}
    >
      {/* TODO: Figmaでデザインしてから実装を行う */}
    </div>
  );
}