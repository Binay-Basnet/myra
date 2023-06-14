import { useState } from 'react';
import { debounce } from 'lodash';

import { SelectProps } from '@myra-ui';

import { useLedgerTagsListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

import FormSelect from '../FormSelect/FormSelect';

interface IFormLedgerTagSelectProps extends SelectProps {
  name: string;
  label?: string;
}

export const FormLedgerTagSelect = ({ name, label, ...rest }: IFormLedgerTagSelectProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: ledgerTagsListData, isFetching } = useLedgerTagsListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: 20,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
    filter: {
      query: searchQuery,
    },
  });

  const selectOptions =
    ledgerTagsListData?.settings?.chartsOfAccount?.tag?.list?.edges?.map((tag) => ({
      label: `${tag?.node?.name}` as string,
      value: tag?.node?.id as string,
    })) ?? [];

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      onInputChange={debounce((term) => {
        if (term) {
          setSearchQuery(term);
        }
      }, 800)}
      options={selectOptions}
      {...rest}
    />
  );
};
