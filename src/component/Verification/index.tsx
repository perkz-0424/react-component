import * as React from "react";
import styles from "./styles.less";
import {Input} from "element-react";
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
  const onChange = (e: React.SyntheticEvent<HTMLInputElement, Event> | undefined, index: number) => {
    if (e) {
      const last = `${e}`.length - 1;
      const lastValue = `${e}`[last];
      const v = [...value];
      v[index] = lastValue;
      props.onChange && props.onChange((v.filter(i => i)).join(""));
      onChangeFocus(index, true);
      set_value(v);
    }
  };

  const onChangeFocus = (index: number, type?: boolean) => {
    const i = type ? index + 1 : index - 1;
    const target = ((div.current as HTMLDivElement).getElementsByClassName(props.id))[i];
    if (target) {
      set_focus(i);
      const input = target.children[0];
      (input as HTMLInputElement).focus();
    }
  };

  const deleteValue = () => {
    const v = [...value];
    v[focus] = undefined;
    for (let i = focus; i < v.length; i++) {
      v[i] = v[i + 1];
    }
    props.onChange && props.onChange((v.filter(i => i)).join(""));
    set_value(v);
    onChangeFocus(focus);
  };
  const onFocus = (e: React.SyntheticEvent<HTMLInputElement, Event> | undefined, index: number) => {
    set_focus(index);
  };

  const onkeydown = (e: any) => {
    switch (e.keyCode) {
      case 8:
        return deleteValue();
      case 37:
        return onChangeFocus(focus);
      case 39:
        return onChangeFocus(focus, true);

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
      return <Input
        autoFocus={focus === index}
        value={value[index]}
        max={1}
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
