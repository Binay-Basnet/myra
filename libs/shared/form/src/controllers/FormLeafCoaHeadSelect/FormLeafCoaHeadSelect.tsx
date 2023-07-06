import { useState } from 'react';
import debounce from 'lodash/debounce';

import { SelectProps } from '@myra-ui';

import { useListLeafCoaHeadsQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

import FormSelect from '../FormSelect/FormSelect';

interface IFormLeafCoaHeadSelectProps extends SelectProps {
  name: string;
  label?: string;
}

export const FormLeafCoaHeadSelect = ({ name, label, ...rest }: IFormLeafCoaHeadSelectProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: leafCoaHeadsListData, isFetching } = useListLeafCoaHeadsQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'accountCode',
      },
    },
    filter: {
      query: searchQuery,
    },
  });

  const selectOptions =
    leafCoaHeadsListData?.settings?.chartsOfAccount?.listLeafCoaHeads?.edges?.map((head) => ({
      label: `${head?.node?.accountCode} - ${head?.node?.Name}`,
      value: head?.node?.accountCode as string,
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
