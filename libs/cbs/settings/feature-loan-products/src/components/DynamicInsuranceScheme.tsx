import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  Frequency,
  LoanInsurancePaymentType,
  useSetLoanInsuranceSchemeMutation,
} from '@coop/cbs/data-access';
import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, Button, Icon, SettingsFooter, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IAddAccountServices {
  index: number;
  removeAccountServices: () => void;
}

const AddServiceCharge = ({
  index,
  removeAccountServices,
}: IAddAccountServices) => {
  const { t } = useTranslation();

  const amountOpt = [
    { label: t['settingsLoanAmount'], value: LoanInsurancePaymentType?.Amount },
    {
      label: t['settingsLoanPercentage'],
      value: LoanInsurancePaymentType?.Percentage,
    },
  ];
  const { watch } = useFormContext();
  const AmountPer = watch(`insuranceScheme.${index}.paymentType`);
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
        <FormInput
          type="text"
          bg="white"
          name={`insuranceScheme.${index}.schemeName`}
          label={t['settingsLoanNewSchemeName']}
          placeholder={t['settingsLoanNewSchemeName']}
        />
        <FormInput
          type="text"
          bg="white"
          name={`insuranceScheme.${index}.insuranceCompany`}
          label={t['settingsLoanInsuranceCompany']}
          placeholder={t['settingsLoanInsuranceCompany']}
        />

        <FormSelect
          name={`insuranceScheme.${index}.paymentFrequency`}
          label={t['settingsLoanPaymentFreq']}
          placeholder={t['settingsLoanPaymentFreq']}
          options={[
            {
              label: 'daily',
              value: Frequency.Daily,
            },
            {
              label: 'weekly',
              value: Frequency.Weekly,
            },
            {
              label: 'monthly',
              value: Frequency.Monthly,
            },
            {
              label: 'yearly',
              value: Frequency.Yearly,
            },
          ]}
        />
        <Box display="flex" flexDirection="column" gap="s8">
          <Text
            fontWeight="Medium"
            color="neutralColorLight.Gray-70"
            fontSize="s3"
          >
            {t['loanPaymentType']}
          </Text>
          <FormSwitchTab
            name={`insuranceScheme.${index}.paymentType`}
            options={amountOpt}
          />
        </Box>
      </InputGroupContainer>
      <Box pt="s16">
        {AmountPer && AmountPer === LoanInsurancePaymentType?.Amount && (
          <Box
            border="1px solid"
            borderColor={'border.layout'}
            p="s16"
            borderRadius={'4px'}
          >
            <InputGroupContainer>
              <FormInput
                type="number"
                textAlign={'right'}
                bg="white"
                name={`insuranceScheme.${index}.minAmount`}
                label={t['settingsLoanMinimumAmount']}
                placeholder={t['settingsLoanPlceholderNumber']}
              />
              <FormInput
                type="number"
                textAlign={'right'}
                bg="white"
                name={`insuranceScheme.${index}.maxAmount`}
                label={t['settingsLoanMaximumAmount']}
                placeholder={t['settingsLoanPlceholderNumber']}
              />
              <FormInput
                type="number"
                textAlign={'right'}
                bg="white"
                name={`insuranceScheme.${index}.insurancePremiumPercent`}
                label={t['settingsLoanInsurancePremium']}
                placeholder={t['settingsLoanPlceholderNumber']}
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            </InputGroupContainer>
          </Box>
        )}
        {AmountPer && AmountPer === LoanInsurancePaymentType?.Percentage && (
          <Box
            border="1px solid"
            borderColor={'border.layout'}
            p="s16"
            borderRadius={'4px'}
          >
            <InputGroupContainer>
              <FormInput
                type="number"
                textAlign={'right'}
                bg="white"
                name={`insuranceScheme.${index}.minPercentage`}
                label={t['settingsLoanMinimumPer']}
                placeholder={t['settingsLoanPlceholderNumber']}
              />
              <FormInput
                type="number"
                textAlign={'right'}
                bg="white"
                name={`insuranceScheme.${index}.maxPercentage`}
                label={t['settingsLoanMaximumPer']}
                placeholder={t['settingsLoanPlceholderNumber']}
              />
              <FormInput
                type="number"
                textAlign={'right'}
                bg="white"
                name={`insuranceScheme.${index}.insurancePremiumPercent`}
                label={t['settingsLoanInsurancePremium']}
                placeholder={t['settingsLoanPlceholderNumber']}
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            </InputGroupContainer>
          </Box>
        )}
      </Box>
    </DynamicBoxContainer>
  );
};
export const AccountServicesCharge = () => {
  const { t } = useTranslation();
  const methods = useForm();
  const { watch } = methods;
  const insuranceScheme = watch('insuranceScheme');
  const { mutate } = useSetLoanInsuranceSchemeMutation();

  const {
    fields: insuranceSchemeFields,
    append: insuranceSchemeAppend,
    remove: insuranceSchemeRemove,
  } = useFieldArray({ name: 'insuranceScheme' });

  const handleSave = () => {
    mutate({ data: insuranceScheme });
  };

  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <FormProvider {...methods}>
        <form>
          <DynamicBoxGroupContainer>
            {insuranceSchemeFields.map((item, index) => {
              return (
                <Box key={item.id}>
                  <AddServiceCharge
                    index={index}
                    removeAccountServices={() => insuranceSchemeRemove(index)}
                  />
                </Box>
              );
            })}
            <Button
              alignSelf="start"
              leftIcon={<Icon size="md" as={AiOutlinePlus} />}
              variant="outline"
              onClick={() => {
                insuranceSchemeAppend({});
              }}
            >
              {t['settingsLoanNewScheme']}{' '}
            </Button>
          </DynamicBoxGroupContainer>
          <SettingsFooter handleSave={handleSave} />
        </form>
      </FormProvider>
    </GroupContainer>
  );
};
