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
    <form action={props.href} className={clsx("link-button", props.className)}>
        <button type="submit" style={props.buttonStyle}>{props.sentence}</button>
    </form>
  );
}