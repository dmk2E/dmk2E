import "./Skill.css";
import type { DefaultProps } from "@/utils";
import { useMemo } from "react";
import { extractByCategory } from "./Skill.utils";
// 自作コンポーネント
import SkillSection from "@/components/SkillSection/SkillSection";
import QualificationSection from "@/components/QualificationSection/QualificationSection";
// アイコン関係
import languageIcon from "@/assets/file-code.svg";
import libPlatformIcon from "@/assets/stack.svg";
import databaseIcon from "@/assets/database-fill.svg";
import frameworkIcon from "@/assets/diagram-3.svg";
import devOpsToolIcon from "@/assets/tools.svg";
import qualificationIcon from "@/assets/award.svg";
// Contentful関係
import { client } from "@/utils";
import type { SkillSkeleton, QualificationSkeleton } from "@/utils";
// TanStack Query
import { useQuery } from "@tanstack/react-query";

type SkillProps = DefaultProps & {

};

export default function Skill( props: SkillProps ){
  const {data: rawSkillData, isLoading, isError} = useQuery(/* options = */ {
    queryKey: ["contentful", "skill"], 
    queryFn: async () =>{
      try{
        const [resSkillItems, resQualificationItems] = await Promise.allSettled(/* values = */ [
          client.getEntries<SkillSkeleton>(/* query = */ {content_type: "skill", order: ["sys.createdAt"]}), 
          client.getEntries<QualificationSkeleton>(/* query = */ {content_type: "qualification", order: ["fields.date"]})
        ]);
        return {
          skillItems: resSkillItems.status === "fulfilled" ? resSkillItems.value.items : null, 
          qualificationItems: resQualificationItems.status === "fulfilled" ? resQualificationItems.value.items : null
        };
      }catch(err){
        console.error("Fetching Contentful data error:", err);
        throw err;
      }
    }
  });

  // カテゴリごとに，各技術スタックの情報を保持
  //  Qualification 
  const qualificationItems = rawSkillData?.qualificationItems ?? [];

  //  Qualification 以外の5カテゴリー
  const langSkillItems = useMemo(/* factory = */ () =>{
    return extractByCategory(/* skills = */ rawSkillData?.skillItems ?? [], /* category = */ "language");
  }, /* deps = */ [rawSkillData]);

  const libPlatformSkillItems = useMemo(/* factory = */ () =>{
    return extractByCategory(/* skills = */ rawSkillData?.skillItems ?? [], /* category = */ "lib-platform");
  }, /* deps = */ [rawSkillData]);

  const dbSkillItems = useMemo(/* factory = */ () =>{
    return extractByCategory(/* skills = */ rawSkillData?.skillItems ?? [], /* category = */ "database");
  }, /* deps = */ [rawSkillData]);

  const frameworkSkillItems = useMemo(/* factory = */ () =>{
    return extractByCategory(/* skills = */ rawSkillData?.skillItems ?? [], /* category = */ "framework");
  }, /* deps = */ [rawSkillData]);

  const devOpsToolSkillItems = useMemo(/* factory = */ () =>{
    return extractByCategory(/* skills = */ rawSkillData?.skillItems ?? [], /* category = */ "devops-tool");
  }, /* deps = */ [rawSkillData]);

  if(isLoading)return <p>読み込み中...</p>;
  if(isError)return <p>エラーが発生しました</p>;

  return (
    <div 
    id="skill_page" 
    className={props.className} 
    style={props.style}
    >
      <SkillSection 
      icon={
      <img 
      src={languageIcon} 
      style={{transform: "scale(1.3)"}} 
      alt="file code icon"
      />} 
      sectionName="Language" 
      sectionNameColor="#b3e5fc"
      skills={langSkillItems}
      />
      <SkillSection 
      icon={
      <img 
      src={libPlatformIcon} 
      style={{transform: "scale(1.3)"}} 
      alt="stack icon"
      />} 
      sectionName="Library / Platform" 
      sectionNameColor="#c8e6c9"
      skills={libPlatformSkillItems}
      />
      <SkillSection 
      icon={
      <img 
      src={databaseIcon} 
      style={{transform: "scale(1.3)"}} 
      alt="database icon"
      />} 
      sectionName="Database" 
      sectionNameColor="#ffe0b2"
      skills={dbSkillItems}
      />
      <SkillSection 
      icon={
      <img 
      src={frameworkIcon} 
      style={{transform: "scale(1.3)"}} 
      alt="diagram-3 icon"
      />} 
      sectionName="Framework" 
      sectionNameColor="#e1bee7"
      skills={frameworkSkillItems}
      />
      <SkillSection 
      icon={
      <img 
      src={devOpsToolIcon} 
      style={{transform: "scale(1.3)"}} 
      alt="tool icon"
      />} 
      sectionName="DevOps / Tool" 
      sectionNameColor="#d1d5db"
      skills={devOpsToolSkillItems}
      />
      <QualificationSection 
      icon={
      <img 
      src={qualificationIcon} 
      style={{transform: "scale(1.3)"}} 
      alt="award icon"
      />} 
      sectionName="Qualification" 
      sectionNameColor="#fff9c4"
      items={qualificationItems}
      />
    </div>
  );
}