import { Tabs, TabList, Tab } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface ChakraTabProps {
  tabList?: string[];
  orientation?: 'vertical' | 'horizontal';
  tabWidth?: number;
}

export function ChakraTab(props: ChakraTabProps) {
  const { tabList, orientation, tabWidth } = props;
  return (
    <Tabs orientation={orientation || 'horizontal'} variant="unstyled">
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
