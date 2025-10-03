'use client';

import React, { useContext, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Lookup from '@/data/Lookup';
import { Button } from '../ui/button';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { auth } from '@/configs/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

function SignInDialog({ openDialog, closeDialog }: { openDialog: boolean; closeDialog: (v: boolean) => void }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);
  const router = useRouter();

  const handleFirebaseSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Create or update user in Convex DB
      await CreateUser({
        name: firebaseUser.displayName || 'Unknown',
        email: firebaseUser.email!,
        picture: firebaseUser.photoURL || '',
        uid: uuidv4(),
      });

      // Save locally for session
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(firebaseUser));
      }

      // Update context
      setUserDetail({
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        picture: firebaseUser.photoURL,
        uid: firebaseUser.uid,
        token: 0, // initial tokens
      });

      closeDialog(false);
      router.push('/dashboard'); // redirect to dashboard after login
    } catch (error) {
      console.error('Firebase sign-in error:', error);
    }
  };

  // Redirect to landing page if no Firebase user exists
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{Lookup.SIGNIN_HEADING}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col justify-center items-center gap-3">
              <p className="mt-2 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-400 mt-3"
                onClick={handleFirebaseSignIn}
              >
                Sign In With Google
              </Button>
              <p className="text-xs text-gray-400 text-center mt-2">{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
