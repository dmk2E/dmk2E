import { createClient } from "contentful";
import type { EntryFieldTypes, EntrySkeletonType } from "contentful";

type DefaultProps = {
  id?: string, 
  className?: string, 
  key?: string
};

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

export { client };
export type { DefaultProps, ProfileSkeleton };