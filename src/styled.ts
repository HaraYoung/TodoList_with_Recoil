import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme  {
    bgColor: string,
    boxColor: string,
    textColor: string,
    boxTextColor: string,
    accentColor: string,
    boxShadow: string,
    hoverBoxShadow :string
  }
}
