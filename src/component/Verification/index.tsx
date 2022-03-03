import * as React from "react";
import styles from "./styles.less";
import {randCode} from "@/common/assect/util";

interface IProps {
  amount?: number,
  value?: string,
  id: string,
  onChange?: (e?: any) => any
}

const Verification = (props: IProps) => {
  const div = React.useRef<HTMLDivElement | null>(null);
  const array = [...new Array(props.amount ? props.amount : 4)];
  const [value, set_value] = React.useState<[...any]>(array);
  const [focus, set_focus] = React.useState<number>(props.value ? props.value.length : 0);
  const onChange = (e: any, index: number) => {
    if (e.target.value) {
      const v = [...value];
      v[index] = (e.target.value as string).replace(value[index], "");
      props.onChange && props.onChange((v.filter(i => i)).join(""));
      onChangeFocus(index, true, v);
    }
  };

  const onChangeFocus = (index: number, type: boolean, value: any) => {
    const i = type ? index + 1 : index - 1;
    const target = ((div.current as HTMLDivElement).getElementsByClassName(props.id))[i];
    const nowInput = target ? target : ((div.current as HTMLDivElement).getElementsByClassName(props.id))[index];
    const nowFocus = target ? i : index;
    const emptyValue = value.map((a: any, x: number) => x === nowFocus ? undefined : a);
    set_value(emptyValue);
    setTimeout(() => {
      set_value(value);
      set_focus(nowFocus);
      (nowInput as HTMLInputElement).focus();
    }, 0);
  };

  const deleteValue = () => {
    const v = [...value];
    v[focus] = undefined;
    for (let i = focus; i < v.length; i++) {
      v[i] = v[i + 1];
    }
    props.onChange && props.onChange((v.filter(i => i)).join(""));
    onChangeFocus(focus, false, v);
  };
  const onFocus = (e: React.SyntheticEvent<HTMLInputElement, Event> | undefined, index: number) => {
    set_focus(index);
  };

  const onkeydown = (e: any) => {
    switch (e.keyCode) {
      case 8:
        return deleteValue();
      case 37:
        return onChangeFocus(focus, false, value);
      case 39:
        return onChangeFocus(focus, true, value);

    }
  };

  React.useEffect(() => {
    const array = [...new Array(props.amount ? props.amount : 4)];
    for (let a = 0; a < (props.amount ? props.amount : 4); a++) {
      array[a] = `${props.value}`[a];
    }
    set_value(array);
    set_focus(props.value ? props.value.length : 0);
  }, [props.value, props.amount]);


  return <div className={styles.verification} ref={div} id={props.id} onKeyDown={onkeydown}>
    {value.map((i, index) => {
      return <input
        autoFocus={focus === index}
        value={value[index] ? value[index] : ""}
        maxLength={2}
        key={index}
        className={`${props.id} ${styles.input}`}
        onChange={(e) => onChange(e, index)}
        onFocus={(e) => onFocus(e, index)}
      />;
    })}
  </div>;
};

export default (props: { amount?: number, value?: string, onChange?: (e?: any) => any }) =>
  <Verification {...props} id={randCode()}/>;
