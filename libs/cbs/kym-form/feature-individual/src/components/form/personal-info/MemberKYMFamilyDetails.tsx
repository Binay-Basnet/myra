import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import { FormInputWithType } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id,
  Kym_Field_Custom_Id as KYMOptionEnum,
  Kym_Option_Field_Type,
  KymIndMemberInput,
  KymOption,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IAddFamilyMember {
  index: number;
  removeFamilyMember: () => void;
}

interface DynamicInputProps {
  fieldIndex: number;
  optionIndex: number;
  option: Partial<KymOption>;
}

const FamilyMemberInput = ({
  fieldIndex,
  optionIndex,
  option,
}: DynamicInputProps) => {
  const { register, unregister } = useFormContext();

  useEffect(() => {
    register(`familyDetails.${fieldIndex}.options.${optionIndex}.id`, {
      value: option.id,
    });
  }, []);
  return (
    <FormInputWithType
      formType={option?.fieldType}
      name={`familyDetails.${fieldIndex}.options.${optionIndex}.value`}
      label={option?.name?.local}
      placeholder={option?.name?.local}
    />
  );
};

const AddFamilyMember = ({ index, removeFamilyMember }: IAddFamilyMember) => {
  const { unregister } = useFormContext();

  const { data: familyDetailsFieldsData } = useGetIndividualKymOptionsQuery({
    filter: {
      customId: Kym_Field_Custom_Id.FamilyInformation,
    },
  });

  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={() => {
          removeFamilyMember();
          unregister(`familyDetails.${index}`);
        }}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />

      <InputGroupContainer>
        {familyDetailsFieldsData?.members?.individual?.options?.list?.data?.[0]?.options?.map(
          (option, optionIndex) => (
            <FamilyMemberInput
              key={optionIndex}
              fieldIndex={index}
              optionIndex={optionIndex}
              option={option}
            />
            //  <FormInputWithType
            //               formType={option?.fieldType}
            //               id="identificationFields"
            //               type={option?.fieldType}
            //               name={`identification.${fieldIndex}.options.${optionIndex}.value`}
            //               label={String(option?.name?.local)}
            //               placeholder={String(option?.name?.local)}
            //             />
          )
        )}
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const MemberKYMFamilyDetails = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<KymIndMemberInput>();

  const { data: maritalStatusData, isLoading: maritalStatusLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.MaritalStatus },
    });

  const {
    fields: familyFields,
    append: familyAppend,
    remove: familyRemove,
  } = useFieldArray({ control, name: 'familyDetails' });

  return (
    <GroupContainer id="kymAccIndFamilyDetails" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymIndFAMILYDETAILS']}
      </Text>
      <InputGroupContainer>
        <FormSelect
          name={'maritalStatusId'}
          label={t['kymIndMartialStatus']}
          placeholder={t['kymIndSelectMartialStatus']}
          isLoading={maritalStatusLoading}
          options={getFieldOption(maritalStatusData)}
        />
      </InputGroupContainer>

      <div>
        <Text fontSize="s3" mb="s4">
          {t['kymIndFamilymembers']}
        </Text>
        <DynamicBoxGroupContainer>
          {familyFields.map((item, index) => {
            return (
              <Box key={item.id}>
                <AddFamilyMember
                  index={index}
                  removeFamilyMember={() => familyRemove(index)}
                />
              </Box>
            );
          })}
          <Button
            id="addFamilyMemberButton"
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              familyAppend({});
            }}
          >
            {t['kymIndAddFamilyMember']}
          </Button>
        </DynamicBoxGroupContainer>
      </div>
    </GroupContainer>
  );
};
