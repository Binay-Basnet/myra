import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';
import React from 'react';

const Organization = () => {
  return <div>Organization</div>;
};

export default Organization;

Organization.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
