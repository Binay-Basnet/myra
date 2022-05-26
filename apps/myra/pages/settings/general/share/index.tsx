import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';
import React from 'react';

const Share = () => {
  return <div>Share</div>;
};

export default Share;

Share.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
