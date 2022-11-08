import rhToast from 'react-hot-toast';

export const copyToClipboard = (text: string | undefined | null) => {
  if (!text) {
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    rhToast.success('Copied to clipboard');
  });
};
