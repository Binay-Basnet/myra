import { useMemo, useState } from 'react';
import { MultiValue, SingleValue } from 'chakra-react-select';
import { debounce } from 'lodash';

import { SelectOption, SelectProps } from '@myra-ui';

import { useAppSelector, useListGroupQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

import FormSelect from '../FormSelect/FormSelect';

interface IFormMFGroupSelectProps extends SelectProps {
  name: string;
  label?: string;
  onChangeAction?: (newValue: MultiValue<SelectOption> | SingleValue<SelectOption>) => void;
}

export const FormMFGroupSelect = ({ name, label, ...rest }: IFormMFGroupSelectProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const currentBranch = useAppSelector((state) => state?.auth?.user?.currentBranch?.id);

  const { data: listGroupData, isFetching } = useListGroupQuery({
    pagination: { ...getPaginationQuery(), first: -1 },
    filter: {
      query: searchQuery,
      orConditions: [
        { andConditions: [{ column: 'branchId', comparator: 'EqualTo', value: currentBranch }] },
      ],
    },
  });

  const groupList = useMemo(
    () =>
      listGroupData?.microFinance?.group?.listGroup?.edges?.map((group) => ({
        label: group?.node?.groupName as string,
        value: group?.node?.id as string,
      })) ?? [],
    [listGroupData]
  );

  return (
    <FormSelect
      name={name}
      label={label}
      isLoading={isFetching}
      onInputChange={debounce((term, searchEvent) => {
        if (searchEvent.action === 'input-change') {
          setSearchQuery(term);
        }
      }, 800)}
      options={groupList}
      {...rest}
    />
  );
};
