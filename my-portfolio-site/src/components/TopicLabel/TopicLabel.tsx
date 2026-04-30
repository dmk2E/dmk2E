import "./TopicLabel.css";
import type { DefaultProps } from "@/utils";
import clsx from "clsx";
import { ensureTopicType } from "@/utils";
import type { TopicType } from "@/utils";

type TopicLabelProps = DefaultProps & {
  type: string
};

const typeToColor: Record<TopicType, string> = {
  NEWS: "#a5d7f6", 
  EVENT: "#fbc09c", 
  ARTICLE: "#95e28a", 
  PROJECT: "#eab4ff", 
  OTHER: "#aaa"
};

export default function TopicLabel( props: TopicLabelProps ){
  const type: TopicType = ensureTopicType(/* value = */ props.type);

  return (
    <span 
    className={clsx("topic-label", props.className)} 
    style={{...props.style, backgroundColor: typeToColor[type]}}
    >
      {type}
    </span>
  );
}