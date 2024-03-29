import { IoAdd } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, chakra, Tab, Tabs, Text } from '@chakra-ui/react';

import { Icon, IconButton } from '@myra-ui';

import { Id_Type, useGetNewIdMutation } from '@coop/cbs/data-access';
import { en, useTranslation } from '@coop/shared/utils';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.600',
    minHeight: '40px',
    maxHeight: '56px',
    fontSize: '14px',
    fontWeight: '500',

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
    _selected: { color: '#37474F', bg: 'gray.200', borderRadius: 'br2' },
  },
});

interface ITabColumnProps {
  list: {
    title: string;
    link: string;
    name?: string | undefined;
    addLinkId?: string;
    idType?: Id_Type;
    addLink?: string;
    modalOpen?: () => void;
  }[];
}

export const TabColumn = ({ list }: ITabColumnProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const newId = useGetNewIdMutation();

  // const currentIndex = useMemo(
  //   () => list.findIndex((link) => router.pathname.includes(link?.name ?? '')),
  //   [router.pathname]
  // );
  return (
    <Tabs variant="unstyled">
      {list.map((item) => {
        const isActive =
          router.asPath.split('/')[3] === item.link.split('/')[3] &&
          router.asPath.split('/')[2] === item.link.split('/')[2];

        return (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            key={item.link}
          >
            <Link href={item.link} style={{ width: '100%' }}>
              <TabCol
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
                <Text align="left" title={t[item.title as keyof typeof en]}>
                  {t[item.title as keyof typeof en] ?? item.title}
                </Text>
              </TabCol>
            </Link>
            {item.addLinkId && (
              // <Link href={item.addLink}>
              <IconButton
                aria-label="add-Button"
                size="md"
                height="40px"
                variant="ghost"
                icon={<Icon as={IoAdd} />}
                onClick={() =>
                  newId
                    .mutateAsync({ idType: item?.idType })
                    .then((res) => router.push(`${item.addLinkId}/add/${res?.newId}`))
                }
              />
              // </Link>
            )}
            {item.addLink && (
              // <Link href={item.addLink}>
              <IconButton
                aria-label="add-Button"
                size="md"
                height="40px"
                variant="ghost"
                icon={<Icon as={IoAdd} />}
                onClick={() => router.push(`${item.addLink}`)}
              />
            )}
            {item.modalOpen && (
              // <Link href={item.addLink}>
              <IconButton
                aria-label="add-Button"
                size="lg"
                variant="ghost"
                icon={<Icon as={IoAdd} />}
                onClick={item.modalOpen}
              />
            )}
          </Box>
        );
      })}
    </Tabs>
  );
};
