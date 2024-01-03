import React, { useMemo } from 'react';

import { Box } from '@myra-ui';

import { useListUtilityServiceTypeQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

interface ISettingsLoanLayout {
  children: React.ReactNode;
}

export const SettingsAlternativeChannelUtilityPaymentLayout = ({
  children,
}: ISettingsLoanLayout) => {
  const { t } = useTranslation();

  const { data: utilityServicesData } = useListUtilityServiceTypeQuery({
    filter: { isActive: true },
  });

  const tabList = useMemo(() => {
    const temp: { title: string; to: string }[] = [
      {
        title: 'General',
        to: ROUTES.SETTINGS_APPLICATION_ALTERNATIVE_CHANNEL_UTILITY_PAYMENT_GENERAL,
      },
    ];

    const services = utilityServicesData?.settings?.ebanking?.utility?.listServiceType?.data;

    services?.forEach((service) => {
      temp.push({
        title: service?.name as string,
        to: `/settings/general/utility-payment/${service?.slug}`,
      });
    });

    return temp;
  }, [utilityServicesData]);

  return (
    <>
      <SettingsPageHeader heading={`${t['settingsAlternativeChannel']}`} />
      <Box
        w="250px"
        px="s8"
        position="fixed"
        bg="white"
        zIndex={15}
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
