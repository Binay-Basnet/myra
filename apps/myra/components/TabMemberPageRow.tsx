import { chakra, Tab, Tabs, TabList } from '@chakra-ui/react';
const TabElement = chakra(Tab, {
  baseStyle: {
    color: '#636972',
    height: '50px',
    fontSize: '14px',
    fontWeight: '600',
    width: '80px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    _selected: {
      color: '#343C46',
      boxShadow: 'inset 0px -4px 0px #8CC63F',
    },
  },
});

const TabRow = ({ list }) => {
  return (
    <Tabs variant="unstyled">
      <TabList>
        {list.map((item, index) => {
          return <TabElement key={`${item}${index}`}>{item}</TabElement>;
        })}
      </TabList>
    </Tabs>
  );
};
export default TabRow;
