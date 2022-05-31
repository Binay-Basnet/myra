import { FilterValue, IdType, Row } from 'react-table';

export function amountFilter<T extends Record<string, unknown>>(
  rows: Array<Row<T>>,
  ids: Array<IdType<T>>,
  filterValue: FilterValue
): Array<Row<T>> {
  if (filterValue.type === 'amt_between') {
    let [min, max] = filterValue?.value || [];

    min = typeof min === 'number' ? min : -Infinity;
    max = typeof max === 'number' ? max : Infinity;

    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
    }

    return rows.filter((row) => {
      return ids.some((id) => {
        const rowValue = row.values[id];
        return rowValue >= min && rowValue <= max;
      });
    });
  }

  return rows.filter((row) => {
    return ids.some((id) => {
      const rowValue = row.values[id];

      if (filterValue.type === 'amt_less') {
        return rowValue < filterValue.value;
      } else if (filterValue.type === 'amt_more') {
        return rowValue > filterValue.value;
      } else if (filterValue.type === 'amt_equal') {
        return rowValue === filterValue.value;
      } else {
        return true;
      }
    });
  });
}

amountFilter.autoRemove = (val: boolean) => !val;
