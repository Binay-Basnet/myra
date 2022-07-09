import { useReactTable } from '@tanstack/react-table';

import { IUseTableProps } from '../types/UseTable';

export const useTable = <T extends Record<string, unknown>>(
  props: IUseTableProps<T>
) => {
  return useReactTable<T>({
    defaultColumn: {
      meta: {
        width: '150px',
      },
    },
    ...props,
  });
};
