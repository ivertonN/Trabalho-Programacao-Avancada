import { transparentize } from "polished";
import styled, { css } from "styled-components";

interface IContainerProps {
  hide: boolean;
  fullWidth: boolean;
  disabled: boolean;
  readOnly: boolean;
  error: boolean;
  children: React.ReactNode;
}

export const Container = styled.div<IContainerProps>`
  display: ${(props) => (props.hide ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  /* Change the white to any color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0 30px #ffffff inset !important;
    color: #ffffff !important;
  }

  ${(props) =>
    (props.disabled || props.readOnly) &&
    css`
      * {
        cursor: not-allowed !important;
      }
    `}

  .MuiTextField-root {
    label,
    p {
      &.Mui-focused {
        color: #000000 !important;
      }

      &.Mui-error {
        color: #eb5757 !important;
      }

      &.Mui-disabled {
        color: ${() => transparentize(0.5, "#fecda5")} !important;
      }

      color: #000000;
    }

    > .MuiInputBase-root {
      &.Mui-focused {
        input {
          color: #000000 !important;
        }

        fieldset {
          border-color: #fecda5 !important;
        }

        svg {
          color: #fecda5 !important;
        }
      }

      &.Mui-error {
        input {
          color: #eb5757 !important;
        }

        fieldset {
          border-color: #eb5757 !important;
        }

        svg {
          color: #eb5757 !important;
        }
      }

      &.Mui-disabled {
        input {
          color: ${() => transparentize(0.5, "#fecda5")} !important;
        }

        fieldset {
          border-color: ${() => transparentize(0.5, "#fecda5")} !important;
        }

        svg {
          color: ${() => transparentize(0.5, "#fecda5")} !important;
      }

      input {
        color: #ffffff;
      }

      svg {
        color: #fecda5;
      }

      fieldset {
        border-color: #fecda5;
      }
    }
  }
`;
