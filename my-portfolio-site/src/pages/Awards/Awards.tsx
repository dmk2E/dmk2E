import "./Awards.css";
import type { DefaultProps } from "@/utils";
import Achievements from "@/components/Achievements/Achievements";
// Contentful 関係
import { client } from "@/utils";
import type { AchievementSkeleton } from "@/utils";
// TanstackQuery
import { useQuery } from "@tanstack/react-query";

type AwardsProps = DefaultProps & {

};

export default function Awards( props: AwardsProps ){
  // Contentful からデータの抽出
  const { data: achievements, isLoading, isError } = useQuery(/* options = */ {
    queryKey: ["contentful", "awards"], 
    staleTime: Infinity, 
    gcTime: Infinity, 
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
  
  return (
    <div 
    id="awards_page" 
    className={props.className} 
    style={props.style}
    >
      <Achievements items={achievements ?? []} />
    </div>
  );
}