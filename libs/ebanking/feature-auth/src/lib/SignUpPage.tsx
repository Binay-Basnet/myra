import { useState } from 'react';

import { LoaderOverlay } from '@coop/ebanking/components';

import DetailsPage from './DetailsPage';
import OTPPage from './OTPPage';
import SignUpHomePage from './SignUpHomePage';
import { SignUpStatus } from '../types/SignUpStatus';

export const SignUpPage = () => {
  const [status, setStatus] = useState<SignUpStatus>(SignUpStatus.INITIAL);

  return (
    <>
      {status === SignUpStatus.LOADING && <LoaderOverlay />}

      {(() => {
        if (status === SignUpStatus.OTP) {
          return <OTPPage setStatus={setStatus} />;
        }

        if (status === SignUpStatus.DETAILS) {
          return <DetailsPage setStatus={setStatus} />;
        }

        return <SignUpHomePage setStatus={setStatus} />;
      })()}
    </>
  );
};
