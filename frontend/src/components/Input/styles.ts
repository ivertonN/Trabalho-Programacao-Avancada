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
    box-shadow: 0 0 0 30px ${({ theme }) =>
      theme.background_primary} inset !important;
    color: ${({ theme }) => theme.font_primary} !important;
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
        color: ${({ theme }) => theme.font_secondary} !important;
      }

      &.Mui-error {
        color: ${({ theme }) => theme.font_danger} !important;
      }

      color: ${({ theme }) => theme.font_secondary};
    }

    > .MuiInputBase-root {
      &.Mui-focused {
        input {
          color: ${({ theme }) => theme.font_primary} !important;
        }

        fieldset {
          border-color: ${({ theme }) => theme.font_secondary} !important;
        }

        svg {
          color: ${({ theme }) => theme.font_secondary} !important;
        }
      }

      &.Mui-error {
        input {
          color: ${({ theme }) => theme.font_danger} !important;
        }

        fieldset {
          border-color: ${({ theme }) => theme.font_danger} !important;
        }

        svg {
          color: ${({ theme }) => theme.font_danger} !important;
        }
      }

      }

      input {
        color: ${({ theme }) => theme.font_primary};
      }

      svg {
        color: ${({ theme }) => theme.font_secondary};
      }

      fieldset {
        border-color: ${({ theme }) => theme.font_secondary};
      }
    }
  }
`;
