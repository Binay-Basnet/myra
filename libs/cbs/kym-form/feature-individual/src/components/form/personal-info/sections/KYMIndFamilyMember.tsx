import { useFieldArray, useFormContext } from 'react-hook-form';

import { Box, Button } from '@myra-ui/foundations';
import { FormSection } from '@myra-ui/templates';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetIndividualKymOptionsQuery,
} from '@coop/cbs/data-access';
import { KYMSection } from '@coop/cbs/kym-form/formElements';
import { DynamicBoxGroupContainer, KYMRemoveButton } from '@coop/cbs/kym-form/ui-containers';
import { FormDatePicker, FormFileInput, FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../../utils/getFieldOption';

export const KYMIndFamilyMember = () => {
  const { t } = useTranslation();

  const { data: relationshipData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Relationship,
  });
  const { control } = useFormContext<KymIndMemberInput>();
  const { fields, append, remove } = useFieldArray({
    name: 'familyMembers',
    control,
  });

  return (
    <FormSection
      templateColumns={1}
      id={KYMSection.INDIVIDUAL_FAMILY_MEMBERS}
      header="kymIndFamilymembers"
      rightElement={
        <Button
          id={KYMSection.INDIVIDUAL_FAMILY_MEMBERS}
          variant="outline"
          shade="neutral"
          onClick={() => {
            append({
              documents: [
                {
                  fieldId: 'file',
                  identifiers: [],
                },
              ],
            });
          }}
        >
          {t['kymIndFamilyAddMembers']}
        </Button>
      }
    >
      {fields?.map((field, index) => (
        <Box key={field.id} display="flex" gap="s12">
          <DynamicBoxGroupContainer>
            <FormSelect
              menuPosition="fixed"
              name={`familyMembers.${index}.relationshipId`}
              label={t['kymIndFamilyRelationship']}
              options={getFieldOption(relationshipData)}
            />

            <FormInput
              type="text"
              name={`familyMembers.${index}.fullName`}
              label={t['kymIndFamilyFullName']}
            />

            <FormDatePicker
              name={`familyMembers.${index}.dateOfBirth`}
              label={t['kymIndfamilyDateofBirthBS']}
              maxToday
            />

            <FormFileInput
              name={`familyMembers.${index}.documents.0.identifiers`}
              size="sm"
              label={t['kymIndFamilyPhoto']}
            />
          </DynamicBoxGroupContainer>

          <KYMRemoveButton onClick={() => remove(index)} />
        </Box>
      ))}
    </FormSection>
  );
};
