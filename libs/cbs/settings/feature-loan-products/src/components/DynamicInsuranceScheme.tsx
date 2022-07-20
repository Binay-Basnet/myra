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
  FormEditableTable,
  FormInput,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
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
    { label: t['settingsLoanAmount'], value: 'amount' },
    { label: t['settingsLoanPercentage'], value: 'percentage' },
  ];
  const { watch } = useFormContext();
  const AmountPer = watch(`accountServiceCharge.${index}.choose`);
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
          label={t['settingsLoanNewSchemeName']}
          placeholder={t['settingsLoanNewSchemeName']}
        />
        <FormSelect
          name={`accountServiceCharge.${index}.ledgerName`}
          label={t['settingsLoanInsuranceCompany']}
          placeholder={t['settingsLoanInsuranceCompany']}
        />
        <FormInput
          type="text"
          bg="white"
          name={`accountServiceCharge.${index}.amount`}
          label={t['settingsLoanPaymentFreq']}
          placeholder={t['settingsLoanPaymentFreq']}
        />
        <FormSwitchTab
          name={`accountServiceCharge.${index}.choose`}
          options={amountOpt}
        />
      </InputGroupContainer>
      <Box pt="s16">
        {AmountPer && AmountPer === 'amount' && (
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
                name={`accountServiceCharge.${index}.minAmount`}
                label={t['settingsLoanMinimumAmount']}
                placeholder={t['settingsLoanPlceholderNumber']}
              />
              <FormInput
                type="number"
                textAlign={'right'}
                bg="white"
                name={`accountServiceCharge.${index}.maxAmount`}
                label={t['settingsLoanMaximumAmount']}
                placeholder={t['settingsLoanPlceholderNumber']}
              />
              <FormInput
                type="number"
                textAlign={'right'}
                bg="white"
                name={`accountServiceCharge.${index}.insurancePremium`}
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
        {AmountPer && AmountPer === 'percentage' && (
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
                name={`accountServiceCharge.${index}.minPer`}
                label={t['settingsLoanMinimumPer']}
                placeholder={t['settingsLoanPlceholderNumber']}
              />
              <FormInput
                type="number"
                textAlign={'right'}
                bg="white"
                name={`accountServiceCharge.${index}.maxPer`}
                label={t['settingsLoanMaximumPer']}
                placeholder={t['settingsLoanPlceholderNumber']}
              />
              <FormInput
                type="number"
                textAlign={'right'}
                bg="white"
                name={`accountServiceCharge.${index}.insurancePremium`}
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
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            accountServicesAppend({});
          }}
        >
          {t['settingsLoanNewScheme']}{' '}
        </Button>
      </DynamicBoxGroupContainer>
    </GroupContainer>
  );
};
