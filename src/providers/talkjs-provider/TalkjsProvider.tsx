import { useMe } from "../../hooks/api"

export const TalkjsProvider = ({ children }: { children: React.ReactNode }) => {
  const { seller, isPending } = useMe()

  if (isPending)
    return <div className="flex justify-center items-center h-screen" />

  if (!seller) return <>{children}</>

  return <>{children}</>
}
