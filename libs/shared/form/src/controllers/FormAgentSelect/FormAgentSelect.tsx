import { SelectProps } from '@myra-ui';

import { ObjState, useGetAgentListDataQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

interface IFormAgentSelectProps extends SelectProps {
  name: string;
  label: string;
  isRequired?: boolean;
  currentBranchOnly?: boolean;
  state?: ObjState;
}

type OptionType = { label: string; value: string };

export const FormAgentSelect = ({
  name,
  label,
  isRequired,
  currentBranchOnly = false,
  state,
  ...rest
}: IFormAgentSelectProps) => {
  // const { watch } = useFormContext();

  const { data: agentListQueryData, isFetching } = useGetAgentListDataQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
    },
    filter: {
      orConditions: state
        ? [
            {
              andConditions: [
                {
                  column: 'state',
                  comparator: 'EqualTo',
                  value: state,
                },
              ],
            },
          ]
        : [],
    },
    currentBranchOnly,
  });

  const agentList = agentListQueryData?.agent?.listAgent?.edges;

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
      {...rest}
    />
  );
};

export default FormAgentSelect;
