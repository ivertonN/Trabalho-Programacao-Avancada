import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    font_primary: string | undefined;
    font_secondary: string | undefined;
    font_success: string | undefined;
    font_danger: string | undefined;
    font_warning: string | undefined;
    font_info: string | undefined;
    font_high: string | undefined;
    font_low: string | undefined;

    button_primary: string | undefined;
    button_secondary: string | undefined;
    button_success: string | undefined;
    button_danger: string | undefined;
    button_warning: string | undefined;
    button_info: string | undefined;
    button_high: string | undefined;
    button_low: string | undefined;

    background_primary: string | undefined;
    background_secondary: string | undefined;
    background_success: string | undefined;
    background_danger: string | undefined;
    background_warning: string | undefined;
    background_info: string | undefined;
    background_high: string | undefined;
    background_low: string | undefined;
  }
}
