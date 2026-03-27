import type { ReactNode } from "react";
import type { SkillSkeleton, SkillInfo } from "@/util";
import type { Entry } from "contentful";
import contentfulLogo from "@/assets/contentful_c_logo_white.svg";

type SkillMetadata = {
  displayName: string, 
  icon: ReactNode
};

const ALL_SKILLS = [
  "cpp", "c", "cs", "py", "java", "htmlcss", "jsts", "rb", "go",
  "opencv", "unity", "contentful",
  "mysql", "mongodb",
  "react", "nodejs", "express", "rails", "fastapi",
  "bash", "docker", "git"
] as const;

type MySkills = (typeof ALL_SKILLS)[number];

const skillToMetadata: Record<MySkills | "other", SkillMetadata> = {
  // language
  cpp: {
    displayName: "C++",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=cpp" alt="cpp" />
  },
  c: {
    displayName: "C",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=c" alt="c" />
  },
  cs: {
    displayName: "C#",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=cs" alt="csharp" />
  },
  py: {
    displayName: "Python",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=py&theme=light" alt="python" />
  },
  java: {
    displayName: "Java",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=java&theme=light" alt="java" />
  },
  htmlcss: {
    displayName: "HTML / CSS",
    icon: (
      <span className="multi-images">
        <img src="https://skillicons.dev/icons?i=html" alt="html" />
        <img src="https://skillicons.dev/icons?i=css" alt="css" />
      </span>
    )
  },
  jsts: {
    displayName: "JavaScript(TS)",
    icon: (
      <span className="multi-images">
        <img src="https://skillicons.dev/icons?i=js" alt="javascript" />
        <img src="https://skillicons.dev/icons?i=ts" alt="typescript" />
      </span>
    )
  },
  rb: {
    displayName: "Ruby",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=ruby" alt="ruby" />
  },
  go: {
    displayName: "Go",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=go" alt="go" />
  },

  // lib-platform
  opencv: {
    displayName: "OpenCV",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=opencv&theme=light" alt="opencv" />
  },
  unity: {
    displayName: "Unity",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=unity&theme=light" alt="unity" />
  },
  contentful: {
    displayName: "Contentful",
    icon: <img className="icon" src={contentfulLogo} alt="contentful" />
  },

  // database
  mysql: {
    displayName: "MySQL",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=mysql" alt="mysql" />
  },
  mongodb: {
    displayName: "MongoDB",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=mongodb" alt="mongodb" />
  },

  // framework
  react: {
    displayName: "React",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=react" alt="react" />
  },
  nodejs: {
    displayName: "Node.js",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=nodejs" alt="nodejs" />
  },
  express: {
    displayName: "Express",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=express&theme=light" alt="express" />
  },
  rails: {
    displayName: "Rails",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=rails" alt="rails" />
  },
  fastapi: {
    displayName: "FastAPI",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=fastapi" alt="fastapi" />
  },

  // devops-tool
  bash: {
    displayName: "Bash",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=bash" alt="bash" />
  },
  docker: {
    displayName: "Docker",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=docker" alt="docker" />
  },
  git: {
    displayName: "Git",
    icon: <img className="icon" src="https://skillicons.dev/icons?i=git" alt="git" />
  },

  // 該当しない場合
  other: {
    displayName: "Other",
    icon: <span>?</span>
  }
};

/**
 * MySkill 型であるか判定する
 * @param value 判定対象の文字列
 * @returns MySkill 型であるなら true
 */
function isMySkills(value: string): value is MySkills {
  return (ALL_SKILLS as readonly string[]).includes(value);
}

/**
 * Contentful から取得した "Skill" のデータをカテゴリごとに分類する
 * @param skills "skill" の Content Type ID を持つ Contentful のデータの配列
 * @param category カテゴリ名（"language" | "lib-platform" | "database" | "framework" | "devops-tool"）
 * @returns SkillInfo 型の配列
 */
function extractByCategory(skills: Array<Entry<SkillSkeleton, "WITHOUT_LINK_RESOLUTION", string>>, category: string): Array<SkillInfo>{
  const filteredSkills = skills.filter(skill => skill.fields.category === category);
  return filteredSkills.map(skill => {
    const metadata = skillToMetadata[isMySkills(skill.fields.name) ? skill.fields.name : "other"];
    return {
      id: skill.sys.id, 
      name: metadata.displayName, 
      iconElement: metadata.icon, 
      level: skill.fields.level
    };
  });
}

export { skillToMetadata, extractByCategory, isMySkills };
export type { MySkills };