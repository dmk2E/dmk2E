import type { SkillInfo } from "@/util";
import type { ReactNode } from "react";

const INF = 100;
const MAX_LEVEL = 5;

/**
 * レベルを★で表現した文字列を返す
 * 実例：`3` => "★★★☆☆"
 * @param level レベル数
 * @returns ★と☆で構成される文字列
 */
function lvlStr(level: number): string{
  return "★".repeat(/* count = */ level) + "☆".repeat(/* count = */ MAX_LEVEL - level);
}

/**
 * 1列に最大 maxTableRow 行含まれる表の配列を返す
 * @param skills スキル情報群
 * @returns <table>タグが親の ReactNode の配列
 */
function renderTables(skills: Array<SkillInfo>, maxTableRow: number = INF): Array<ReactNode>{
  let id = 0, chunkId = 0;
  const tables: Array<ReactNode> = [];
  while(id < skills.length){
    // MAX_TABLE_ROW 個だけスキル情報を抽出する
    let numItems = maxTableRow;
    const skillChunk = [];
    while(id < skills.length && numItems > 0){
      skillChunk.push(skills[id]);
      numItems--;
      id++;
    }
    // 抽出したスキル情報を元に一つの表を描画する
    tables.push(
      <table key={chunkId}>
        <tbody>
          {
            skillChunk.map(skill =>(
              <tr key={skill.id}>
                <td>{skill.iconElement}</td>
                <td>{skill.name}</td>
                <td>{lvlStr(/* level = */ skill.level)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
    chunkId++;
  }
  return tables;
}

export { renderTables };