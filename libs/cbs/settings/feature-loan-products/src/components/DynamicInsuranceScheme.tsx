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
import { Box, Button, Icon } from '@coop/shared/ui';
interface IAddAccountServices {
  index: number;
  removeAccountServices: () => void;
}

const amountOpt = [
  { label: 'Amount', value: 'amount' },
  { label: 'Percentage', value: 'percentage' },
];
const AddServiceCharge = ({
  index,
  removeAccountServices,
}: IAddAccountServices) => {
  // const { t } = useTranslation();
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
          label={'Scheme Name'}
          placeholder={'Select Service Name'}
        />
        <FormSelect
          name={`accountServiceCharge.${index}.ledgerName`}
          label="Insurance Company"
          placeholder={'Insurance Company'}
        />
        <FormInput
          type="text"
          textAlign={'right'}
          bg="white"
          name={`accountServiceCharge.${index}.amount`}
          label={'Payment Frequency'}
          placeholder={'Payment Frequency'}
        />
        <FormSwitchTab
          name={`accountServiceCharge.${index}.choose`}
          options={amountOpt}
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};
export const AccountServicesCharge = () => {
  // const { t } = useTranslation();
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
          id="sisterConcernButton"
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            accountServicesAppend({});
          }}
        >
          New Insurance Scheme
        </Button>
      </DynamicBoxGroupContainer>
    </GroupContainer>
  );
};
