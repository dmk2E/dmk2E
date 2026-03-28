import "./Awards.css";
import type { DefaultProps } from "@/util";
import { useState, useEffect } from "react";
import Achievements from "@/components/Achievements/Achievements";
// Contentful 関係
import type { Entry } from "contentful";
import { client } from "@/util";
import type { AchievementSkeleton } from "@/util";

type AwardsProps = DefaultProps & {

};

export default function Awards( props: AwardsProps ){
  // Contentful からデータの抽出
  const [achievements, setAchievements] = useState<Array<Entry<AchievementSkeleton, "WITHOUT_LINK_RESOLUTION", string>>>(/* initialState = */ []);
  useEffect(() =>{
    (async function getContentfulData(){
      try{
        const res = await client.getEntries<AchievementSkeleton>({
          content_type: "achievement", 
          order: ["-fields.date"]
        });
        setAchievements(/* value = */ res.items);
      }catch(err){
        console.error("Fetching Contentful data error!");
      }
    })();
  }, []);
  
  return (
    <div 
    id="awards_page" 
    className={props.className} 
    style={props.style}
    >
      <Achievements items={achievements} />
    </div>
  );
}