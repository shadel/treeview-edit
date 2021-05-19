import { signOut } from 'next-auth/client'
import Link from 'next/link'
import { useSession } from '../../app/AppContext'

export function LinkSignout({ className }: { className: string }) {
  const session = useSession()
  if (!session) {
    return
  }

  return (
    <Link href="/api/auth/signout">
      <a
        tabIndex={0}
        role="button"
        onKeyPress={(e) => {
          e.preventDefault()
          signOut()
        }}
        onClick={(e) => {
          e.preventDefault()
          signOut()
        }}
        className={className}
      >
        Sign Out
      </a>
    </Link>
  )
}
