import "./Skill.css";
import type { DefaultProps } from "@/util";
import { useState, useEffect } from "react";
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
import type { Entry } from "contentful";
import { client } from "@/util";
import type { SkillInfo, SkillSkeleton, QualificationSkeleton } from "@/util";

type SkillProps = DefaultProps & {

};

export default function Skill( props: SkillProps ){
  // カテゴリごとに，各技術スタックの情報を保持
  //  Qualification 以外の5カテゴリー
  const [langSkillItems, setLangSkillItems] = useState<Array<SkillInfo>>(/* initialState = */ [])
  const [libPlatformSkillItems, setLibPlatformSkillItems] = useState<Array<SkillInfo>>(/* initialState = */ []);
  const [dbSkillItems, setDbSkillItems] = useState<Array<SkillInfo>>(/* initialState = */ []);
  const [frameworkSkillItems, setFrameworkSkillItems] = useState<Array<SkillInfo>>(/* initialState = */ []);
  const [devOpsToolSkillItems, setDevOpsToolSkillItems] = useState<Array<SkillInfo>>(/* initialState = */ []);
  useEffect(/* effect =  */ () =>{
    (async function getContentfulData(){
      try{
        const res = await client.getEntries<SkillSkeleton>(/* query = */ {
          content_type: "skill", 
          order: ["sys.createdAt"]
        });
        // 取得したContentfulデータをカテゴリごとに分類
        const skillInfo: Array<Entry<SkillSkeleton, "WITHOUT_LINK_RESOLUTION", string>> = res.items;
        setLangSkillItems(extractByCategory(/* skills = */ skillInfo, /* category = */ "language"));
        setLibPlatformSkillItems(extractByCategory(/* skills = */ skillInfo, /* category = */ "lib-platform"));
        setDbSkillItems(extractByCategory(/* skills = */ skillInfo, /* category = */ "database"));
        setFrameworkSkillItems(extractByCategory(/* skills = */ skillInfo, /* category = */ "framework"));
        setDevOpsToolSkillItems(extractByCategory(/* skills = */ skillInfo, /* category = */ "devops-tool"));
      }catch(err){
        console.error("Fetching Contentful data Error!");
      }
    })();
  }, /* deps = */ []);

  //  Qualification カテゴリー
  const [qualificationItems, setQualificationItems] = useState<Array<Entry<QualificationSkeleton, "WITHOUT_LINK_RESOLUTION", string>>>(/* initialState = */ []);
  useEffect(/* effect =  */ () =>{
    (async function getContentfulData(){
      try{
        const res = await client.getEntries<QualificationSkeleton>(/* query = */ {
          content_type: "qualification", 
          order: ["fields.date"]
        });
        setQualificationItems(res.items);
      }catch(err){
        console.error("Fetching Contentful data Error!");
      }
    })();
  }, /* deps = */ []);
  
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
      sectionName="DevOPS / Tool" 
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