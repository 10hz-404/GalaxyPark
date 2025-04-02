import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function AboutLayout(props: React.PropsWithChildren) {
  return (
    <>
      {props.children}
      <Analytics />
      <SpeedInsights />
    </>
  )
}
