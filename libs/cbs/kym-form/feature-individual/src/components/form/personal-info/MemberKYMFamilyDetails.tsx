import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  CustomIdEnum as KYMOptionEnum,
  KymIndMemberInput,
  useGetIndividualKymOptionQuery,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Button, GridItem, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IAddFamilyMember {
  index: number;
  removeFamilyMember: () => void;
}

const AddFamilyMember = ({ index, removeFamilyMember }: IAddFamilyMember) => {
  const { t } = useTranslation();
  const { data: familyRelationShipData, isLoading: familyRelationshipLoading } =
    useGetIndividualKymOptionQuery({
      fieldName: 'family_relationship',
    });

  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeFamilyMember}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />

      <InputGroupContainer>
        <GridItem colSpan={1}>
          <FormSelect
            name={`familyDetails.${index}.relationshipId`}
            label={t['kymIndRelationship']}
            placeholder={t['kymIndSelectRelationship']}
            isLoading={familyRelationshipLoading}
            options={getFieldOption(familyRelationShipData)}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <FormInput
            type="text"
            bg="white"
            name={`familyDetails.${index}.fullName`}
            label={t['kymIndFullName']}
            placeholder={t['kymIndEnterFullName']}
          />
        </GridItem>

        {/*
        TODO ( UNCOMMENT THIS AFTER BACKEND )
        <GridItem colSpan={1}>
          <FormInput
            type="date"
            bg="white"
            name={`familyDetails.${index}.dateOfBirth`}
            label="Date of Birth (BS)"
            placeholder="Enter Date of Birth"
          />
        </GridItem>*/}
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
          name={'maritalStatus'}
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
