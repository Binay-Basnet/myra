import { Tabs, TabList, Tab, TabsProps, Box, chakra } from '@chakra-ui/react';
import { TextFields } from '@saccos/myra/ui';
/* eslint-disable-next-line */
export interface ChakraTabProps extends TabsProps {
  tabList?: string[];
  orientation?: 'vertical' | 'horizontal';
  tabWidth?: number;
  align?: 'start' | 'center' | 'end';
}
const TabElement = chakra(Tab, {
  baseStyle: {
    color: '#636972',
    height: '50px',
    pb: '0px',
    pl: 's16',
    pr: 's24',
    _selected: {
      color: '#343C46',
      boxShadow: 'inset 0px -2px 0px #8CC63F',
    },
  },
});

export function ChakraTab(props: ChakraTabProps) {
  const { tabList, orientation, tabWidth, ...rest } = props;
  return (
    // <Box w="fit-content">
    <Tabs
      orientation={orientation || 'horizontal'}
      variant="unstyled"
      align={rest.align || 'start'}
      bg="gray.0"
      tabWidth={tabWidth || 'auto'}
      {...rest}
      color={'gray.600'}
      borderBottomColor={'gray.0'}
    >
      <TabList>
        {tabList?.map((item, index) => (
          <TabElement key={`${item}${index}`} width={tabWidth}>
            <TextFields variant="tabs">{item}</TextFields>
          </TabElement>
        ))}
      </TabList>
    </Tabs>
    // </Box>
  );
}

export default ChakraTab;
