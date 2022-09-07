import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';

import {
  AddButtonList,
  Box,
  Button,
  Divider,
  Icon,
  PopOverComponentForButtonList,
  Text,
} from '@coop/shared/ui';
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
      <Box width="275px" p="s24" flexShrink={0} position="fixed" zIndex={1}>
        <Text fontSize="l1" fontWeight="SemiBold" color="gray.800">
          {t['shareLayout']}
        </Text>
        <Divider my="s16" />

        <PopOverComponentForButtonList buttonLabel="shareLayoutNewShare">
          {addButtoncolumns.map((item, index) => {
            return (
              <Box key={`${item}${index}`}>
                <AddButtonList
                  label={t[item.title]}
                  onClick={() => router.push(`${item.link}`)}
                />
              </Box>
            );
          })}
        </PopOverComponentForButtonList>

        <Divider my="s16" />
        <TabColumn list={shareColumns} />
        <Divider my="s16" />
        <Button
          onClick={() => router.push('/settings/general/share')}
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={
            <Icon as={AiOutlineSetting} size="md" color="primary.500" />
          }
        >
          {t['shareLayoutShareSettings']}
        </Button>
      </Box>
      <Box
        width="calc(100% - 275px)"
        overflowX="hidden"
        position="relative"
        left="275px"
      >
        <Box bg="white" minHeight="100vh">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
