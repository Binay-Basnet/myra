import { useSearchCoaQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import { SelectProps } from '@coop/shared/ui';

interface IFormBranchSelectProps extends SelectProps {
  name: string;
  label: string;
}

export const FormCOASelect = (props: IFormBranchSelectProps) => {
  const { name, label, ...rest } = props;

  // const { watch } = useFormContext();

  // const [coaName, setCOAName] = useState('');

  const { data: branchListQueryData, isFetching } = useSearchCoaQuery(
    {
      coaName: '',
    },
    {
      staleTime: 0,
      // enabled: trigger,
    }
  );

  const coaList = branchListQueryData?.settings?.general?.chartsOfAccount?.search?.data;

  const coaOptions = coaList?.map((coa) => ({
    label: `${coa?.accountCode} - ${coa?.name?.local}` as string,
    value: coa?.id as string,
  }));

  // const coa = watch(name);
  //
  // useEffect(() => {
  //   if (coa && !coaOptions?.length) {
  //     setCOAName(coa);
  //     // setTrigger(true);
  //   }
  // }, [coa, coaOptions]);

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      // onInputChange={debounce((name) => {
      //   if (name) {
      //     setCOAName(name);
      //   }
      // }, 800)}
      options={coaOptions}
      {...rest}
    />
  );
};

export default FormCOASelect;
