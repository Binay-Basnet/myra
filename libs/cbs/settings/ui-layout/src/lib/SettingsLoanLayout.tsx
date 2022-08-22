import React from 'react';

import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'settingsLoanGeneral',
    to: '/settings/general/loan/loan-general',
  },
  {
    title: 'settingsInsuranceGeneral',
    to: '/settings/general/loan/insurance',
  },
  {
    title: 'settingsProductTypeGeneral',
    to: '/settings/general/loan/product-type',
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
        heading={t['settingsLoan']}
      />
      <Box
        w="300px"
        px="s8"
        position="fixed"
        py="s16"
        borderRight={'1px'}
        borderRightColor="border.layout"
        minHeight="100vh"
      >
        <SettingsInnerVerticalMenu tablinks={tabList} />
      </Box>
      <Box ml="300px">{children}</Box>
    </>
  );
};
