import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import debounce from 'lodash/debounce';

import { InvestmentType, useGetInvestmentAccountsListDataQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getRouterQuery } from '@coop/shared/utils';

interface IFormInvestmentAccountSelectProps {
  name: string;
  label: string;
  type?: InvestmentType;
}

type OptionType = { label: string; value: string };

export const FormInvestmentAccountSelect = ({
  name,
  label,
  type,
}: IFormInvestmentAccountSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { watch } = useFormContext();

  const { data: accountListQueryData, isFetching } = useGetInvestmentAccountsListDataQuery(
    {
      pagination: {
        ...getRouterQuery({ type: ['PAGINATION'] }),
        first: 20,
      },
      filter: {
        name: searchTerm,
        type,
      },
    },
    { staleTime: 0 }
  );

  const accountList = accountListQueryData?.accounting?.investment?.listAccount?.edges;

  const accountOptions = accountList?.reduce(
    (prevVal, curVal) => [
      ...prevVal,
      {
        label: `${curVal?.node?.name} [ID:${curVal?.node?.id}]`,
        value: curVal?.node?.id as string,
      },
    ],
    [] as OptionType[]
  );

  useEffect(() => {
    const term = watch(name);
    setSearchTerm(term);
  }, []);

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      onInputChange={debounce((id) => {
        if (id) {
          setSearchTerm(id);
        }
      }, 800)}
      options={accountOptions}
    />
  );
};

export default FormInvestmentAccountSelect;
