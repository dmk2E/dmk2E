import "./Profile.css";
import type { DefaultProps } from "@/utils";
import clsx from "clsx";
import { 
  Avatar, 
  Box, 
  Link
} from "@mui/material";
// Contentful関係
import { client, isSafeURL } from "@/utils";
import type { ProfileSkeleton } from "@/utils";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { Options } from "@contentful/rich-text-react-renderer";
// TanstackQuery
import { useQuery } from "@tanstack/react-query";

type ProfileProps = DefaultProps & {
  iconImage: string
};

const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <span>{ children }</span>, 
    [INLINES.HYPERLINK]: (node, children) => isSafeURL(node.data.uri) ? 
                                                      <a 
                                                      href={node.data.uri} 
                                                      target="_blank" 
                                                      rel="noopener noreferrer"
                                                      >{children}</a> : 
                                                      <span>{children}</span>
  }, 
  renderText: (text: string) => {
    return text.split(/* separator = */ "。").flatMap((sentence, index, arr) => (
      index < arr.length - 1 ? [<span key={index} style={{display: "block", textAlign: "left"}}>{sentence}。</span>] : []
    ))
  }
};

export default function Profile( props: ProfileProps ){
  // Contentful からのデータ取得
  const { data: profileData, isLoading, isError } = useQuery(/* options = */ {
    queryKey: ["contentful", "profile"], 
    staleTime: Infinity, 
    gcTime: Infinity, 
    queryFn: async () =>{
      try{
        const res = await client.getEntries<ProfileSkeleton>(/* query = */ {
          content_type: "profile", 
        });
        return res.items;
      }catch(err){
        console.error("Fetching Contentful data error:", err);
        throw err;
      }
    }
  });

  return (
    <fieldset 
    className={clsx("profile", props.className)} 
    style={props.style}
    >
      <legend>🧑‍💻<span className="caption">Profile</span></legend>
      <Avatar 
      src={props.iconImage} 
      component={Link}
      href="https://github.com/dmk2E" 
      target="_blank" 
      rel="noopener noreferrer"
      sx={{ 
        width: "8em", 
        height: "8em", 
        margin: "1rem 2rem 1rem 2rem", 
        border: "2px dashed #000", 
        transition: "all 0.5s ease-in-out", 
        "&:hover": {
          transform: "scale(1.1)"
        }
      }} 
      />
      {
        isError ? "エラーが発生しました" : 
        <Box 
        sx={{
          margin: "0 1rem 1rem 1rem"
        }}
        >
          {isLoading || profileData === undefined || profileData.length === 0 ? "読み込み中" : documentToReactComponents(
            /* richTextDocument = */ profileData[0].fields.introduction, 
            /* options = */ richTextOptions
          )}
        </Box>
      }
    </fieldset>
  );
}