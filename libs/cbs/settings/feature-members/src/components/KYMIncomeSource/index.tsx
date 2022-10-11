import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  FormCategory,
  FormSearchTerm,
  FormSection,
  useAddConditionOptionMutation,
} from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { AccordionPanel, Text } from '@coop/shared/ui';

import { KYMSettingsFormSection } from '../KYMSettingsFormSection';
import { useGetPreDefinedFields } from '../../hooks/query/useGetPreDefinedFields';
import { KYMCategory } from '../../types';

export const IncomeSourceDetailsComponent = (props: {
  isExpanded: boolean;
  kymType: KYMCategory;
  section: FormSection;
}) => {
  const { kymType, section } = props;
  const { data: field, isLoading } = useGetPreDefinedFields({
    searchTerm: FormSearchTerm.FamilyIncomeSource,
    category: kymType,
  });
  const { mutateAsync: addConditionOption } = useAddConditionOptionMutation();

  const methods = useForm<{ dependsOn: string[] }>();

  useEffect(() => {
    if (field?.__typename === 'FormField') {
      methods.reset({
        dependsOn: field?.dependsOn as string[],
      });
    }
  }, [isLoading]);

  return (
    <>
      <KYMSettingsFormSection kymType={FormCategory.KymIndividual} section={section} />
      <AccordionPanel p="s16" borderTop="1px" borderTopColor="border.layout">
        <Text fontSize="r1" fontWeight="500" pb="s16">
          Show this option for:
        </Text>

        <form
          onChange={async () => {
            const ids = methods.getValues().dependsOn;
            field &&
              (await addConditionOption({
                fieldId: field.id,
                dependsOn: ids,
              }));
          }}
        >
          <FormProvider {...methods}>
            <FormCheckboxGroup
              name="dependsOn"
              orientation="column"
              list={[
                ...(field?.__typename === 'FormField'
                  ? field?.options?.map((d) => ({
                      label: d.name.local,
                      value: d.id,
                    })) ?? []
                  : []),
              ]}
            />
          </FormProvider>
        </form>
      </AccordionPanel>
    </>
  );
};
