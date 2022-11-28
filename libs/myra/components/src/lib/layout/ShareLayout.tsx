import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { CgLoadbarDoc } from 'react-icons/cg';
import { useRouter } from 'next/router';

import {
  AddButtonList,
  Box,
  Divider,
  PopOverComponentForButtonList,
  SettingsButton,
  Text,
} from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { TabColumn } from '../tab/TabforMemberPage';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const shareColumns = [
  {
    title: 'shareBalance',
    link: '/share/balance',
  },
  {
    title: 'shareRegister',
    link: '/share/register',
  },
];

const settingsColumn = [
  {
    label: 'shareLayoutShareSettings',
    navigate: '/settings/general/share',
  },
  {
    label: 'shareLayoutShareDistribution',
    navigate: '/share/balance',
  },
];

const reportColumn = [
  {
    label: 'shareLayoutRegisterReport',
  },
  {
    label: 'shareLayoutStateReport',
    navigate: '/reports/cbs/share/statement/new',
  },
  {
    label: 'shareLayoutTransactionReport',
  },
];

const addButtoncolumns = [
  {
    title: 'shareLayoutSharePurchase',
    link: '/share/share-issue',
  },
  {
    title: 'shareLayoutShareReturn',
    link: '/share/share-return',
  },
];

export const SharePageLayout = ({ children }: IMemberPageLayout) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed" zIndex={1}>
        <Box height="50px" alignItems="center" display="flex" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="SemiBold" color="gray.800">
            {t['shareLayout']}
          </Text>
        </Box>
        <Box p="s16">
          <PopOverComponentForButtonList buttonLabel="shareLayoutNewShare">
            {addButtoncolumns.map((item) => (
              <Box key={item?.title}>
                <AddButtonList label={t[item.title]} onClick={() => router.push(`${item.link}`)} />
              </Box>
            ))}
          </PopOverComponentForButtonList>

          <Divider my="s16" />
          <TabColumn list={shareColumns} />
          <Divider my="s16" />
          {settingsColumn.map((item) => (
            <SettingsButton
              icon={AiOutlineSetting}
              buttonLabel={t[item?.label]}
              onClick={() => router.push(item?.navigate)}
            />
          ))}
          {reportColumn.map((item) => (
            <SettingsButton
              onClick={() => item?.navigate && router.push(item?.navigate)}
              icon={CgLoadbarDoc}
              buttonLabel={t[item?.label]}
            />
          ))}
        </Box>
      </Box>
      <Box w="100%" ml="260px">
        <Box bg="white" minHeight="calc(100vh - 110px)" width="100%">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
