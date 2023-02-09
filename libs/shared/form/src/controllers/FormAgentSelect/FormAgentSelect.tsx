import { useGetAgentListDataQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getRouterQuery } from '@coop/shared/utils';

interface IFormAgentSelectProps {
  name: string;
  label: string;
  isRequired?: boolean;
  currentBranchOnly?: boolean;
}

type OptionType = { label: string; value: string };

export const FormAgentSelect = ({
  name,
  label,
  isRequired,
  currentBranchOnly = false,
}: IFormAgentSelectProps) => {
  // const { watch } = useFormContext();

  const { data: agentListQueryData, isFetching } = useGetAgentListDataQuery({
    pagination: {
      ...getRouterQuery({ type: ['PAGINATION'] }),
      first: -1,
    },
    currentBranchOnly,
  });

  const agentList = agentListQueryData?.transaction?.listAgent?.edges;

  const agentOptions = agentList?.reduce(
    (prevVal, curVal) => [
      ...prevVal,
      {
        label: `${curVal?.node?.agentName} [ID:${curVal?.node?.id}]`,
        value: curVal?.node?.id as string,
      },
    ],
    [] as OptionType[]
  );

  // useEffect(() => {
  //   const id = watch(name);
  //   setAgentId(id);
  // }, []);

  return (
    <FormSelect
      name={name}
      label={label}
      isRequired={isRequired}
      isLoading={isFetching}
      // onInputChange={debounce((id) => {
      //   if (id) {
      //     setAgentId(id);
      //   }
      // }, 800)}
      options={agentOptions}
    />
  );
};

export default FormAgentSelect;
