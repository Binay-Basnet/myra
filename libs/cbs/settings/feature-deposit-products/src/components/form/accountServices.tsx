import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
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

const AddServiceCharge = ({
  index,
  removeAccountServices,
}: IAddAccountServices) => {
  const { t } = useTranslation();
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
    </GroupContainer>
  );
};
