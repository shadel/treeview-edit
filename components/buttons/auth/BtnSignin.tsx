import { signIn } from 'next-auth/client'
import Link from 'next/link'
import { useSession } from '../../app/AppContext'
import { Button } from '../Button'

export function BtnSignin() {
  const session = useSession()
  if (session) {
    return
  }
  return (
    <Link href="/api/auth/signin">
      <Button
        onClick={(e) => {
          e.preventDefault()
          signIn()
        }}
      >
        Sign In
      </Button>
    </Link>
  )
}
