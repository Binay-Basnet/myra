import { InvestmentType, useGetInvestmentEntriesListDataQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getRouterQuery } from '@coop/shared/utils';

interface IFormInvestmentEntrySelectProps {
  name: string;
  label: string;
  type?: InvestmentType | null | undefined;
}

type OptionType = { label: string; value: string };

export const FormInvestmentEntrySelect = ({
  name,
  label,
  type,
}: IFormInvestmentEntrySelectProps) => {
  // const [searchTerm, setSearchTerm] = useState('');

  const { data: entryListQueryData, isFetching } = useGetInvestmentEntriesListDataQuery(
    {
      pagination: {
        ...getRouterQuery({ type: ['PAGINATION'] }),
        first: 10,
      },
      filter: {
        // name: searchTerm,
        type,
      },
    },
    { staleTime: 0 }
  );

  const accountList = entryListQueryData?.accounting?.investment?.listEntry?.edges;

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

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      // onInputChange={debounce((id) => {
      //   if (id) {
      //     setSearchTerm(id);
      //   }
      // }, 800)}
      options={accountOptions}
    />
  );
};

export default FormInvestmentEntrySelect;
