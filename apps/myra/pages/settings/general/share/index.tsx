import React from 'react';

import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';

const Share = () => {
  return <div>Share</div>;
};

export default Share;

Share.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
