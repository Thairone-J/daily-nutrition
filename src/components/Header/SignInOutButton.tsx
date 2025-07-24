'use client';

import { signIn, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import Button from '../UI/Button/Button';
import { usePathname } from 'next/navigation';

interface AuthButtonsProps {
  session: Session | null;
}

export default function SignInOutButton({ session }: AuthButtonsProps) {
  const pathname = usePathname();
  const isAuthPage = pathname.includes('/login') || pathname.includes('/register');

  if (isAuthPage) {
    return null;
  }

  if (session) {
    return (
      <Button
        onClick={() => signOut({ callbackUrl: '/' })}
        variant="outlineSecondary"
        fontSize="small"
      >
        Logout
      </Button>
    );
  }

  return (
    <Button onClick={() => signIn()} variant="outline" fontSize="small">
      Login
    </Button>
  );
}
