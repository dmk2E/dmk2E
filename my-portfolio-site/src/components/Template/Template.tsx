import "./Template.css";
import type { DefaultProps } from "@/util";
import clsx from "clsx";

type TemplateProps = DefaultProps & {

};

export default function Template( props: TemplateProps ){
  return (
    <div className={clsx("template", props.className)}>

    </div>
  );
}