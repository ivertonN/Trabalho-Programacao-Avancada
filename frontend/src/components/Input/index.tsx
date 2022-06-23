/* eslint-disable react/require-default-props */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
// import InputMask from "react-input-mask";
import { useField } from "@unform/core";

// Style import
import { Container } from "./styles";

// Interfaces
// interface ITextMaskCustomProps {
//   inputRef: (ref: HTMLInputElement | null) => void;
//   mask: string;
// }

type IRef = HTMLInputElement;

interface IProps {
  name?: string;
  value?: any;
  standalone?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  hide?: boolean;
  placeholder?: string;
  error?: string | null;
  className?: string;

  onlyNumbers?: boolean;
  uppercase?: boolean;
  blockEnter?: boolean;

  type?: "text" | "password" | "number";
  variant?: "filled" | "outlined";
  multiline?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  size?: "small" | "medium";
  noFullWidth?: boolean;
  margin?: "normal" | "dense" | "none";
  mask?: string;

  label?: string;
  helpLabel?: string;

  onChange?: (
    value: any,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => any;
  onFocus?: (event: React.FocusEvent) => any;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => any;
  onPaste?: (event: React.ClipboardEvent<HTMLDivElement>) => any;
  onEnterKey?: (event: React.KeyboardEvent) => any;
  onKeyPress?: (event: React.KeyboardEvent) => any;

  [key: string]: any;
}

// Input mask
// const TextMaskCustom: React.FC<ITextMaskCustomProps> = ({
//   inputRef,
//   mask,
//   ...rest
// }) => {
//   return <InputMask {...rest} mask={mask} inputRef={inputRef} />;
// };

const Input = forwardRef<IRef, IProps>(
  (
    {
      name,
      value: originalValue,
      standalone,
      readOnly,
      disabled,
      hide,
      placeholder,
      error,
      className,

      onlyNumbers,
      uppercase,
      blockEnter,

      type,
      variant,
      multiline,
      startAdornment,
      endAdornment,
      size,
      noFullWidth,
      margin,
      mask,

      label,
      helpLabel,

      onChange,
      onFocus,
      onInput,
      onPaste,
      onEnterKey,
      onKeyPress,

      ...rest
    },
    ref
  ) => {
    // Register field name
    const {
      fieldName,
      defaultValue,
      registerField,
      error: formError,
      clearError,
    } = name && !standalone // eslint-disable-next-line react-hooks/rules-of-hooks
      ? useField(name)
      : ({} as ReturnType<typeof useField>);

    // Local states
    const [value, setValue] = useState<any>(
      originalValue || defaultValue || null
    );

    // Local refs
    const inputRef = useRef<HTMLInputElement>(null);

    // Merge external ref with local ref
    useLayoutEffect(() => {
      if (ref) {
        if (typeof ref === "function") ref(inputRef.current);
        else ref.current = inputRef.current;
      }
    }, [inputRef, ref]);

    // Register field on unform
    useEffect(() => {
      if (name && !standalone)
        registerField({
          name: fieldName,
          getValue: () => value,
          setValue: (_: any, newValue: any) => setValue(newValue),
          clearValue: () => setValue(null),
        });
    }, [registerField, name, standalone, fieldName, value]);

    // Set local value when external value changes
    useEffect(() => {
      setValue(originalValue);
    }, [originalValue]);

    // Handle input change
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
        if (typeof onChange === "function") onChange(event.target.value, event);
      },
      [onChange]
    );

    // Handle input focus
    const handleFocus = useCallback(
      (event: React.FocusEvent) => {
        if (typeof clearError === "function") clearError();
        if (typeof onFocus === "function") onFocus(event);
      },
      [clearError, onFocus]
    );

    // Handle input
    const handleInput = useCallback(
      (event: any) => {
        if (uppercase) event.target.value = event.target.value.toUpperCase();
        if (typeof onInput === "function") onInput(event);
      },
      [onInput, uppercase]
    );

    // Handle paste
    const handlePaste = useCallback(
      (event: React.ClipboardEvent<any>) => {
        if (event?.target && event?.type === "paste" && inputRef?.current) {
          const start = inputRef.current.selectionStart || 0;
          const end = inputRef.current.selectionEnd || 0;
          const newChar = event.clipboardData.getData("text").toUpperCase();

          if (uppercase) {
            inputRef.current.value =
              inputRef.current.value.substring(0, start) +
              newChar +
              inputRef.current.value.substring(end);
            inputRef.current.setSelectionRange(
              start + newChar.length,
              start + newChar.length
            );
            event.preventDefault();
          }
        }
        if (typeof onPaste === "function") return onPaste(event);
        return true;
      },
      [uppercase, inputRef, onPaste]
    );

    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent) => {
        if (!blockEnter && event.key === "Enter") event.preventDefault();
        if (event.key === "Enter" && typeof onEnterKey === "function")
          onEnterKey(event);
        if (onlyNumbers) {
          if (Number(event.key) >= 0 && Number(event.key) <= 9)
            event.preventDefault();
        }
        if (typeof onKeyPress === "function") onKeyPress(event);
        // number cancel uppercase method
      },
      [onEnterKey, onKeyPress, onlyNumbers, blockEnter]
    );

    return (
      <Container
        className={className}
        hide={!!hide}
        fullWidth={!noFullWidth}
        disabled={!!disabled}
        readOnly={!!readOnly}
        error={!!error || !!formError}
      >
        <TextField
          inputRef={inputRef}
          name={name || undefined}
          value={value || ""}
          InputProps={{
            ...rest,
            readOnly,
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : undefined,
            endAdornment: endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : undefined,
            ...(!!mask && {
              // inputComponent: TextMaskCustom as any,
              inputProps: {
                mask,
              },
            }),
            onInput: handleInput,
            onPaste: handlePaste,
            onKeyPress: handleKeyPress,
          }}
          size={size}
          fullWidth={!noFullWidth}
          margin={margin}
          disabled={disabled}
          placeholder={placeholder || undefined}
          error={!!error || !!formError}
          label={label}
          helperText={error || formError || helpLabel}
          type={type}
          variant={variant || undefined}
          multiline={multiline}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          {...(!!mask && {
            InputLabelProps: {
              shrink: !!value,
            },
          })}
        />
      </Container>
    );
  }
);

Input.defaultProps = {
  name: null,
  value: undefined,
  standalone: false,
  readOnly: false,
  disabled: false,
  hide: false,
  placeholder: null,
  error: null,

  type: "text",
  variant: "outlined",
  multiline: false,
  startAdornment: undefined,
  endAdornment: undefined,
  size: "small",
  noFullWidth: false,
  margin: "normal",
  mask: undefined,

  label: null,
  helpLabel: null,

  onChange: undefined,
  onFocus: undefined,
};

export default Input;
