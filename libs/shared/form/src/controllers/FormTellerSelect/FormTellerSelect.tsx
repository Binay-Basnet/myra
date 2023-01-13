import { useGetTellerListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

interface IFormTellerSelectProps {
  name: string;
  label: string;
  isRequired?: boolean;
  excludeIds?: string[];
}

type OptionType = { label: string; value: string };

export const FormTellerSelect = ({
  name,
  label,
  isRequired,
  excludeIds,
}: IFormTellerSelectProps) => {
  // const [tellerId, setTellerId] = useState('');

  const { data: agentListQueryData, isFetching } = useGetTellerListQuery();

  const agentList = agentListQueryData?.settings?.myraUser?.tellers;

  const agentOptions = agentList?.reduce((prevVal, curVal) => {
    if (excludeIds?.includes(curVal?.id as string)) return prevVal;

    return [
      ...prevVal,
      {
        label: `${curVal?.name} [ID:${curVal?.id}]`,
        value: curVal?.id as string,
      },
    ];
  }, [] as OptionType[]);

  return (
    <FormSelect
      name={name}
      label={label}
      isRequired={isRequired}
      isLoading={isFetching}
      // onInputChange={debounce((id) => {
      //   if (id) {
      //     setTellerId(id);
      //   }
      // }, 800)}
      options={agentOptions}
    />
  );
};

export default FormTellerSelect;
