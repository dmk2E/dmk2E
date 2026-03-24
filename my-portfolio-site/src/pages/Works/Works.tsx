import "./Works.css";
import { useState, useEffect } from "react";
// Contentful関係
import type { Entry } from "contentful";
import { client } from "@/util";
import type { DefaultProps, ProductionSkeleton } from "@/util";

type WorksProps = DefaultProps & {

};

export default function Works( props: WorksProps ){
  const [productions, setProductions] = useState<Array<Entry<ProductionSkeleton, "WITHOUT_LINK_RESOLUTION", string>>>(/* initialState = */ []);
  const [myOwnProducts, setMyOwnProducts] = useState<Array<Entry<ProductionSkeleton, "WITHOUT_LINK_RESOLUTION", string>>>(/* initialState = */ []);
  const [otherProjects, setOtherProjects] = useState<Array<Entry<ProductionSkeleton, "WITHOUT_LINK_RESOLUTION", string>>>(/* initialState = */ []);

  useEffect(() =>{
    try{
      (async function getContentfulData(){
        const res = await client.getEntries<ProductionSkeleton>(/* query = */ {
          content_type: "production", 
          order: ["-fields.date"]
        });
        setProductions(res.items);
      })();
    }catch(err){
      console.error("Fetching Contentful datas error!");
    }finally{
      setMyOwnProducts(productions.filter(/* predicate = */ product => !product.fields.isTeamDevlopment));
      setOtherProjects(productions.filter(/* predicate = */ product => product.fields.isTeamDevlopment));
    }
  }, []);
  
  return (
    <div 
    id="works_page"
    className={props.className} 
    style={props.style}
    >
      {/* TODO: Figmaでデザインしてから実装を行う */}
      🛠🤝
    </div>
  );
}