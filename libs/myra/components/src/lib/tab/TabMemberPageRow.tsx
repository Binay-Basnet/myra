import { chakra, Tab, TabList, Tabs } from '@chakra-ui/react';
import { en } from '@saccos/myra/locales';
import { useTranslation } from '@saccos/myra/util';
import { useRouter } from 'next/router';

const TabElement = chakra(Tab, {
  baseStyle: {
    color: '#636972',
    height: '50px',
    fontSize: '14px',
    fontWeight: '600',
    width: '100px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    _focus: {
      boxShadow: 'none',
    },
    _selected: {
      color: '#343C46',
      boxShadow: 'inset 0px -2px 0px #006837',
    },
  },
});

export const TabRow = ({
  list,
}: {
  list: {
    title: string;
    key: string;
  }[];
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const currentIndex = list.findIndex(
    (value) => router.query['objState'] === value.key
  );

  return (
    <Tabs variant="unstyled" index={currentIndex === -1 ? 0 : currentIndex}>
      <TabList>
        {list.map((item, index) => {
          return (
            <TabElement
              onClick={() =>
                router.push({
                  query: {
                    objState: item.key,
                  },
                })
              }
              key={`${item}${index}`}
            >
              {t[item.title as keyof typeof en]}
            </TabElement>
          );
        })}
      </TabList>
    </Tabs>
  );
};
