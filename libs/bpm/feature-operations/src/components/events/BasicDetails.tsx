import { useMemo } from 'react';

import { FormSection, GridItem } from '@myra-ui';

import {
  FormFieldSearchTerm,
  MemberType,
  useGetIndividualKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormMemberSelect, FormSelect } from '@coop/shared/form';

export const MinorBasicDetails = () => {
  const { data: relationshipData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Relationship,
  });
  const relationList = useMemo(
    () => relationshipData?.form?.options?.predefined?.data ?? [],
    [relationshipData]
  );
  const realationshipOptions = relationList?.map((data) => ({
    label: data?.name?.local as string,
    value: data?.id as string,
  }));
  return (
    <FormSection templateColumns={2}>
      <GridItem colSpan={2}>
        <FormMemberSelect
          name="memberId"
          label="Select Member"
          memberType={MemberType?.Individual}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <FormInput name="fullName" label="Minor Full Name" />
      </GridItem>
      <FormSelect
        name="relationshipId"
        label="Relationship"
        options={realationshipOptions}
        menuPosition="fixed"
      />
      <FormDatePicker name="dateOfBirth" label="Date of Birth" />
    </FormSection>
  );
};
