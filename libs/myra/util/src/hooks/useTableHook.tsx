import { useTable, useSortBy, useRowSelect } from 'react-table';

export const useTableHook = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data },
      useSortBy,
      useRowSelect
      //      (hooks) => {
      //   hooks.visibleColumns.push((column) => [
      //     {
      //       id: 'selection',
      //       Header: ({ getToggleAllRowsSelectedProps }) => (
      //         <div>
      //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
      //         </div>
      //       ),
      //       Cell: ({ row }) => (
      //         <div>
      //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
      //         </div>
      //       ),
      //     },
      //     ...column,
      //   ]);
      // }
    );
  return {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  };
};
