import "./RelatedLinks.css";
import type { DefaultProps } from "@/util";
import clsx from "clsx";
import LinkButton from "@/components/LinkButton/LinkButton";
// アイコン画像の取得
import atcoderLogo from "@/assets/atcoder_logo_transparent.png?url";
import qiitaLogo from "@/assets/qiita_icon.png";
import zennLogo from "@/assets/zenn_logo.svg";

type RelatedLinksProps = DefaultProps & {

};

export default function RelatedLinks( props: RelatedLinksProps ){
  return (
    <nav>
      <fieldset className={clsx("related-links", props.className)}>
        <legend>&#x1F310;&#65039;<span className="caption">Related Links</span></legend>
        <LinkButton 
        href="https://atcoder.jp/users/Kou0406" 
        sentence="AtCoder" 
        buttonStyle={{
          // 画像URLが、データURLとして解釈された際、
          // 無効な文字が入っても対応できるように "${imagePath}" と記述

          // background: `url("${atcoderLogo}") no-repeat 0.25em 0px/1.1em #ffffffb3`
          // FIXME: なぜか上記の記述と，位置や大きさの基準が異なる模様
          backgroundImage: `url(${atcoderLogo})`, 
          backgroundRepeat: "no-repeat", 
          backgroundPosition: "0.3em 0.01em", 
          backgroundSize: "1.0em"
        }}/>
        <LinkButton 
        href="https://qiita.com/dmk2E" 
        sentence="Qiita" 
        buttonStyle={{
          // background: `url("${qiitaLogo}") no-repeat 0.30em 0.10em/1.0em #ffffffb3`
          // FIXME: なぜか上記の記述と，位置や大きさの基準が異なる模様
          backgroundImage: `url(${qiitaLogo})`, 
          backgroundRepeat: "no-repeat", 
          backgroundPosition: "0.3em 0.1em", 
          backgroundSize: "1.0em"
        }}/>
        <LinkButton 
        href="https://zenn.dev/dmk2e" 
        sentence="Zenn" 
        buttonStyle={{
          backgroundImage: `url("${zennLogo}")`, 
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0.30em 0.10em",
          backgroundSize: "1.0em"
        }}/>
      </fieldset>
    </nav>
  );
}