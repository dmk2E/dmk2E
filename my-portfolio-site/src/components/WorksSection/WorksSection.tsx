import "./WorksSection.css";
import { isSafeURL } from "@/utils";
import type { DefaultProps, ProductionSkeleton } from "@/utils";
import clsx from "clsx";
import React from "react";
// Contentful関係
import type { Entry } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";


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
            {
              isSafeURL(/* url = */ work.fields.link) ? 
                            <a 
                            href={work.fields.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            >
                              {work.fields.title}</a> : 
                            <span>{work.fields.title}</span>
            }
            {documentToReactComponents(
              /* richTextDocument = */ work.fields.explanation, 
              /* options = */ {
                renderNode: {
                  [BLOCKS.PARAGRAPH]: (_, children) => <ul><li>{children}</li></ul>, 
                  [INLINES.HYPERLINK]: (node, children) => isSafeURL(/* url = */ node.data.uri)     ? 
                    <a href={node.data.uri} target="_blank" rel="noopener noreferrer">{children}</a>: 
                    <span>{children}</span>
                }
              }
            )}
          </li>)}
      </ul>
    </fieldset>
  );
}