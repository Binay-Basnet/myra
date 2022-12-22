import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { CgLoadbarDoc } from 'react-icons/cg';
import Link from 'next/link';
import { useRouter } from 'next/router';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AddButtonList, SettingsButton } from '@myra-ui/components';
import { Box, Divider, Text } from '@myra-ui/foundations';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Id_Type, useGetNewIdMutation } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import { TabColumn } from './Tab/TabsSidebarLayout';
import { PopOverComponentForButtonList } from '../others/button-list-popover/ButtonListPopover';

type AddButtonListProps = {
  title: string;
  link?: string;
  linkId?: string;
};

interface ITabColumnProps {
  title: string;
  link: string;
  name?: string | undefined;
  addLinkId?: string;
  idType?: Id_Type;
  addLink?: string;
  modalOpen?: () => void;
}

interface ISettingsButtonProps {
  label: string;
  navigate: string;
}

interface ISideBarProps {
  applicationName: string;
  featureName: string;
  featureLink: string;
  hasActionURL?: boolean;

  idType?: Id_Type;
  mainButtonLabel?: string;
  addButtonList?: AddButtonListProps[];
  tabColumns: ITabColumnProps[];
  settingButtons?: ISettingsButtonProps[];
  reportButtons?: ISettingsButtonProps[];
  children?: React.ReactNode;
}

export const Sidebar = ({
  children,
  applicationName,
  featureName,
  hasActionURL,
  mainButtonLabel,
  addButtonList,
  reportButtons,
  settingButtons,
  tabColumns,
  featureLink,
  idType,
}: ISideBarProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const newId = useGetNewIdMutation({});

  return (
    <Box display="flex">
      <Box
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        width="260px"
        height="calc(100vh - 110px)"
        overflowY="auto"
        position="fixed"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          py="s16"
          pb="s8"
          justifyContent="center"
          gap="s2"
          px="s16"
        >
          <Text fontSize="s2" fontWeight="600" color="primary.500">
            {applicationName}
          </Text>

          <Link href={featureLink}>
            <Text lineHeight="125%" fontSize="l1" fontWeight="600" color="gray.800">
              {featureName}
            </Text>
          </Link>
        </Box>

        <Box p="s16">
          {mainButtonLabel && (
            <PopOverComponentForButtonList buttonLabel={mainButtonLabel}>
              {addButtonList?.map((item) => (
                <Box key={item?.title}>
                  <AddButtonList
                    label={t[item.title] || item?.title}
                    onClick={() => {
                      if (item.linkId && !hasActionURL) {
                        newId
                          .mutateAsync({ idType: idType ?? null })
                          .then((res) => router.push(`${item.linkId}/${res?.newId}`));
                      }
                      if (item.linkId && hasActionURL) {
                        newId
                          .mutateAsync({ idType: idType ?? null })
                          .then((res) => router.push(`${item.linkId}/new/${res?.newId}`));
                      } else {
                        item.link && router.push(item.link);
                      }
                    }}
                  />
                </Box>
              ))}
            </PopOverComponentForButtonList>
          )}

          <Divider my="s16" />
          <TabColumn list={tabColumns} />
          <Divider my="s16" />
          {settingButtons?.map((item) => (
            <SettingsButton
              icon={AiOutlineSetting}
              buttonLabel={t[item?.label] || item?.label}
              onClick={() => router.push(item?.navigate)}
            />
          ))}
          {reportButtons?.map((item) => (
            <SettingsButton
              onClick={() => item?.navigate && router.push(item?.navigate)}
              icon={CgLoadbarDoc}
              buttonLabel={t[item?.label] || item?.label}
            />
          ))}
        </Box>
      </Box>
      <Box w="100%" ml="260px">
        <Box minHeight="calc(100vh - 110px)" width="100%" bg="white">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
