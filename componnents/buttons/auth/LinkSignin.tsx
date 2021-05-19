import { signIn } from 'next-auth/client'
import Link from 'next/link'
import { useSession } from '../../app/AppContext'

export function LinkSignin({ className }: { className: string }) {
  const session = useSession()
  if (session) {
    return
  }
  return (
    <Link href="/api/auth/signin">
      <a
        tabIndex={0}
        role="button"
        onKeyPress={(e) => {
          e.preventDefault()
          signIn()
        }}
        onClick={(e) => {
          e.preventDefault()
          signIn()
        }}
        className={className}
      >
        Sign In
      </a>
    </Link>
  )
}
