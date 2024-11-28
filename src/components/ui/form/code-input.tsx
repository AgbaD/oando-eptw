import { FunctionalComponent, h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface CodeInputProps {
  length?: number;
  className?: string;
  onChange?: (code: string) => void;
  onSubmit?: (code: string) => void;
}

const CodeInput: FunctionalComponent<CodeInputProps> = (props) => {
  const { length = 6, onChange, onSubmit } = props;
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const codeInputWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const value = code.join("")
    onChange && onChange(value);

    if(onSubmit && value.length === length){
      onSubmit(value)
    }
  }, [code]);

  function handleInput(e: h.JSX.TargetedKeyboardEvent<HTMLInputElement>, index: number) {
    const key = e.key;
    // const target = e.target as HTMLInputElement

    if (key === "Backspace") {
      //@ts-ignore
      const inputs = Array.from(codeInputWrapper.current.querySelectorAll("input"));
      const copiedCode = [...code];
      copiedCode[index] = "";

      setCode(copiedCode);
      if (index > 0) {
        inputs[index - 1].focus();
      }
      e.preventDefault();
    } else if (Number(key) || key === "0") {
      //@ts-ignore
      const inputs = Array.from(codeInputWrapper.current.querySelectorAll("input"));
      const copiedCode = [...code];
      copiedCode[index] = key;

      setCode(copiedCode);

      if (index < length - 1) {
        inputs[index + 1].focus();
      } else {
        inputs[index].blur();
      }
    } else {
      e.preventDefault();
    }
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    let target = e.target as HTMLInputElement;

    let pastedValue = e.clipboardData?.getData("text").split("");
    const results = pastedValue?.splice(0, length).map(val => (isNaN(Number(val)) ? "" : val));

    if (results) {
      setCode(results);
      target.blur();
    }
  }

  return (
    <div className="base-code-input" ref={codeInputWrapper}>
      {code.map((value, index) => (
        <input
          value={value}
          key={index}
          className="base-code-input__field"
          type="number"
          maxLength={1}
          onKeyUp={e => handleInput(e, index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
};

export default CodeInput;
