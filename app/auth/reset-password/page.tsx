// app/auth/reset-password/page.tsx

import { Suspense } from 'react';
import ResetPasswordPreview from '@/app/components/resetpassword';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPreview />
    </Suspense>
  );
}