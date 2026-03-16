import "./Profile.css";
import type { DefaultProps } from "@/util";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { 
  Avatar, 
  Box
} from "@mui/material";
// Contentful関係
import { client } from "@/util";
import type { ProfileSkeleton } from "@/util";
import type { Entry } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import type { Options } from "@contentful/rich-text-react-renderer";

type ProfileProps = DefaultProps & {
  iconImage: string
};

const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <span>{ children }</span>, 
  }, 
  renderText: (text: string) => {
    return text.split(/* separator = */ "。").flatMap((sentence, index, arr) => (
      index < arr.length - 1 ? [<span key={index} style={{display: "block", textAlign: "left"}}>{sentence}。</span>] : []
    ))
  }
};

export default function Profile( props: ProfileProps ){
  const [profileData, setProfileData] = useState<Array<Entry<ProfileSkeleton, "WITHOUT_LINK_RESOLUTION", string>>>(/* initialState = */ []);

  const [isLoading, setIsLoading] = useState<boolean>(/* initialState = */ true);

  useEffect(() =>{
    (async function (){
      try{
        const res = await client.getEntries<ProfileSkeleton>(/* query = */ {
          content_type: "profile", 
        });
        setProfileData(/* value = */ res.items);
      }catch(err){
        console.error("Fetching Contentful datas Error!");
      }finally{
        setIsLoading(/* value = */ false);
      }
    })();
  }, []);
  return (
    <fieldset className={clsx("profile", props.className)}>
      <legend>&#129489;&#8205;&#128187;&#65039;<span className="caption">Profile</span></legend>
      <Avatar 
      src={props.iconImage} 
      sx={{ 
        width: "8em", 
        height: "8em", 
        margin: "1rem 2rem 1rem 2rem", 
        border: "2px dashed #000"
      }} 
      />
      <Box 
      sx={{
        margin: "0 1rem 1rem 1rem"
      }}
      >
        {isLoading ? "読み込み中" : documentToReactComponents(
          /* richTextDocument = */ profileData[0].fields.introduction, 
          /* options = */ richTextOptions
        )}
      </Box>
    </fieldset>
  );
}