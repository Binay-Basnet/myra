import { Box } from '@chakra-ui/react';

import { TableCheckbox } from '../components';
import { Column } from '../types/Table';

export const getCheckBoxColumn = <
  T extends Record<string, unknown>
>(): Column<T> => ({
  id: '_selector',
  header: ({ table }) => (
    <Box p={1}>
      <TableCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    </Box>
  ),
  cell: ({ row }) => (
    <Box p={1}>
      <TableCheckbox
        {...{
          checked: row.getIsSelected(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    </Box>
  ),
  meta: {
    width: '30px',
  },
});
