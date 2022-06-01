import {chakra, Tab, Tabs, Text} from '@chakra-ui/react';
import {en} from '@saccos/myra/locales';
import {useTranslation} from '@saccos/myra/util';
import Link from 'next/link';
import {useRouter} from 'next/router';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: '#37474F',
    height: '48px',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _selected: {color: '#37474F', bg: '#FFFFFF'},
  },
});

interface ITabColumnProps {
  list: {
    title: string;
    link: string;
  }[];
}

export const TabColumn = ({list}: ITabColumnProps) => {
  const {t} = useTranslation();

  const router = useRouter();

  return (
    <Tabs
      variant="unstyled"
      pl="16px"
      index={list.findIndex((value) => router.asPath === value.link) ?? 0}
    >
      {list.map((item, index) => {
        return (
          <Link href={item.link}>
            <TabCol key={`${item}${index}`}>
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
