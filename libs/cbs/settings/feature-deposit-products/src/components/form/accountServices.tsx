import React from 'react';
import { Control, useFieldArray, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormEditableTable, FormInput, FormSelect } from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Grid, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubText, TextBoxContainer, TopText } from '../formui';

const options = [
  { label: 'option 1', value: 'option1' },
  { label: 'option 2', value: 'option2' },
];
interface IAddAccountServices {
  index: number;
  removeAccountServices: () => void;
}

type AccountServiceTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

const service_name = [
  { label: 'Lenovo Laptop', value: 'mi001' },
  { label: 'Alienware Laptop', value: 'mi002' },
];

const ledger_name = [
  {
    label: 'Purchase Ledger',
    value: 'purchaseLedger',
  },
  {
    label: 'Sales Ledger',
    value: 'salesLedger',
  },
];

const AddServiceCharge = ({
  index,
  removeAccountServices,
}: IAddAccountServices) => {
  // const { t } = useTranslation();
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeAccountServices}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />
      <InputGroupContainer>
        <FormSelect
          name={`accountServiceCharge.${index}.serviceName`}
          label={'Service Name'}
          placeholder={'Select Service Name'}
          options={options}
        />
        <FormSelect
          name={`accountServiceCharge.${index}.ledgerName`}
          label="Ledger Name"
          placeholder={'Ledger Name'}
        />
        <FormInput
          type="text"
          textAlign={'right'}
          bg="white"
          name={`accountServiceCharge.${index}.amount`}
          label={'Amount'}
          placeholder={'0.00'}
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const AccountServicesCharge = () => {
  // const { t } = useTranslation();
  const {
    fields: accountServicesFields,
    append: accountServicesAppend,
    remove: accountServicesRemove,
  } = useFieldArray({ name: 'accountServiceCharge' });

  const methods = useForm({});

  const { watch } = methods;

  const depositNature = watch('nameOfDepositProduct');

  console.log(depositNature);
  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <TextBoxContainer>
        <TopText>Account Service Charge</TopText>
        <SubText>Add different service charges.</SubText>
      </TextBoxContainer>
      {(depositNature === 'mandatory' || depositNature === 'voluntary') && (
        <div>
          <DynamicBoxGroupContainer>
            {accountServicesFields.map((item, index) => {
              return (
                <Box key={item.id}>
                  <AddServiceCharge
                    index={index}
                    removeAccountServices={() => accountServicesRemove(index)}
                  />
                </Box>
              );
            })}
            <Button
              id="sisterConcernButton"
              alignSelf="start"
              leftIcon={<Icon size="md" as={AiOutlinePlus} />}
              variant="outline"
              onClick={() => {
                accountServicesAppend({});
              }}
            >
              New Service Charge{' '}
            </Button>
          </DynamicBoxGroupContainer>
        </div>
      )}
      {depositNature === 'recurringSaving' && (
        <FormEditableTable<AccountServiceTable>
          name="data"
          columns={[
            {
              accessor: 'serviceName',
              header: 'Service Name',
              fieldType: 'select',
              cellWidth: 'auto',

              selectOptions: service_name,
            },
            {
              accessor: 'ledgerName',
              header: 'Ledger Name',
              fieldType: 'select',
              cellWidth: 'auto',
              selectOptions: ledger_name,
            },
            {
              accessor: 'amount',
              header: 'Amount',
              cellWidth: 'auto',
              isNumeric: true,
            },
          ]}
        />
      )}
    </GroupContainer>
  );
};
