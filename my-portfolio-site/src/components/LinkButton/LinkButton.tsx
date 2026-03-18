import "./LinkButton.css";
import type { DefaultProps } from "@/util";
import React from "react";
import clsx from "clsx";

type LinkButtonProps = DefaultProps & {
  sentence: string, 
  href: string, 
  buttonStyle?: React.CSSProperties
};

export default function LinkButton( props: LinkButtonProps ){
  return (
    <a 
    href={props.href} 
    style={props.buttonStyle} 
    className={clsx("link-button", props.className)} 
    target="_blank" 
    rel="noopener noreferrer"
    >
      {props.sentence}
    </a>
  );
}