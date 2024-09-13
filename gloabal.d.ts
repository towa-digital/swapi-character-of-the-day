import "react";

declare module "react" {
  interface CSSProperties {
    "--skin-color"?: string;
    "--pants-color"?: string;
    "--shoes-color"?: string;
    "--hair-color"?: string;
    "--shirt-color"?: string;
    "--eyes-color"?: string;
    "--mouth-color"?: string;
    "--scale-factor"?: number;
  }
}
