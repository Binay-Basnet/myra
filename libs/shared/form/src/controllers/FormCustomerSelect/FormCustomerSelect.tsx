import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import debounce from 'lodash/debounce';

import { useGetSalesCustomerListDataQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

interface IFormCustomerSelectProps {
  name: string;
  label: string;
}

type OptionType = { label: string; value: string };

export const FormCustomerSelect = ({ name, label }: IFormCustomerSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { watch } = useFormContext();

  const { data: customerListQueryData, isFetching } = useGetSalesCustomerListDataQuery({
    pagination: {
      ...getPaginationQuery(),
      first: 20,
    },
    filter: {
      name: searchTerm,
    },
  });

  const customerList = customerListQueryData?.accounting?.sales?.listCustomer?.edges;

  const customerOptions = customerList?.reduce(
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
      options={customerOptions}
    />
  );
};

export default FormCustomerSelect;
