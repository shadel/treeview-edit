import { signOut } from 'next-auth/client'
import Link from 'next/link'
import { useSession } from '../../app/AppContext'
import { Button } from '../Button'

export function BtnSignout() {
  const session = useSession()
  if (!session) {
    return
  }

  return (
    <div>
      <Link href="/api/auth/signout">
        <Button
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
        >
          Sign Out
        </Button>
      </Link>
    </div>
  )
}
