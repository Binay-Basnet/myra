import { chakra, Tab, Tabs, Text } from '@chakra-ui/react';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: '#37474F',
    height: '48px',
    fontSize: '14px',
    fontWeight: '500',
    width: '216px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _selected: { color: '#37474F', bg: '#FFFFFF' },
  },
});
export const TabColumn = ({ list, t }) => {
  return (
    <Tabs variant="unstyled">
      {list.map((item, index) => {
        return (
          <TabCol key={`${item}${index}`}>
            <Text ml="16px">{t[item]}</Text>
          </TabCol>
        );
      })}
    </Tabs>
  );
};
