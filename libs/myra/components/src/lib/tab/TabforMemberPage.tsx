import { chakra, Tab, Tabs, Text } from '@chakra-ui/react';
import { en } from '@coop/myra/locales';
import { useTranslation } from '@coop/shared/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
    _focus: {
      boxShadow: 'none',
    },
    _selected: { color: '#37474F', bg: 'gray.200' },
  },
});

interface ITabColumnProps {
  list: {
    title: string;
    link: string;
  }[];
}

export const TabColumn = ({ list }: ITabColumnProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <Tabs
      variant="unstyled"
      index={list.findIndex((value) => router.asPath.includes(value.link)) ?? 0}
    >
      {list.map((item, index) => {
        return (
          <Link href={item.link} key={`${item}${index}`}>
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
        );
      })}
    </Tabs>
  );
};
