import "./QualificationSection.css";
import type { DefaultProps } from "@/utils";
import type { ReactNode } from "react";
import clsx from "clsx";
// Contentful関係
import type { Entry } from "contentful";
import type { QualificationSkeleton } from "@/utils";

type QualificationSectionProps = DefaultProps & {
  icon: ReactNode, 
  sectionName: string, 
  sectionNameColor: string, 
  items: Array<Entry<QualificationSkeleton, "WITHOUT_LINK_RESOLUTION", string>>
};

export default function QualificationSection( props: QualificationSectionProps ){
  return (
    <fieldset 
    className={clsx("qualification-section", props.className)} 
    style={props.style}
    >
      <legend>
        {props.icon}
        <span 
        className="caption" 
        style={{
          "--outline": props.sectionNameColor
        } as React.CSSProperties}
        >
          {props.sectionName}
        </span>
      </legend>
      <ul>
        {props.items.map(item => <li key={item.sys.id}>{item.fields.name}</li>)}
      </ul>
    </fieldset>
  );
}