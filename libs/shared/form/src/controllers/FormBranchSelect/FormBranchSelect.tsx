import { MultiValue, SingleValue } from 'chakra-react-select';

import { SelectOption, SelectProps } from '@myra-ui';

import { useAppSelector, useGetBranchListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

interface IFormBranchSelectProps extends SelectProps {
  name: string;
  label: string;
  showUserBranchesOnly?: boolean;
  onChangeAction?: (newValue: MultiValue<SelectOption> | SingleValue<SelectOption>) => void;
}

export const FormBranchSelect = (props: IFormBranchSelectProps) => {
  const { name, label, showUserBranchesOnly, ...rest } = props;

  // const { watch } = useFormContext();

  // const [branchId, setBranchId] = useState('');
  const auth = useAppSelector((state) => state?.auth);

  // const user = useAppSelector((state) => state.auth.user);
  // const currentUserId = user?.id;

  const { data: branchListQueryData, isFetching } = useGetBranchListQuery(
    {
      paginate: {
        first: -1,
        after: '',
        order: null,
      },
      // filter: {
      //   query: branchId?.length === 0 ? null : branchId,
      //   id: branchId?.length === 0 ? null : branchId,
      //   filterMode: Filter_Mode.Or,
      // },
    },
    {
      staleTime: 0,
    }
  );

  const branchList = branchListQueryData?.settings?.general?.branch?.list?.edges;

  const branchOptions = branchList?.map((branch) => ({
    label: `${branch?.node?.name} [${branch?.node?.branchCode}]` as string,
    value: branch?.node?.id as string,
  }));

  const availableBranchesOptions = auth.availableBranches?.map((branch) => ({
    label: branch.name,
    value: branch.id,
  }));
  // const { data: userListQueryData, isLoading: isBranchFetching } = useGetSettingsUserListDataQuery(
  //   {
  //     paginate: {
  //       first: -1,
  //       after: '',
  //       order: null,
  //     },
  //   },
  //   { staleTime: 0 }
  // );

  // const rowData = userListQueryData?.settings?.myraUser?.list?.edges?.find(
  //   (item) => item?.node?.id === currentUserId
  // )?.node?.linkedBranches;

  // const userBranchOptions = rowData?.map((options) => ({
  //   label: `${options?.name} [${options?.branchCode}]` as string,
  //   value: options?.id as string,
  // }));
  // const options = watch(name);

  // useEffect(() => {
  //   if (branch && !branchOptions?.length) {
  //     setBranchId(branch);
  //   }
  // }, [branch, branchOptions]);

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={showUserBranchesOnly ? false : isFetching}
      // onInputChange={debounce((id) => {
      //   if (id) {
      //     setBranchId(id);
      //     // setTrigger(true);
      //   }
      // }, 800)}
      options={showUserBranchesOnly ? availableBranchesOptions : branchOptions}
      {...rest}
    />
  );
};

export default FormBranchSelect;
