import { Tabs, TabList, Tab, TabsProps } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface ChakraTabProps extends TabsProps {
  tabList?: string[];
  orientation?: 'vertical' | 'horizontal';
  tabWidth?: number;
}

export function ChakraTab(props: ChakraTabProps) {
  const { tabList, orientation, tabWidth, ...rest } = props;
  return (
    <Tabs
      orientation={orientation || 'horizontal'}
      variant="unstyled"
      {...rest}
    >
      <TabList>
        {tabList?.map((item, index) => (
          <Tab
            key={`${item}${index}`}
            fontSize={14}
            width={tabWidth}
            _selected={{ background: 'white', border: 'none' }}
          >
            {item}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}

export default ChakraTab;
