import "./Topics.css";
import type { DefaultProps } from "@/utils";
import clsx from "clsx"
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useState, useEffect } from "react";
// 自作コンポーネント群
import DropDownMenu from "@/components/DropDownMenu/DropDownMenu";
import TopicLabel from "@/components/TopicLabel/TopicLabel";
// Contentful関係
import type { Entry } from "contentful";
import { client, isSafeURL, parseDateToNumber, topicTypes } from "@/utils";
import type { TopicType, TopicItemSkeleton } from "@/utils";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

type TopicsProps = DefaultProps & {

};

export default function Topics( props: TopicsProps ){
  // Contentful からデータ抽出
  type TopicItems = Array<Entry<TopicItemSkeleton, "WITHOUT_LINK_RESOLUTION", string>>;
  const [rawTopics, setRawTopics] = useState<TopicItems>(/* initialValue = */ []);
  const [targetTopics, setTargetTopics] = useState<TopicItems>(/* initialState = */ []);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(/* effect =  */ () =>{
    (async function getContentfulData(){
      try{
        const res = await client.getEntries<TopicItemSkeleton>(/* query = */ {
          content_type: "topicItem", 
          order: ["-fields.date"]
        });
        setRawTopics(/* value = */ res.items);
      }catch(err){
        console.error("Fetching Contentful data error:", err);
      }finally{
        setIsLoading(false);
      }
    })();
  }, /* deps = */ []);

  // Topics 欄で表示する項目の操作機能
  //  ソート機能
  const DESC = "日付の新しい順" as const;
  const ASC = "日付の古い順" as const;
  const [sorting, setSorting] = useState<typeof DESC | typeof ASC>(/* initialState = */ DESC);

  //  フィルタ機能
  const NO_FILTER = "ALL" as const;
  type FilterType = (typeof NO_FILTER) | TopicType;
  const [currentFilter, setCurrentFilter] = useState<FilterType>(/* initialState = */ NO_FILTER);

  //  更新処理
  //   Contentful からデータが届いたタイミングで，ソート機能等が既にデフォルト値でない場合にも対応
  useEffect(/* effect = */ () =>{
    const sortedTopics: TopicItems = sorting === DESC ? 
                                  [...rawTopics] : 
                                  [...rawTopics].sort(
                                    (a, b) => parseDateToNumber(/* date = */ a.fields.date) - parseDateToNumber(/* date = */ b.fields.date)
                                  );
    setTargetTopics(/* value = */ currentFilter === NO_FILTER ? 
                                                sortedTopics : 
                                                sortedTopics.filter(topic => topic.fields.label === currentFilter
    ));
  }, /* deps = */ [rawTopics, sorting, currentFilter]);

  return (
    <fieldset className={clsx("topics", props.className)}>
      <legend>✨<span className="caption">Topics</span></legend>
      <div 
      className="topics-control-bar" 
      aria-label="topicitems-control-bar"
      >
        <DropDownMenu 
        initialItemId={0} 
        label="ソート" 
        setItemFunc={setSorting}
        options={[DESC, ASC]}
        />
        <DropDownMenu 
        initialItemId={0} 
        label="フィルタ" 
        setItemFunc={setCurrentFilter}
        options={[NO_FILTER, ...topicTypes]}
        />
      </div>
      <SimpleBar 
      style={{maxHeight: "30vh", width: "100%"}}
      >
        {isLoading ? "読み込み中..." : 
          <table>
            <tbody>
              {targetTopics.map(topic => (
                <tr key={topic.sys.id}>
                  <td>・</td>
                  <td>
                    {/* ContentfulのDate型から日時情報のみを抽出 */}
                    {topic.fields.date.split(/* separator = */ "T")[0]
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