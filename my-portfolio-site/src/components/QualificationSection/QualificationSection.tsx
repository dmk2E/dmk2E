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
  const { icon, sectionName, sectionNameColor, items } = props;

  return (
    <fieldset 
    id={props.id} 
    className={clsx("qualification-section", props.className)} 
    style={props.style}
    >
      <legend>
        {icon}
        <span 
        className="caption" 
        style={{
          "--outline": sectionNameColor
        } as React.CSSProperties}
        >
          {sectionName}
        </span>
      </legend>
      <ul>
        {items.map(item => <li key={item.sys.id}>{item.fields.name}</li>)}
      </ul>
    </fieldset>
  );
}