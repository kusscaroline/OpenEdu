import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const session = useSession()

  console.log({ session })
  return <div>Access Token: </div>
}