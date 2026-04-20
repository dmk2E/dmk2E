import "./DropDownMenu.css";
import type { DefaultProps } from "@/utils";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import type React from "react";

type DropDownMenuProps = DefaultProps & {
  initialItemId?: number, 
  label: string, 
  setItemFunc?: React.Dispatch<React.SetStateAction<any>>, 
  options: Array<string>
};

export default function DropDownMenu( props: DropDownMenuProps ){
  const menuId = useRef<string>(/* initialValue = */ "");
  const {initialItemId, label, options, setItemFunc} = props;
  const [currentOption, setCurrentOption] = useState<string>(/* initialState = */ options[initialItemId ? initialItemId : 0]);

  useEffect(/* effect = */ () =>{
    menuId.current = crypto.randomUUID();
    if(setItemFunc && initialItemId)setItemFunc(/* value = */ options[initialItemId]);
  }, /* deps = */ []);

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) =>{
    evt.stopPropagation();
    const currentValue = evt.currentTarget.value;
    setCurrentOption(/* value = */ currentValue);
    if(setItemFunc)setItemFunc(/* value = */ currentValue);
  };

  return (
    <div 
    id={props.id}
    className={clsx("DropDownMenu", props.className)} 
    style={props.style}
    aria-label="drop-down-menu"
    >
      <label htmlFor={menuId.current}>{label}</label>：
      <select 
      id={menuId.current} 
      value={currentOption} 
      onChange={handleChange}
      >
        {options.map((option, index) => (
          <option 
          key={index} 
          value={option}
          >
            {option}
          </option>))}
      </select>
    </div>
  );
}