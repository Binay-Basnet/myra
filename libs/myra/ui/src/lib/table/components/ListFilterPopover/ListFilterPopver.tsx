import React from 'react';
import { IconButton, Popover } from '@chakra-ui/react';
import {
  PopoverContent,
  PopoverTrigger,
} from 'libs/myra/ui/src/lib/popover/Popover';
import { BiFilter } from 'react-icons/bi';
import { TableListFilterContent } from 'libs/myra/ui/src/lib/table-list-filter/TableListFilter';
import { HeaderGroup } from 'libs/myra/ui/src/lib/table/types';

interface IListFilterPopoverProps<T extends Record<string, unknown>> {
  column: HeaderGroup<T>;
  uniqueOptions?: string[];
}

export const ListFilterPopover = <T extends Record<string, unknown>>({
  column: { id, setFilter, filterValue, preFilteredRows },
  uniqueOptions,
}: IListFilterPopoverProps<T>) => {
  const initialFocusRef = React.useRef<HTMLInputElement | null>(null);

  const uniqueOptionsFromColumn = React.useMemo(() => {
    const options = new Set<string>();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...Array.from(options.values())];
  }, [id, preFilteredRows]);

  return (
    <Popover isLazy placement="bottom-start" colorScheme="primary">
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            {filterValue ? (
              <IconButton
                aria-label="open"
                _focus={{
                  background: 'background.500',
                  color: 'primary.500',
                }}
                bg="background.500"
                color="primary.500"
                variant="unstyled"
                px={1}
                py={1}
                height="auto"
                minWidth={0}
                icon={<BiFilter />}
              />
            ) : (
              <IconButton
                aria-label="open"
                _focus={{
                  background: 'transparent',
                  color: 'black',
                }}
                variant="unstyled"
                px={0}
                py={0}
                height="auto"
                minWidth={0}
                icon={<BiFilter />}
              />
            )}
          </PopoverTrigger>
          <PopoverContent _focus={{ boxShadow: 'E2' }}>
            <TableListFilterContent
              onClose={onClose}
              data={uniqueOptions ?? uniqueOptionsFromColumn}
              ref={initialFocusRef}
              filterValue={filterValue}
              setFilter={setFilter}
            />
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default ListFilterPopover;
