import "./Awards.css";
import type { DefaultProps } from "@/utils";
import { Helmet } from "react-helmet-async";
// 自作コンポーネント系
import Achievements from "@/components/Achievements/Achievements";
// Contentful 関係
import { client } from "@/utils";
import type { AchievementSkeleton } from "@/utils";
// TanStack Query
import { useQuery } from "@tanstack/react-query";

type AwardsProps = DefaultProps & {

};

export default function Awards( props: AwardsProps ){
  // Contentful からデータの抽出
  const { data: achievements, isLoading, isError } = useQuery(/* options = */ {
    queryKey: ["contentful", "awards"], 
    queryFn: async () =>{
      try{
        const res = await client.getEntries<AchievementSkeleton>({
          content_type: "achievement", 
          order: ["-fields.date"]
        });
        return res.items;
      }catch(err){
        console.error("Fetching Contentful data error:", err);
        throw err;
      }
    }
  });

  if(isLoading)return <p>読み込み中...</p>;
  if(isError)return <p>エラーが発生しました</p>;

  const BASE_URL = window.location.origin;
  
  return (
    <div 
    id="awards_page" 
    className={props.className} 
    style={props.style}
    >
      <Helmet>
        <title>AWARDS | dmk2E - My Portfolio</title>

        <link rel="canonical" href={`${BASE_URL}/awards`} />

        <meta name="description" content="受賞歴など" />
      </Helmet>

      <Achievements items={achievements ?? []} />
    </div>
  );
}