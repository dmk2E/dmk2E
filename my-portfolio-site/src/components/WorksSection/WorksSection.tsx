import "./WorksSection.css";
import type { DefaultProps } from "@/util";
import clsx from "clsx";
import React from "react";
// Contentful関係
import type { ProductionSkeleton } from "@/util";
import type { Entry } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";


type WorksSectionProps = DefaultProps & {
  icon?: string, 
  sectionName: string, 
  sectionNameColor: string, 
  heading: string, 
  works: Array<Entry<ProductionSkeleton, "WITHOUT_LINK_RESOLUTION", string>>
};

export default function WorksSection( props: WorksSectionProps ){
  return (
    <fieldset 
    className={clsx("works-section", props.className)} 
    style={props.style}
    >
      <legend>
        {props.icon}
        <span 
        className="caption"
        style={{
          "--outline": props.sectionNameColor
        } as React.CSSProperties } 
        >{props.sectionName}</span>
      </legend>
      <p>{props.heading}</p>
      <ul>
        {props.works.map(work => 
          <li 
          key={work.sys.id} 
          >
            <a href={work.fields.link}>{work.fields.title}</a>
            {documentToReactComponents(
              /* richTextDocument = */ work.fields.explanation, 
              /* options = */ {
                renderNode: {
                  [BLOCKS.PARAGRAPH]: (_, children) => <ul><li>{children}</li></ul>
                }
              }
            )}
          </li>)}
      </ul>
    </fieldset>
  );
}