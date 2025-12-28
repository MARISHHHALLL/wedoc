import * as React from "react";
import { SVGProps } from "react";
export const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#001FAE"
        fillRule="evenodd"
        d="M0 .11v5.812c0 .48.192.703.576 1.086.383.383.96.383.96.383h14.583s6.204.958 6.46 7.345c.256 6.386-6.076 7.728-6.076 7.728-2.431.192-8.827 0-8.827 0v6.195s0 .575.383.958c.384.383.64.383.64.383h8.955c.64 0 12.486-2.427 12.345-14.881C29.858 2.665 19.765.685 16.822.239 13.88-.21 0 .11 0 .11Zm5.117 15.473H.767v4.343a2.557 2.557 0 0 0 2.56 2.555h4.349v-4.343a2.557 2.557 0 0 0-2.559-2.555Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h30v30H0z" />
      </clipPath>
    </defs>
  </svg>
);
