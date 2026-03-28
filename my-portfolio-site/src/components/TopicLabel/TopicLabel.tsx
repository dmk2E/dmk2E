import "./TopicLabel.css";
import type { DefaultProps } from "@/utils";
import clsx from "clsx";
import { isTopicType } from "@/utils";
import type { TopicType } from "@/utils";

type TopicLabelProps = DefaultProps & {
  type: string
};

const typeToColor: Record<TopicType | "OTHER", string> = {
  NEWS: "#b4e2ff", 
  EVENT: "#ffd1b4", 
  ARTICLE: "#bdffb4", 
  PROJECT: "#eab4ff", 
  OTHER: "#aaa"
};

export default function TopicLabel( props: TopicLabelProps ){
  const type: TopicType | "OTHER" = isTopicType(props.type) ? props.type : "OTHER";

  return (
    <span 
    className={clsx("topic-label", props.className)} 
    style={{...props.style, backgroundColor: typeToColor[type]}}
    >
      {type}
    </span>
  );
}