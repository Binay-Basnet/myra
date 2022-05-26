import { chakra, Tab, TabList, Tabs } from '@chakra-ui/react';

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
    _selected: {
      color: '#343C46',
      boxShadow: 'inset 0px -4px 0px #8CC63F',
    },
  },
});

export const TabRow = ({ list, t }: any) => {
  return (
    <Tabs variant="unstyled">
      <TabList>
        {list.map((item: any, index: number) => {
          return <TabElement key={`${item}${index}`}>{t[item]}</TabElement>;
        })}
      </TabList>
    </Tabs>
  );
};
