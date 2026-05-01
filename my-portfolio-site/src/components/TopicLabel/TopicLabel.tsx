import "./TopicLabel.css";
import type { DefaultProps } from "@/utils";
import clsx from "clsx";
import { ensureTopicType } from "@/utils";
import type { TopicType } from "@/utils";

type TopicLabelProps = DefaultProps & {
  type: string
};

const typeToColor: Record<TopicType, string> = {
  NEWS: "#107bc3", 
  EVENT: "#c95107", 
  ARTICLE: "#148702", 
  PROJECT: "#ae43d8", 
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