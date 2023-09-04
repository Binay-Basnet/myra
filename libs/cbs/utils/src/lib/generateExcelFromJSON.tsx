import { utils, writeFileXLSX } from 'xlsx';

export const generateExcelFromJSON = (json: Record<string, string>[], title: string) => {
  const wb = utils.book_new();

  const ws = utils.json_to_sheet(json);

  utils.book_append_sheet(wb, ws, title);

  return writeFileXLSX(wb, `${title} - ${new Date().toISOString()}.xlsx`);
};
