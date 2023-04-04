import { useState } from 'react';
import debounce from 'lodash/debounce';

import { useExternalLoanListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

interface IFormExternalLoanSelectProps {
  name: string;
  label: string;
}

type OptionType = { label: string; value: string };

export const FormExternalLoanSelect = ({ name, label }: IFormExternalLoanSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: entryListQueryData, isFetching } = useExternalLoanListQuery(
    {
      pagination: {
        ...getPaginationQuery(),
        first: 20,
      },
      filter: {
        query: searchTerm,
      },
    },
    { staleTime: 0 }
  );

  const accountList = entryListQueryData?.accounting?.externalLoan?.loan?.list?.edges ?? [];

  const accountOptions = accountList?.reduce(
    (prevVal, curVal) => [
      ...prevVal,
      {
        label: `${curVal?.node?.loanName} [ID:${curVal?.node?.id}]`,
        value: curVal?.node?.id as string,
      },
    ],
    [] as OptionType[]
  );

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      onInputChange={debounce((id) => {
        // if (id) {
        setSearchTerm(id);
        // }
      }, 800)}
      options={accountOptions}
    />
  );
};

export default FormExternalLoanSelect;
