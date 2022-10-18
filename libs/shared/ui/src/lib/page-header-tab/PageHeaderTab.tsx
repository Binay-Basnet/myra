import { useRouter } from 'next/router';
import { chakra, Tab, TabList, Tabs } from '@chakra-ui/react';

import { en, useTranslation } from '@coop/shared/utils';

const TabElement = chakra(Tab, {
  baseStyle: {
    color: 'gray.600',
    height: '60px',
    fontSize: '14px',
    fontWeight: '600',
    // width: '100px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    _focus: {
      boxShadow: 'none',
    },
    _selected: {
      color: '#343C46',
      boxShadow: 'inset 0px -3px 0px -1px var(--myra-colors-primary-500)',
    },
  },
});

export const PageHeaderTab = ({
  list,
}: {
  list: {
    title: string;
    key: string;
  }[];
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const currentIndex = list.findIndex((value) => router.query['objState'] === value.key);

  return (
    <Tabs variant="unstyled" index={currentIndex === -1 ? 0 : currentIndex}>
      <TabList>
        {list.map((item) => (
          <TabElement
            onClick={() =>
              router.push({
                query: {
                  objState: item.key,
                },
              })
            }
            key={`${item.key}`}
          >
            {t[item.title as keyof typeof en]}
          </TabElement>
        ))}
      </TabList>
    </Tabs>
  );
};

export default PageHeaderTab;
