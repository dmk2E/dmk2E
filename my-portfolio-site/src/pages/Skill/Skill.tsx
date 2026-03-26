import "./Skill.css";
import type { DefaultProps } from "@/util";

type SkillProps = DefaultProps & {

};

export default function Skill( props: SkillProps ){
  return (
    <div 
    id="skill_page" 
    className={props.className} 
    style={props.style}
    >
      {/* TODO: Skill ページの実装を行う */}
    </div>
  );
}