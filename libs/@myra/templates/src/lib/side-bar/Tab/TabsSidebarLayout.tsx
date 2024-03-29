import { IoAdd } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, chakra, Tab, Tabs, Text } from '@chakra-ui/react';

import { Icon, IconButton } from '@myra-ui/foundations';

import { AclKey, Can } from '@coop/cbs/utils';
import { checkMenuAccess, en, useTranslation } from '@coop/shared/utils';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.600',
    minHeight: 's40',
    maxHeight: 's56',
    fontSize: 'r1',
    fontWeight: '400',
    lineHeight: '1.25',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _hover: {
      bg: 'gray.200',
      borderRadius: 'br2',
    },
    _focus: {
      boxShadow: 'none',
    },
    _selected: { color: '#37474F', bg: 'gray.200', borderRadius: 'br2', fontWeight: '500' },
  },
});

interface ListItem {
  label: string;
  route: string;
  aclKey: AclKey;
  addRoute?: string;
  addAclKey?: AclKey;
  prod?: boolean;
  dev?: boolean;
}

interface ITabColumnProps {
  list: ListItem[];
}

export const TabColumn = ({ list }: ITabColumnProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <Tabs variant="enclosed" index={10000}>
      {list.map((item) => {
        const isActive = router.asPath.split('/')[3] === item.route.split('/')[3];

        return (
          checkMenuAccess(item) !== false && (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              key={item.aclKey}
            >
              <Can I="SHOW_IN_MENU" a={item.aclKey}>
                <Link href={item.route} style={{ width: '100%' }}>
                  <TabCol
                    data-testid={`${t[item.label as keyof typeof en] ?? item.label}-tab`}
                    sx={
                      isActive
                        ? {
                            color: '#37474F',
                            bg: 'gray.200',
                            borderRadius: 'br2',
                            fontWeight: '500',
                          }
                        : {
                            bg: 'transparent',
                            borderRadius: 'none',
                          }
                    }
                  >
                    <Text align="left">{t[item.label as keyof typeof en] ?? item.label}</Text>
                  </TabCol>
                </Link>
              </Can>

              {item.addRoute && (
                // <Link href={item.addLink}>
                <Can I="CREATE" a={item.addAclKey || item.aclKey}>
                  <IconButton
                    aria-label="add-Button"
                    size="md"
                    data-testid={`${t[item.label as keyof typeof en] ?? item.label}-addButton`}
                    height="40px"
                    variant="ghost"
                    icon={<Icon as={IoAdd} />}
                    onClick={() => router.push(`${item.addRoute}`)}
                  />
                </Can>
              )}
            </Box>
          )
        );
      })}
    </Tabs>
  );
};
