import { HStack } from '@chakra-ui/react';

import { Box, Text } from '@myra-ui';

const cellWidthObject: Record<string, string> = {
  lg: '50%',
  md: '20%',
  sm: '15%',
};

const flexBasisFunc = (width: string) => {
  if (width === 'auto') {
    return '100%';
  }
  if (width) {
    return cellWidthObject[width];
  }
  return '30%';
};

export type TableOverviewColumnType = {
  label: string;
  width: 'auto' | 'lg' | 'md' | 'sm';
  isNumeric: boolean;
};

interface ITableOverviewProps {
  columns: TableOverviewColumnType[];
}

export const TableOverview = ({ columns }: ITableOverviewProps) => (
  <HStack
    bg="background.500"
    borderRadius="br2"
    border="1px"
    borderColor="border.layout"
    display="flex"
    alignItems="center"
    h="s36"
  >
    {columns.map((col) => (
      <Box
        px="s8"
        py="s4"
        h="inherit"
        w="100%"
        borderRight="1px"
        borderColor="border.layout"
        flexGrow={col.width === 'auto' ? 1 : 0}
        flexBasis={flexBasisFunc(col.width)}
        display="flex"
        justifyContent={col.isNumeric ? 'flex-end' : 'flex-start'}
      >
        <Text fontSize="r1" fontWeight={600} lineHeight={2} color="gray.800">
          {col.label}
        </Text>
      </Box>
    ))}
  </HStack>
);
