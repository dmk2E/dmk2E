import "./DropDownMenu.css";
import type { DefaultProps } from "@/utils";
import clsx from "clsx";
import { useState, useEffect, useId } from "react";
import type React from "react";

type DropDownMenuProps<T extends string> = DefaultProps & {
  initialItemId?: number, 
  label: string, 
  setItemFunc?: React.Dispatch<React.SetStateAction<T>>, 
  options: Array<T>
};

export default function DropDownMenu<T extends string>( props: DropDownMenuProps<T> ){
  const menuId = useId();
  const {initialItemId, label, options, setItemFunc} = props;
  const [currentOption, setCurrentOption] = useState<T>(/* initialState = */ options[initialItemId ?? 0]);

  useEffect(/* effect = */ () =>{
    if(setItemFunc && initialItemId)setItemFunc(/* value = */ options[initialItemId]);
  }, /* deps = */ []);

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) =>{
    evt.stopPropagation();
    const currentValue = evt.currentTarget.value;
    setCurrentOption(/* value = */ currentValue as T);
    if(setItemFunc)setItemFunc(/* value = */ currentValue as T);
  };

  return (
    <div 
    id={props.id}
    className={clsx("DropDownMenu", props.className)} 
    style={props.style}
    aria-label="drop-down-menu"
    >
      <label htmlFor={menuId}>{label}</label>：
      <select 
      id={menuId} 
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