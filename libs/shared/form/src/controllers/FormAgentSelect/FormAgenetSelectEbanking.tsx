import { useGetCollectorListEbankingQuery } from '@coop/ebanking/data-access';
import { FormSelect } from '@coop/shared/form';

interface IFormAgentSelectProps {
  name: string;
  label: string;
}

type OptionType = { label: string; value: string };

export const FormAgentSelectEbanking = ({ name, label }: IFormAgentSelectProps) => {
  const { data: agentListQueryData, isFetching } = useGetCollectorListEbankingQuery({});

  const agentList = agentListQueryData?.eBanking?.cooperativeServices?.cheque?.collectors?.data;

  const agentOptions = agentList?.reduce(
    (prevVal, curVal) => [
      ...prevVal,
      {
        label: `${curVal?.name} [ID:${curVal?.id}]`,
        value: curVal?.id as string,
      },
    ],
    [] as OptionType[]
  );

  return <FormSelect name={name} label={label} isLoading={isFetching} options={agentOptions} />;
};

export default FormAgentSelectEbanking;
