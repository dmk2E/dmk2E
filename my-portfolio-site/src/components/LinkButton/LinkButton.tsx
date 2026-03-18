import "./LinkButton.css";
import type { DefaultProps } from "@/util";
import clsx from "clsx";

type LinkButtonProps = DefaultProps & {
  sentence: string, 
  href: string
};

export default function LinkButton( props: LinkButtonProps ){
  return (
    <a 
    href={props.href} 
    style={props.style} 
    className={clsx("link-button", props.className)} 
    target="_blank" 
    rel="noopener noreferrer"
    >
      {props.sentence}
    </a>
  );
}