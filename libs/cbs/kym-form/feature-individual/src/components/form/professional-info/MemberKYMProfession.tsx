import { Skeleton } from '@chakra-ui/react';

import { FormSection } from '@myra-ui';

import { FormFieldSearchTerm, useGetIndividualKymOptionsQuery } from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';

import { getFieldOption } from '../../../utils/getFieldOption';

export const MemberKYMProfession = () => {
  const { data: occupationData, isLoading: occupationLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
  });

  return (
    <FormSection isRequired header="kymIndPROFESSION" flexLayout>
      {occupationLoading ? (
        <Skeleton height="40px" />
      ) : (
        <FormCheckboxGroup name="professionId" showOther list={getFieldOption(occupationData)} />
      )}
    </FormSection>
  );
};
