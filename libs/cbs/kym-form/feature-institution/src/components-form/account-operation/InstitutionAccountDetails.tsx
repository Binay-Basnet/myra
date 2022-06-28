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
import { FormFileInput, FormInput, FormSelect } from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Grid, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IAddAccountDetailsConcern {
  index: number;
  removeAccountDetails: () => void;
}

const AddAccountDetails = ({
  index,
  removeAccountDetails,
}: IAddAccountDetailsConcern) => {
  const { t } = useTranslation();
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeAccountDetails}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />
      <InputGroupContainer>
        <FormInput
          type="text"
          bg="white"
          name={`accountOperatorsDetails.${index}.fullName`}
          label={t['kymInsFullName']}
          placeholder={t['kymInsEnterFullName']}
        />
        <FormSelect
          name={`accountOperatorsDetails.${index}.designation`}
          label={t['kymInsDesignation']}
          placeholder={t['kymInsSelectposition']}
          options={[
            { value: 'precident', label: 'President' },
            { value: 'viceprecident', label: 'Vice-President' },
            { value: 'secretary', label: 'Secretary' },
            { value: 'treasurer', label: 'Treasurer' },
          ]}
        />
        <Box display="flex" flexDirection={'column'} gap="s4">
          <Text fontSize={'s3'} fontWeight="500">
            {t['kymInsSpecimenSignature']}
          </Text>
          <Box w="124px" display="flex" flexDirection={'column'} gap="s4">
            <FormFileInput
              name={`accountOperatorsDetails.${index}.specimenSignature`}
            />
          </Box>
        </Box>
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const InstitutionKYMAccountDetail = () => {
  const { t } = useTranslation();
  const {
    fields: accountFields,
    append: accountAppend,
    remove: accountRemove,
  } = useFieldArray({ name: 'accountOperatorsDetails' });

  return (
    <GroupContainer
      id="kymInsDetailsofAccountOperators"
      scrollMarginTop="200px"
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymInsDetailsofAccountOperators']}
      </Text>

      <div>
        <DynamicBoxGroupContainer>
          {accountFields.map((item, index) => {
            return (
              <Box key={item.id}>
                <AddAccountDetails
                  index={index}
                  removeAccountDetails={() => accountRemove(index)}
                />
              </Box>
            );
          })}
          <Button
            id="accountOperatorDetailsButton"
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              accountAppend({});
            }}
          >
            {t['kymInsNewOperator']}
          </Button>
        </DynamicBoxGroupContainer>
      </div>
    </GroupContainer>
  );
};
