
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const groundedRadiate: CustomThemeConfig = {
    name: 'Valpo Radiate',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        "--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "9999px",
        "--theme-rounded-container": "8px",
        "--theme-border-base": "1px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "0 0 0",
        "--on-secondary": "0 0 0",
        "--on-tertiary": "255 255 255",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "255 255 255",
        "--on-surface": "255 255 255",
        // =~= Theme Colors  =~=
        // primary | #FFE300 
        "--color-primary-50": "255 251 217", // #fffbd9
        "--color-primary-100": "255 249 204", // #fff9cc
        "--color-primary-200": "255 248 191", // #fff8bf
        "--color-primary-300": "255 244 153", // #fff499
        "--color-primary-400": "255 235 77", // #ffeb4d
        "--color-primary-500": "255 227 0", // #FFE300
        "--color-primary-600": "230 204 0", // #e6cc00
        "--color-primary-700": "191 170 0", // #bfaa00
        "--color-primary-800": "153 136 0", // #998800
        "--color-primary-900": "125 111 0", // #7d6f00
        // secondary | #F5B80A 
        "--color-secondary-50": "254 244 218", // #fef4da
        "--color-secondary-100": "253 241 206", // #fdf1ce
        "--color-secondary-200": "253 237 194", // #fdedc2
        "--color-secondary-300": "251 227 157", // #fbe39d
        "--color-secondary-400": "248 205 84", // #f8cd54
        "--color-secondary-500": "245 184 10", // #F5B80A
        "--color-secondary-600": "221 166 9", // #dda609
        "--color-secondary-700": "184 138 8", // #b88a08
        "--color-secondary-800": "147 110 6", // #936e06
        "--color-secondary-900": "120 90 5", // #785a05
        // tertiary | #5C3000 
        "--color-tertiary-50": "231 224 217", // #e7e0d9
        "--color-tertiary-100": "222 214 204", // #ded6cc
        "--color-tertiary-200": "214 203 191", // #d6cbbf
        "--color-tertiary-300": "190 172 153", // #beac99
        "--color-tertiary-400": "141 110 77", // #8d6e4d
        "--color-tertiary-500": "92 48 0", // #5C3000
        "--color-tertiary-600": "83 43 0", // #532b00
        "--color-tertiary-700": "69 36 0", // #452400
        "--color-tertiary-800": "55 29 0", // #371d00
        "--color-tertiary-900": "45 24 0", // #2d1800
        // success | #6BC9C9 
        "--color-success-50": "233 247 247", // #e9f7f7
        "--color-success-100": "225 244 244", // #e1f4f4
        "--color-success-200": "218 242 242", // #daf2f2
        "--color-success-300": "196 233 233", // #c4e9e9
        "--color-success-400": "151 217 217", // #97d9d9
        "--color-success-500": "107 201 201", // #6BC9C9
        "--color-success-600": "96 181 181", // #60b5b5
        "--color-success-700": "80 151 151", // #509797
        "--color-success-800": "64 121 121", // #407979
        "--color-success-900": "52 98 98", // #346262
        // warning | #C76917 
        "--color-warning-50": "247 233 220", // #f7e9dc
        "--color-warning-100": "244 225 209", // #f4e1d1
        "--color-warning-200": "241 218 197", // #f1dac5
        "--color-warning-300": "233 195 162", // #e9c3a2
        "--color-warning-400": "216 150 93", // #d8965d
        "--color-warning-500": "199 105 23", // #C76917
        "--color-warning-600": "179 95 21", // #b35f15
        "--color-warning-700": "149 79 17", // #954f11
        "--color-warning-800": "119 63 14", // #773f0e
        "--color-warning-900": "98 51 11", // #62330b
        // error | #A80087 
        "--color-error-50": "242 217 237", // #f2d9ed
        "--color-error-100": "238 204 231", // #eecce7
        "--color-error-200": "233 191 225", // #e9bfe1
        "--color-error-300": "220 153 207", // #dc99cf
        "--color-error-400": "194 77 171", // #c24dab
        "--color-error-500": "168 0 135", // #A80087
        "--color-error-600": "151 0 122", // #97007a
        "--color-error-700": "126 0 101", // #7e0065
        "--color-error-800": "101 0 81", // #650051
        "--color-error-900": "82 0 66", // #520042
        // surface | #331A00 
        "--color-surface-50": "224 221 217", // #e0ddd9
        "--color-surface-100": "214 209 204", // #d6d1cc
        "--color-surface-200": "204 198 191", // #ccc6bf
        "--color-surface-300": "173 163 153", // #ada399
        "--color-surface-400": "112 95 77", // #705f4d
        "--color-surface-500": "51 26 0", // #331A00
        "--color-surface-600": "46 23 0", // #2e1700
        "--color-surface-700": "38 20 0", // #261400
        "--color-surface-800": "31 16 0", // #1f1000
        "--color-surface-900": "25 13 0", // #190d00

    }
}