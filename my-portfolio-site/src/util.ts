import { createClient } from "contentful";
import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import React from "react";

type DefaultProps = {
  id?: string, 
  className?: string, 
  style?: React.CSSProperties
};

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

//  Topics欄
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

export { client, isTopicType };
export type { DefaultProps, TopicType, ProfileSkeleton, TopicItemSkeleton };