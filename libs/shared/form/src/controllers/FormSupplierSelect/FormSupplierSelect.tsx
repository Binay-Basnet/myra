import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import debounce from 'lodash/debounce';

import { useGetSuppliersListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

interface IFormCustomerSelectProps {
  name: string;
  label: string;
}

export const FormSupplierSelect = ({ name, label }: IFormCustomerSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { watch } = useFormContext();

  const { data: suppliersDetails, isFetching } = useGetSuppliersListQuery({
    pagination: {
      after: '',
      first: 20,
    },
    filter: {
      query: searchTerm,
    },
  });

  const inventoryItemsData = suppliersDetails?.inventory?.suppliers?.list?.edges;
  const supplierSearchOptions = useMemo(
    () =>
      inventoryItemsData?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [inventoryItemsData]
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
      options={supplierSearchOptions}
    />
  );
};

export default FormSupplierSelect;
