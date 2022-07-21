import { useEffect } from 'react';
import { Snipping } from '@raralabs/web-feedback';
import axios from 'axios';

const snap = new Snipping({
  buttonLabel: 'Send Feedback',
  initialMarkMode: 'mark',
  fileName: 'feedbackScreenshot.png',
  /** other configs **/
});
export const useSnap = () => {
  useEffect(() => {
    snap.init(async (data) => {
      const { image } = data;
      const formData = new FormData();

      const query = `mutation ($file: Upload!) {createPublicFeedback(input: {appSlug: "MYRA", userEmail: "pk@pk.com"}, imageInput: $file) {success data {userEmail description appSlugID { name }} errors {__typename ... on ValidationError { message field } ... on BadRequestError {  message } ... on NotFoundError { message } ... on InternalServerError { message } } } }`;

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

      console.log(response);
    });
  }, []);
  return;
};
