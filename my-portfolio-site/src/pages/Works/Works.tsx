import "./Works.css";
import { useMemo } from "react";
import WorksSection from "@/components/WorksSection/WorksSection";
// Contentful関係
import { client, parseDateToNumber } from "@/utils";
import type { DefaultProps, ProductionSkeleton } from "@/utils";
// TanstackQuery
import { useQuery } from "@tanstack/react-query";

type WorksProps = DefaultProps & {

};

export default function Works( props: WorksProps ){
  // Contentful からのデータ取得
  const { data: rawProjectData, isLoading, isError } = useQuery(/* options = */{
    queryKey: ["contentful", "works"], 
    staleTime: Infinity, 
    gcTime: Infinity, 
    queryFn: async () =>{
        try{
          const res = await client.getEntries<ProductionSkeleton>(/* query = */ {
            content_type: "production", 
            // 作成日の降順で取得
            order: ["-fields.date"]
          });
          return res.items;
        }catch(err){
          console.error("Fetching Contentful data error:", err);
          throw err;
        }
    }
  });

  const myOwnProducts = useMemo(/* factory = */ () =>{
    return (rawProjectData ?? []).filter(/* predicate = */ product => !product.fields.isTeamDevelopment)
                                 // 作成日の昇順に
                                 .sort(/* compareFn = */ (productA, productB) => {
                                   const numA = parseDateToNumber(/* date = */ productA.fields.date);
                                   const numB = parseDateToNumber(/* date = */ productB.fields.date);
                                   return numA - numB;
    });
  }, /* deps = */ [rawProjectData]);

  const otherProjects = useMemo(/* factory = */ () =>{
    return (rawProjectData ?? []).filter(/* predicate = */ product => product.fields.isTeamDevelopment);
  }, /* deps = */ [rawProjectData]);

  if(isLoading)return <p>読み込み中...</p>;
  if(isError)return <p>エラーが発生しました</p>;

  return (
    <div 
    id="works_page"
    className={props.className} 
    style={props.style}
    >
      <WorksSection
      icon="🛠"  
      sectionName="My Own Project" 
      sectionNameColor="#3ee988"  
      heading="公開しているリポジトリ・制作物まとめ。" 
      works={myOwnProducts}
      />
      <WorksSection 
      icon="🤝" 
      sectionName="Contribution to Other Projects" 
      sectionNameColor="#e1b578"  
      heading="参加したプロジェクトの開発物まとめ。" 
      works={otherProjects}
      />
    </div>
  );
}