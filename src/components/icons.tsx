import type { SVGProps } from "react";

export const BowSawIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M19.5 4.5c-1.5 0-3.3.5-5.5.5s-4-.5-5.5-.5-3 .5-3 .5v15s1.5-.5 3-.5 3.5.5 5.5.5 4-.5 5.5-.5 3 .5 3 .5v-15s-1.5-.5-3-.5" />
        <path d="M3 12h18" />
    </svg>
);
