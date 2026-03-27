import { createClient } from "contentful";
import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import React from "react";
import type { ReactNode } from "react";

type DefaultProps = {
  id?: string, 
  className?: string, 
  style?: React.CSSProperties
};

type SkillInfo = {
  id: string, 
  name: string, 
  iconElement: ReactNode, 
  level: number
};

/**
 * ISO 8601 形式の日時情報を10進数の数値に変換
 * 実例："2025-05-15T00:00:00Z" => `20250515`
 * @param date ISO8601の日時文字列（"YYYY-MM-DDThh:mm:ss"）
 * @returns YYYYMMDD という形の数値
 */
function parseDateToNumber(date: string){
  const normalizedDate: string = date.split(/* separator = */ "T")[0]
                                     .replace(
                                       /* pattern = */ /-/g, 
                                       /* replacement = */ ""
                                     );
  return Number.parseInt(/* string = */ normalizedDate, /* radix = */ 10);
}

/**
 * URLが安全かどうか判定する（XSS対策・セキュアな通信かどうか）
 * @param url 判定対象のURL
 * @returns URLが安全ならtrue
 */
function isSafeURL(url: string): boolean{
  try{
    const parsedURL = new URL(/* url = */ url, /* base = */ window.location.origin);
    return ["https:", "mailto"].includes(parsedURL.protocol);
  }catch{
    return false;
  }
}

// TopicLabel 用
type TopicType = "NEWS" | "EVENT" | "ARTICLE" | "PROJECT";

function isTopicType(value: string): value is TopicType{
  return ["NEWS", "EVENT", "ARTICLE", "PROJECT"].includes(value);
}

// Contentful関係
const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

if(!(SPACE_ID && ACCESS_TOKEN))throw new Error("Contentful variables are not set");

const client = createClient(/* params = */ {
  accessToken: ACCESS_TOKEN, 
  space: SPACE_ID
});

//  HOME ページ
interface Profile{
  date: EntryFieldTypes.Date;
  introduction: EntryFieldTypes.RichText;
  content: EntryFieldTypes.Symbol;
}

interface ProfileSkeleton extends EntrySkeletonType{
  contentTypeId: "profile";
  fields: Profile;
}

//   Topics欄
interface TopicItem{
  title: EntryFieldTypes.Symbol;
  date: EntryFieldTypes.Date;
  label: EntryFieldTypes.Symbol;
  content: EntryFieldTypes.RichText;
}

interface TopicItemSkeleton extends EntrySkeletonType{
  contentTypeId: "topicItem";
  fields: TopicItem;
}

//  WORKS ページ
interface Production{
  title: EntryFieldTypes.Symbol;
  link: EntryFieldTypes.Symbol;
  explanation: EntryFieldTypes.RichText;
  isTeamDevelopment: EntryFieldTypes.Boolean;
  date: EntryFieldTypes.Date;
}

interface ProductionSkeleton extends EntrySkeletonType{
  contentTypeId: "production";
  fields: Production;
}

//  SKILL ページ
interface Skill{
  name: EntryFieldTypes.Symbol;
  level: EntryFieldTypes.Integer;
  category: EntryFieldTypes.Symbol;
}

interface SkillSkeleton extends EntrySkeletonType{
  contentTypeId: "skill";
  fields: Skill;
}

interface Qualification{
  name: EntryFieldTypes.Symbol;
  date: EntryFieldTypes.Date;
}

interface QualificationSkeleton extends EntrySkeletonType{
  contentTypeId: "qualification";
  fields: Qualification;
}

export { client, isTopicType, parseDateToNumber, isSafeURL };
export type { DefaultProps, SkillInfo, TopicType, ProfileSkeleton, TopicItemSkeleton, ProductionSkeleton, SkillSkeleton, QualificationSkeleton };