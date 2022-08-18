import { IoAdd } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, chakra, Tab, Tabs, Text } from '@chakra-ui/react';

import { useGetNewIdMutation } from '@coop/cbs/data-access';
import { Icon, IconButton } from '@coop/shared/ui';
import { en, useTranslation } from '@coop/shared/utils';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.600',
    height: '48px',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _hover: {
      bg: 'highlight.500',
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
    <Tabs
      variant="unstyled"
      index={list.findIndex((value) => router.asPath.includes(value.link)) ?? 0}
    >
      {list.map((item, index) => {
        return (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            key={`${item}${index}`}
          >
            <Link href={item.link}>
              <TabCol>
                <Text
                  noOfLines={1}
                  align="left"
                  title={t[item.title as keyof typeof en]}
                >
                  {t[item.title as keyof typeof en]}
                </Text>
              </TabCol>
            </Link>
            {item.addLinkId && (
              // <Link href={item.addLink}>
              <IconButton
                aria-label="add-Button"
                size="lg"
                variant={'ghost'}
                icon={<Icon as={IoAdd} />}
                onClick={() =>
                  newId
                    .mutateAsync({})
                    .then((res) =>
                      router.push(`${item.addLinkId}/add/${res?.newId}`)
                    )
                }
              />
              // </Link>
            )}
            {item.addLink && (
              // <Link href={item.addLink}>
              <IconButton
                aria-label="add-Button"
                size="lg"
                variant={'ghost'}
                icon={<Icon as={IoAdd} />}
                onClick={() => router.push(`${item.addLink}`)}
              />
            )}
            {item.modalOpen && (
              // <Link href={item.addLink}>
              <IconButton
                aria-label="add-Button"
                size="lg"
                variant={'ghost'}
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
