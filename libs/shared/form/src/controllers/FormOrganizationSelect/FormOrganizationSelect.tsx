import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import debounce from 'lodash/debounce';

import { useGetAccountingOrganiztionListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

interface IFormOrganizationSelectProps {
  name: string;
  label: string;
}

type OptionType = { label: string; value: string };

export const FormOrganizationSelect = ({ name, label }: IFormOrganizationSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { watch } = useFormContext();

  const { data: accountListQueryData, isFetching } = useGetAccountingOrganiztionListQuery(
    {
      pagination: {
        ...getPaginationQuery(),
        first: 20,
      },
      filter: {
        name: searchTerm,
        id: searchTerm,
      },
    },
    { staleTime: 0 }
  );

  const accountList = accountListQueryData?.accounting?.organization?.list?.edges ?? [];

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

export default FormOrganizationSelect;
