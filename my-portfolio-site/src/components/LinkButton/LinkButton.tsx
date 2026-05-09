import "./LinkButton.css";
import type { DefaultProps } from "@/utils";
import clsx from "clsx";

type LinkButtonProps = DefaultProps & {
  sentence: string, 
  href: string
};

export default function LinkButton( props: LinkButtonProps ){
  const { sentence, href } = props;

  return (
    <a 
    id={props.id} 
    href={href} 
    style={props.style} 
    className={clsx("link-button", props.className)} 
    target="_blank" 
    rel="noopener noreferrer"
    >
      {sentence}
    </a>
  );
}