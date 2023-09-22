import { useState } from 'react';
import debounce from 'lodash/debounce';

import { SelectProps } from '@myra-ui';

import { useGetLedgerListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

import FormSelect from '../FormSelect/FormSelect';

interface IFormCOALedgerSelectProps extends SelectProps {
  name: string;
  label?: string;
  coaHead: string[];
  branchId: string[];
}

export const FormCOALedgerSelect = ({
  name,
  label,
  coaHead,
  branchId,
  ...rest
}: IFormCOALedgerSelectProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: ledgerListData, isFetching } = useGetLedgerListQuery({
    id: coaHead,
    branchId,
    pagination: getPaginationQuery(),
    filter: {
      query: searchQuery,
    },
  });

  const selectOptions =
    ledgerListData?.settings?.chartsOfAccount?.coaLedgerList?.edges?.map((head) => ({
      label: head?.node?.ledgerName as string,
      value: head?.node?.accountCode as string,
    })) ?? [];

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      onInputChange={debounce((term, searchEvent) => {
        if (searchEvent.action === 'input-change') {
          setSearchQuery(term);
        }
      }, 800)}
      options={selectOptions}
      {...rest}
    />
  );
};
