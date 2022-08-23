import { chakra, Tab, TabList, Tabs, TabsProps } from '@chakra-ui/react';

import { TextFields } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface ChakraTabProps extends Omit<TabsProps, 'children'> {
  onclick?: (data: string | number) => void;
  tabList?: string[];
  orientation?: 'vertical' | 'horizontal';
  tabWidth?: number;
  align?: 'start' | 'center' | 'end';
}

const TabElement = chakra(Tab, {
  baseStyle: {
    color: '#636972',
    height: '60px',
    py: 's24',
    px: 's16',
    boxSizing: 'border-box',
    borderBottom: '1px solid',
    borderBottomColor: 'border.layout',
    _selected: {
      color: 'gray.800',
      borderBottom: '2px solid',
      borderBottomColor: 'primary.500',
      boxShadow: 'none',
    },
  },
});

export function ChakraTab(props: ChakraTabProps) {
  const { tabList, orientation, onclick, tabWidth, ...rest } = props;
  return (
    <Tabs
      orientation={orientation || 'horizontal'}
      variant="unstyled"
      align={rest.align || 'start'}
      tabWidth={tabWidth || 'auto'}
      {...rest}
      color={'gray.600'}
    >
      <TabList>
        {tabList?.map((item, index) => (
          <TabElement
            onClick={() => onclick && onclick(item)}
            key={`${item}${index}`}
            width={tabWidth}
          >
            <TextFields variant="tabs">{item}</TextFields>
          </TabElement>
        ))}
      </TabList>
    </Tabs>
  );
}

export default ChakraTab;
