import "./Template.css";
import type { DefaultProps } from "@/utils";
import clsx from "clsx";

type TemplateProps = DefaultProps & {

};

export default function Template( props: TemplateProps ){
  return (
    <div 
    id={props.id} 
    className={clsx("template", props.className)} 
    style={props.style}
    >

    </div>
  );
}