import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/ui/dropdown-menu'
import { Button } from '@/ui/button'
import { Link } from '@/ui/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/ui/dialog'

import { UserIcon } from '@/icons/UserIcon'

import type { Session } from '@auth/core/types'

import { LoginButton } from '../auth/LoginButton'
import { useUserStore } from '@/store/user'

const { signOut } = await import('auth-astro/client')

interface Props {
  session: Session | null
}

export function UserButton () {
  const user = useUserStore(state => state.data)

  const logout = () => {
    signOut()
  }

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className='text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
              size='icon'
              variant='ghost'
            >
              <UserIcon className='h-5 w-5' />
              <span className='sr-only'>Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel className='font-medium text-md'>
              {user.name}
            </DropdownMenuLabel>
            <DropdownMenuLabel className='font-normal'>
              {user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className='font-normal'>
              <Link href='/dashboard' className='w-full'>
                Dashboard
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <a href='#'>Logout</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='secondary'>
              <UserIcon className='h-5 w-5' />
              Join us
            </Button>
          </DialogTrigger>
          <DialogContent className='w-full sm:max-w-md text-foreground'>
            <DialogHeader className='flex items-center justify-center my-4 gap-2'>
              <DialogTitle className='text-2xl capitalize'>
                bittyurl
              </DialogTitle>
              <DialogDescription>Sign in with Google account.</DialogDescription>
              <DialogDescription>To access your shortened links list.</DialogDescription>
            </DialogHeader>
            <div className='flex items-center justify-center space-x-2 mb-4'>
              <LoginButton provider='google' />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
