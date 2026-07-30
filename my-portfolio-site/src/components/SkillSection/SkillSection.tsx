import "./SkillSection.css";
import type { DefaultProps, SkillInfo } from "@/utils";
import clsx from "clsx";
import type React from "react";
import type { ReactNode } from "react";
import { renderTables } from "./SkillSection.utils";
// MUI
import {
  Box
} from "@mui/material";

const MAX_TABLE_ROW = 5;

type SkillSectionProps = DefaultProps & { 
  icon: ReactNode, 
  sectionName: string, 
  sectionNameColor: string, 
  skills: Array<SkillInfo>
};

export default function SkillSection( props: SkillSectionProps ){
  const { icon, sectionName, sectionNameColor, skills } = props;

  return (
    <fieldset 
    id={props.id} 
    className={clsx("skill-section", props.className)} 
    style={props.style}
    >
      <legend>
        {icon}
        <span 
        className="caption" 
        style={{
          "--outline": sectionNameColor
        } as React.CSSProperties}
        >
          {sectionName}
        </span>
      </legend>
      <Box 
      sx={{
        height: "13rem", 
        display: {
          xs: "none", 
          sm: "flex"
        }, 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "flex-start"
      }}
      >
        {renderTables(
          /* skills = */ skills, 
          /* maxTableRow = */ MAX_TABLE_ROW
        )}
      </Box>
      <Box 
      sx={{
        display: {
          xs: "flex", 
          sm: "none"
        }, 
        height: "auto", 
        flexDirection: "column", 
        justifyContent: "flex-start", 
        alignItems: "center"
      }}
      >
        {renderTables(/* skills = */ skills)}
      </Box>
    </fieldset>
  );
}