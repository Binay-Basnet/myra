import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseButton } from '@chakra-ui/react';

import {
  InvestmentType,
  useGetInvestmentEntriesListDataQuery,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Button, FormSection, GridItem, Icon, IconButton } from '@coop/shared/ui';
import { getRouterQuery } from '@coop/shared/utils';

export const Collateral = () => {
  const { control } = useFormContext();
  const { data: investmentData } = useGetInvestmentEntriesListDataQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: { type: InvestmentType.FixedDeposit },
  });

  const investmentList = investmentData?.accounting?.investment?.listEntry?.edges;

  const fixedDepositList =
    investmentList &&
    investmentList?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));

  const { data: userListQueryData } = useGetSettingsUserListDataQuery(
    {
      paginate: getRouterQuery({ type: ['PAGINATION'] }),
    },
    { staleTime: 0 }
  );

  const userList = userListQueryData?.settings?.myraUser?.list?.edges;

  const representativeList =
    userList &&
    userList?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'collateral',
  });

  const addCollateral = () => {
    append({});
  };

  return (
    <FormSection header="Collaterals" divider={false}>
      <GridItem
        p="s10"
        border="1px solid"
        borderColor="border.layout"
        display="flex"
        flexDirection="column"
        gap="s16"
        colSpan={3}
        borderRadius="br2"
      >
        {fields.map((item, index) => (
          <Box key={item.id} display="flex" flexDirection="column">
            <Box
              p="s20"
              display="flex"
              borderRadius="br2"
              flexDirection="column"
              bg="background.500"
            >
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  aria-label="close"
                  variant="ghost"
                  size="sm"
                  icon={<CloseButton />}
                  onClick={() => {
                    remove(index);
                  }}
                />
              </Box>
              <Box display="flex" gap="16px" flexDirection="column">
                <Box display="flex" flexDirection="column">
                  <Box display="flex" p="s16" gap="s16">
                    <FormInput
                      name={`collateral.${index}.typeOfCollateral`}
                      type="text"
                      label="Type of Collateral"
                    />
                    <FormInput
                      name={`collateral.${index}.valuationAmount`}
                      textAlign="right"
                      type="number"
                      label="Valuation Amount"
                    />
                    <FormInput
                      name={`collateral.${index}.details`}
                      type="test"
                      label="Collateral Details"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}

        <Button
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={addCollateral}
        >
          Add New
        </Button>
      </GridItem>
      <GridItem colSpan={3}>
        <FormSelect name="fixDeposit" label="Fix Deposit" options={fixedDepositList ?? []} />
      </GridItem>
      <GridItem colSpan={2}>
        <FormSelect
          name="nameOfRepresentative"
          label="Name of Representative"
          options={representativeList ?? []}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <FormInput name="position" type="text" label="Position" />
      </GridItem>
    </FormSection>
  );
};
