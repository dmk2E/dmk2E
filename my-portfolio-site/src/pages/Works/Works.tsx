import "./Works.css";
import { useState, useEffect } from "react";
import WorksSection from "@/components/WorksSection/WorksSection";
// Contentful関係
import type { Entry } from "contentful";
import { client, parseDateToNumber } from "@/util";
import type { DefaultProps, ProductionSkeleton } from "@/util";

type WorksProps = DefaultProps & {

};

export default function Works( props: WorksProps ){
  const [myOwnProducts, setMyOwnProducts] = useState<Array<Entry<ProductionSkeleton, "WITHOUT_LINK_RESOLUTION", string>>>(/* initialState = */ []);
  const [otherProjects, setOtherProjects] = useState<Array<Entry<ProductionSkeleton, "WITHOUT_LINK_RESOLUTION", string>>>(/* initialState = */ []);

  useEffect(() =>{
      (async function getContentfulData(){
        try{
          const res = await client.getEntries<ProductionSkeleton>(/* query = */ {
            content_type: "production", 
            // 作成日の降順で取得
            order: ["-fields.date"]
          });
          const productions: Array<Entry<ProductionSkeleton, "WITHOUT_LINK_RESOLUTION", string>> = res.items;
          setMyOwnProducts(productions.filter(/* predicate = */ product => !product.fields.isTeamDevelopment)
                                      // 作成日の昇順に
                                      .sort(/* compareFn = */ (productA, productB) => {
                                        const numA = parseDateToNumber(productA.fields.date);
                                        const numB = parseDateToNumber(productB.fields.date);
                                        return numA - numB;
                                      }));
          setOtherProjects(productions.filter(/* predicate = */ product => product.fields.isTeamDevelopment));
        }catch(err){
          console.error("Fetching Contentful data error!");
        }
      })();
  }, []);
  if(myOwnProducts.length === 0 && otherProjects.length === 0)return <p>読み込み中...</p>
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