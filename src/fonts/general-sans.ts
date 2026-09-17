import localFont from 'next/font/local'

export const generalSans = localFont({
  src: [
    {
      path: './general-sans/GeneralSans-Extralight.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: './general-sans/GeneralSans-ExtralightItalic.woff',
      weight: '200',
      style: 'italic',
    },
    {
      path: './general-sans/GeneralSans-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './general-sans/GeneralSans-LightItalic.woff',
      weight: '300',
      style: 'italic',
    },
    {
      path: './general-sans/GeneralSans-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './general-sans/GeneralSans-Italic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: './general-sans/GeneralSans-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './general-sans/GeneralSans-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },
    {
      path: './general-sans/GeneralSans-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: './general-sans/GeneralSans-SemiboldItalic.woff',
      weight: '600',
      style: 'italic',
    },
    {
      path: './general-sans/GeneralSans-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './general-sans/GeneralSans-BoldItalic.woff',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-general-sans',
  display: 'swap',
})
