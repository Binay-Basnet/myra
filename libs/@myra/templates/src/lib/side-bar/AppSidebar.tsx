import { AiOutlineSetting } from 'react-icons/ai';
import { CgLoadbarDoc } from 'react-icons/cg';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AddButtonList, SettingsButton } from '@myra-ui/components';
import { Box, Divider, Text } from '@myra-ui/foundations';
import { PopOverComponentForButtonList, Scrollable } from '@myra-ui/templates';

import { Id_Type, useGetNewIdMutation } from '@coop/cbs/data-access';
import {
  AclKey,
  APP_NAVS,
  Can,
  MenuType,
  ModuleType,
  RouteValue,
  useMenuLink,
  useMultipleAbility,
} from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

import { TabColumn } from './Tab/TabsSidebarLayout';

interface ISidebarProps {
  module?: ModuleType;
  menu: MenuType;
  forms?: {
    label: string;
    aclKey: AclKey;
    route: RouteValue;
    idType?: Id_Type;
  }[];
}

export const AppSidebar = ({ module = 'CBS', menu, forms }: ISidebarProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { mutateAsync } = useGetNewIdMutation();

  const appNav = APP_NAVS[module];

  const sidebarForms = forms || appNav.menus[menu]?.forms;
  const isNewButtonAllowed = useMultipleAbility(
    sidebarForms?.map((form) => form.aclKey) || [],
    'CREATE'
  );

  const { link } = useMenuLink(menu);

  return (
    <Box width="260px" height="calc(100vh - 110px)" flexShrink={0}>
      <Scrollable>
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
            {appNav.label}
          </Text>

          <Link href={link}>
            <Text
              lineHeight="125%"
              textTransform="capitalize"
              fontSize="l1"
              fontWeight="600"
              color="gray.800"
            >
              {menu.replace(/_/g, ' ').toLowerCase()}
            </Text>
          </Link>
        </Box>

        <Box p="s16">
          {sidebarForms && isNewButtonAllowed && (
            <>
              <PopOverComponentForButtonList buttonLabel={t['new']}>
                {sidebarForms.map((item) => (
                  <Can I="CREATE" a={item.aclKey} key={item?.label}>
                    <Box>
                      <AddButtonList
                        label={t[item.label] || item?.label}
                        onClick={() => {
                          if (item.idType) {
                            mutateAsync({ idType: item?.idType ?? null }).then((res) =>
                              router.push(`${item.route}/${res?.newId}`)
                            );
                          } else {
                            router.push(item.route);
                          }
                        }}
                      />
                    </Box>
                  </Can>
                ))}
              </PopOverComponentForButtonList>

              <Divider my="s16" />
            </>
          )}

          <TabColumn list={appNav.menus[menu]?.pages || []} />
          <Divider my="s16" />

          {appNav.menus[menu]?.settingPages?.map((item) => (
            <Can I="SHOW_IN_MENU" a={item.aclKey}>
              <SettingsButton
                icon={AiOutlineSetting}
                buttonLabel={t[item?.label] || item?.label}
                onClick={() => router.push(item?.route)}
              />
            </Can>
          ))}
          {appNav.menus[menu]?.reportPages?.map((item) => (
            <Can I="SHOW_IN_MENU" a={item.aclKey}>
              <SettingsButton
                onClick={() => item?.route && router.push(item?.route)}
                icon={CgLoadbarDoc}
                buttonLabel={t[item?.label] || item?.label}
              />
            </Can>
          ))}
        </Box>
      </Scrollable>
    </Box>
  );
};
