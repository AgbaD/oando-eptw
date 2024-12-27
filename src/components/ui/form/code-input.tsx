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
    const value = code.join("");
    onChange && onChange(value);

    if (onSubmit && value.length === length && value.indexOf("") === -1) {
      onSubmit(value);
    }
  }, [code]);

  function handleInput(
    e: h.JSX.TargetedKeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    const key = e.key;

    const inputs = Array.from(
      codeInputWrapper.current!.querySelectorAll("input")
    );
    const copiedCode = [...code];

    if (key === "Backspace") {
      copiedCode[index] = "";
      setCode(copiedCode);

      if (index > 0) {
        inputs[index - 1].focus();
      }
      e.preventDefault();
    } else if (key >= "0" && key <= "9") {
      copiedCode[index] = key;
      setCode(copiedCode);

      if (index < length - 1) {
        inputs[index + 1].focus();
      } else {
        inputs[index].blur();
      }
      e.preventDefault();
    } else {
      e.preventDefault();
    }
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const pastedValue = e.clipboardData?.getData("text").trim() || "";
    const sanitizedValue = pastedValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const results = sanitizedValue.split("").slice(0, length); // Truncate to the correct length
    const inputs = Array.from(
      codeInputWrapper.current!.querySelectorAll("input")
    );

    // Fill in the pasted values and focus the appropriate field
    const newCode = [...code];
    results.forEach((val, i) => {
      newCode[i] = val;
    });

    setCode(newCode);

    // Focus the next empty field or blur if complete
    const nextFieldIndex =
      results.length < length ? results.length : length - 1;
    if (inputs[nextFieldIndex]) {
      inputs[nextFieldIndex].focus();
    } else {
      inputs[length - 1].blur();
    }
  }

  return (
    <div className="base-code-input" ref={codeInputWrapper}>
      {code.map((value, index) => (
        <input
          value={value}
          key={index}
          className="base-code-input__field"
          type="text"
          maxLength={1}
          onKeyDown={(e) => handleInput(e, index)}
          onPaste={(e) => handlePaste(e)}
          onFocus={(e) => (e.target as HTMLInputElement).select()}
        />
      ))}
    </div>
  );
};

export default CodeInput;
