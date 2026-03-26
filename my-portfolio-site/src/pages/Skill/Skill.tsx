import "./Skill.css";
import type { DefaultProps } from "@/util";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
// Contentful関係
import type { Entry } from "contentful";
import { client } from "@/util";
import type { SkillSkeleton, QualificationSkeleton } from "@/util";

type SkillProps = DefaultProps & {

};

type SkillInfo = {
  id: string, 
  name: string, 
  iconElement: ReactNode, 
  level: number
};

/**
 * Contentful から取得した "Skill" のデータをカテゴリごとに分類する
 * @param skills "skill" の Content Type ID を持つ Contentful のデータの配列
 * @param category カテゴリ名（"language" | "lib-platform" | "database" | "framework" | "devops-tool"）
 * @returns SkillInfo 型の配列
 */
function extractByCategory(skills: Array<Entry<SkillSkeleton, "WITHOUT_LINK_RESOLUTION", string>>, category: string): Array<SkillInfo>{
  const filteredSkills = skills.filter(skill => skill.fields.category === category);
  return filteredSkills.map(skill => {
    return {
      id: skill.sys.id, 
      name: skill.fields.name, 
      iconElement: <img />, 
      level: skill.fields.level
    };
  });
}

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
          order: ["-sys.createdAt"]
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
  const [qualificationItems, setQualificationItems] = useState<Array<Entry<QualificationSkeleton>>>(/* initialState = */ []);
  useEffect(/* effect =  */ () =>{
    (async function getContentfulData(){
      try{
        const res = await client.getEntries<QualificationSkeleton>(/* query = */ {
          content_type: "qualification", 
          order: ["-fields.date"]
        });
        setQualificationItems(res.items);
      }catch(err){
        console.error("Fetching Contentful data Error!");
      }
    })();
  }, /* deps = */ []);
  console.log(langSkillItems);
  console.log(libPlatformSkillItems);
  console.log(dbSkillItems);
  console.log(frameworkSkillItems);
  console.log(devOpsToolSkillItems);
  console.log(qualificationItems);
  return (
    <div 
    id="skill_page" 
    className={props.className} 
    style={props.style}
    >
    </div>
  );
}