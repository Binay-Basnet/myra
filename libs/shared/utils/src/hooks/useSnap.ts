import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Snipping } from '@raralabs/web-feedback';
import axios from 'axios';

import { useChakraToast } from './useChakraToast';

const snap = new Snipping({
  buttonLabel: 'Send Feedback',
  initialMarkMode: 'mark',
  fileName: 'feedbackScreenshot.png',
  /** other configs **/
});
export const useSnap = () => {
  const toast = useChakraToast();
  const router = useRouter();

  console.log(router);

  useEffect(() => {
    snap.init(async (data) => {
      const { image } = data;
      const formData = new FormData();

      if (!router.isReady) return;

      const query = `mutation ($file: Upload!) {createPublicFeedback(input: {appSlug: "MYRA", userEmail: "${router.query['td_user_email']}"}, imageInput: $file) {success data {userEmail description appSlugID { name }} errors {__typename ... on ValidationError { message field } ... on BadRequestError {  message } ... on NotFoundError { message } ... on InternalServerError { message } } } }`;

      formData.append(
        'operations',
        JSON.stringify({
          query,
          variables: {
            file: null,
          },
        })
      );
      formData.append(
        'map',
        JSON.stringify({
          '0': ['variables.file'],
        })
      );
      formData.append('0', image);

      const response = await axios({
        url: 'https://portal-backend.raralabs.live/query',
        method: 'post',
        data: formData,
      });
      console.log('response', response);

      if (response && response?.status === 200) {
        toast({
          title: 'Feedback sent successfully',
          description: 'your feedback was sent successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }

      if (response && response?.status !== 200) {
        toast({
          title: 'Something went wrong',
          description: 'your feedback couldnt be saved due to some error',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    });
  }, [router]);
  return;
};
