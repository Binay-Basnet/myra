import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { Box } from '@chakra-ui/react';

import { GridItem } from '@myra-ui/components';
import { Button, Icon, Text } from '@myra-ui/foundations';
import { FormSection } from '@myra-ui/templates';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetIndividualKymOptionsQuery,
} from '@coop/cbs/data-access';
import { DynamicBoxGroupContainer, KYMRemoveButton } from '@coop/cbs/kym-form/ui-containers';
import { FormAmountInput, FormInput, FormRadioGroup } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

export const KYMIndIncomeSourceDetails = () => {
  const { t } = useTranslation();

  const { control } = useFormContext<KymIndMemberInput>();

  const { data: familyIncomeData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.FamilyIncomeSource,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'incomeSource',
    control,
  });

  return (
    <FormSection
      templateColumns={1}
      header="kymIndINCOMESOURCEDETAILS"
      id="kymAccIndIncomeSourceDetails"
    >
      <FormRadioGroup
        isRequired
        id="annualIncomeSourceId"
        name="annualIncomeSourceId"
        label={t['kynIndAnnualFamilyIncome']}
        options={getFieldOption(familyIncomeData)}
      />

      <Box display="flex" gap="s16" flexDirection="column">
        <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-70" mb="s4">
          {t['kynIndIncomegreater']}
        </Text>

        {fields.map((field, index) => (
          <Box key={field.id} display="flex" w="100%" gap="s12">
            <DynamicBoxGroupContainer>
              <GridItem colSpan={2}>
                <FormInput
                  type="text"
                  bg="white"
                  name={`incomeSource.${index}.incomeSource`}
                  label={t['kymIndIncomeSource']}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <FormAmountInput
                  bg="white"
                  name={`incomeSource.${index}.amount`}
                  label={t['kymIndAmount']}
                />
              </GridItem>
            </DynamicBoxGroupContainer>
            <KYMRemoveButton onClick={() => remove(index)} />
          </Box>
        ))}

        <Button
          id="incomeSourceDetailsButton"
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => append({})}
        >
          {t['kynIndNewEntry']}
        </Button>
      </Box>
    </FormSection>
  );
};
