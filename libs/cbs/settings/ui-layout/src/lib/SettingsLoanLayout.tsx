import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { featureCode, useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'settingsLoanGeneral',
    to: ROUTES.SETTINGS_GENERAL_LOAN,
  },
  // {
  //   title: 'settingsInsuranceGeneral',
  //   to: '/settings/general/loan/insurance',
  // },
  {
    title: 'settingsProductTypeGeneral',
    to: ROUTES.SETTINGS_GENERAL_LOAN_PRODUCT_TYPE,
  },
  {
    title: 'settingsSideBarValuator',
    to: ROUTES.SETTINGS_GENERAL_LOAN_VALUATOR,
  },
  {
    title: 'Organization Rate',
    to: ROUTES.SETTINGS_GENERAL_LOAN_ORGANIZATION_RATE,
  },
];

interface ISettingsLoanLayout {
  children: React.ReactNode;
}

export const SettingsLoanLayout = ({ children }: ISettingsLoanLayout) => {
  // const route = useRouter();
  const { t } = useTranslation();
  // const loanSettings = useAppSelector((state) => state.loanSettings);
  // const { mutateAsync } = useSetLoanGeneralSettingsMutation();
  // const saveButtonHandler = () => {
  //   if (route.pathname.includes('loan-general')) {
  //     mutateAsync({
  //       emi: loanSettings?.general?.emi,
  //       epi: loanSettings?.general?.epi,
  //       flat: loanSettings?.general?.flat,
  //     });
  //   }
  //   if (route.pathname.includes('insurance')) {
  //     console.log('hello');
  //   }
  // };

  return (
    <>
      <SettingsPageHeader
        // buttonLabel={t['saveChanges']}
        // buttonHandler={saveButtonHandler}
        heading={`${t['settingsLoan']} - ${featureCode?.generalLoanSetting}`}
      />
      <Box
        w="250px"
        px="s8"
        position="fixed"
        py="s16"
        borderRight="1px"
        borderRightColor="border.layout"
        minHeight="100vh"
      >
        <SettingsInnerVerticalMenu tablinks={tabList} />
      </Box>
      <Box ml="250px">{children}</Box>
    </>
  );
};
