import "./Achievements.css";
import { isSafeURL, type DefaultProps } from "@/utils";
import clsx from "clsx";
import React from "react";
// Contentful関係
import type { Entry } from "contentful";
import type { AchievementSkeleton } from "@/utils";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

type AchievementsProps = DefaultProps & {
  items: Array<Entry<AchievementSkeleton, "WITHOUT_LINK_RESOLUTION", string>>
};

/**
 * "emphasis" クラスを付加する関数．
 * （クリック時に，details タグの summaryタグの文字列を太字にする）
 * @param evt イベントオブジェクト
 */
function handleSummaryToggle(evt: React.SyntheticEvent<HTMLElement>): void{
  evt.stopPropagation();
  evt.currentTarget.classList.toggle("emphasis");
}

export default function Achievements( props: AchievementsProps ){
  return (
    <fieldset 
    className={clsx("achievements", props.className)} 
    style={props.style} 
    >
      <legend>🥇<span className="caption">Achievements</span></legend>
      {props.items.map(item =>
        <details 
        key={item.sys.id} 
        onToggle={handleSummaryToggle}
        >
          <summary>
            {documentToReactComponents(
              /* richTextDocument = */ item.fields.heading, 
              /* options = */ {
                renderNode: {
                  [BLOCKS.PARAGRAPH]: (_, children) => <span>{children}</span>, 
                  [INLINES.HYPERLINK]: (node, children) => isSafeURL(node.data.uri) ? 
                                                            <a 
                                                            href={node.data.uri} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            >{children}</a>         :
                                                            <span>{children}</span>
                }
              }
            )}
          </summary>
          {documentToReactComponents(
            /* richTextDocument = */ item.fields.content, 
            /* options = */ {
              renderNode: {
                [INLINES.HYPERLINK]: (node, children) => isSafeURL(node.data.uri) ? 
                                                            <a 
                                                            href={node.data.uri} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            >{children}</a>         :
                                                            <span>{children}</span>
              }
            }
          )}
        </details>
      )}
    </fieldset>
  );
}