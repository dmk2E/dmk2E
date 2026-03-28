import "./Topics.css";
import type { DefaultProps } from "@/utils";
import clsx from "clsx"
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useState, useEffect } from "react";
import TopicLabel from "@/components/TopicLabel/TopicLabel";
// Contentful関係
import type { Entry } from "contentful";
import { client, isSafeURL } from "@/utils";
import type { TopicItemSkeleton } from "@/utils";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

type TopicsProps = DefaultProps & {

};

export default function Topics( props: TopicsProps ){
  // Contentful からデータ抽出
  const [topics, setTopics] = useState<Array<Entry<TopicItemSkeleton, "WITHOUT_LINK_RESOLUTION", string>>>(/* initialState = */ []);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(/* effect =  */ () =>{
    (async function getContentfulData(){
      try{
        const res = await client.getEntries<TopicItemSkeleton>(/* query = */ {
          content_type: "topicItem", 
          order: ["-fields.date"]
        });
        setTopics(/* value = */ res.items);
      }catch(err){
        console.error("Fetching Contentful data error:", err);
      }finally{
        setIsLoading(false);
      }
    })();
  }, /* deps = */ []);

  return (
    <fieldset className={clsx("topics", props.className)}>
      <legend>✨<span className="caption">Topic</span></legend>
      <SimpleBar 
      style={{maxHeight: "30vh", width: "100%"}}
      >
        {isLoading ? "読み込み中..." : 
          <table>
            <tbody>
              {topics.map(topic => (
                <tr key={topic.sys.id}>
                  <td>・</td>
                  <td>
                    {/* ContentfulのDate型から日時情報のみを抽出 */}
                    {topic.fields.date.split(/* separator = */"T")[0]
                                      .replace(
                                        /* pattern = */ /-/g, 
                                        /* replacement = */ "."
                                      )
                    }
                  </td>
                  <td>
                    <TopicLabel type={topic.fields.label}/>
                  </td>
                  <td className="content">
                    {documentToReactComponents(
                      /* richTextDocument = */ topic.fields.content, 
                      /* options = */ {
                        renderNode: {
                          [BLOCKS.PARAGRAPH]: (_, children) => <span>{children}</span>, 
                          [INLINES.HYPERLINK]: (node, children) => (
                          isSafeURL(/* url = */ node.data.uri) ? 
                                              <a 
                                              href={node.data.uri}
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              >
                                                {children}</a> : 
                                              <span>{children}</span>
                          )
                        }
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </SimpleBar>
    </fieldset>
  );
}