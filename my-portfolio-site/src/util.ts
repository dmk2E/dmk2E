import { createClient } from "contentful";
import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import React from "react";

type DefaultProps = {
  id?: string, 
  className?: string, 
  style?: React.CSSProperties
};

/**
 * ISO 8601 形式の日時情報を10進数の数値に変換
 * "2025-05-15T00:00:00Z" => 20250515
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

export { client, isTopicType, parseDateToNumber };
export type { DefaultProps, TopicType, ProfileSkeleton, TopicItemSkeleton, ProductionSkeleton };