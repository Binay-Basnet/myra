import { RefObject } from 'react';
import { utils, writeFileXLSX } from 'xlsx';

export const exportVisibleTableToExcel = (
  fileName: string,
  tableRef?: RefObject<HTMLTableElement>
) => {
  if (tableRef) {
    const table = tableRef?.current;

    const wb = utils.book_new();

    const ws = utils.table_to_sheet(table);

    utils.book_append_sheet(wb, ws, table?.dataset?.['tableTitle']);

    return writeFileXLSX(wb, `${fileName} - ${new Date().toISOString()}.xlsx`);
  }

  const tables = document?.getElementsByTagName('TABLE');

  const wb = utils.book_new();

  Array.prototype.slice.call(tables)?.forEach((table) => {
    const ws = utils.table_to_sheet(table);

    // const tableHeads = tables[index]?.querySelectorAll('th > div');

    // const columnIndexToHide: number[] = [];

    // Array.prototype.slice.call(tableHeads)?.forEach((th, thIndex) => {
    //   if (tableHeads[thIndex]?.textContent === '') {
    //     columnIndexToHide.push(thIndex);
    //   }
    // });

    // ws['!cols'] = [];

    // ws['!cols'] = [];

    // Array.prototype.slice.call(tableHeads)?.forEach((th, thIndex) => {
    //   if (tableHeads[thIndex]?.textContent === '') {
    //     ws['!cols'][thIndex] = { hidden: true };
    // const columnIndexToHide: number[] = [];

    // Array.prototype.slice.call(tableHeads)?.forEach((th, thIndex) => {
    //   if (tableHeads[thIndex]?.textContent === '') {
    //     columnIndexToHide.push(thIndex);
    //   }
    // });

    // ws['!cols'] = [];

    // columnIndexToHide.forEach((hideIndex) => {
    //   if (ws['cols']) {
    //     ws['!cols'][hideIndex] = { hidden: true };
    //   }
    // });

    utils.book_append_sheet(wb, ws, table.dataset?.tableTitle);
  });

  return writeFileXLSX(wb, `${fileName} - ${new Date().toISOString()}.xlsx`);
};
