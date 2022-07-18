import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormEditableTable, FormInput, FormSelect } from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Icon } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

// import { useTranslation } from '@coop/shared/utils';
import { SubText, TextBoxContainer, TopText } from '../formui';

const options = [
  { label: 'option 1', value: 'option1' },
  { label: 'option 2', value: 'option2' },
];
interface IAddAccountServices {
  index: number;
  removeAccountServices: () => void;
}

type AccountServiceTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

const service_name = [
  { label: 'Lenovo Laptop', value: 'mi001' },
  { label: 'Alienware Laptop', value: 'mi002' },
];

const ledger_name = [
  {
    label: 'Purchase Ledger',
    value: 'purchaseLedger',
  },
  {
    label: 'Sales Ledger',
    value: 'salesLedger',
  },
];

const AddServiceCharge = ({
  index,
  removeAccountServices,
}: IAddAccountServices) => {
  const { t } = useTranslation();
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
          label={t['depositProductServiceName Name']}
          placeholder={t['depositProductSelectServiceName']}
          options={options}
        />
        <FormSelect
          name={`accountServiceCharge.${index}.ledgerName`}
          label={t['depositProductLedgerName']}
          placeholder={t['depositProductLedgerName']}
        />
        <FormInput
          type="text"
          textAlign={'right'}
          bg="white"
          name={`accountServiceCharge.${index}.amount`}
          label={t['depositProductAmount']}
          placeholder={'0.00'}
        />
      </InputGroupContainer>
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

  const methods = useFormContext();

  const { watch } = methods;

  const depositNature = watch('nameOfDepositProduct');

  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <TextBoxContainer>
        <TopText>{t['depositProductAccountServiceCharge']} </TopText>
        <SubText>{t['depositProductAdddifferentservicecharges']} </SubText>
      </TextBoxContainer>
      {(depositNature === 'mandatory' || depositNature === 'voluntary') && (
        <div>
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
              {t['depositProductNewServiceCharge']}
            </Button>
          </DynamicBoxGroupContainer>
        </div>
      )}
      {depositNature === 'recurringSaving' && (
        <FormEditableTable<AccountServiceTable>
          name="data"
          debug={false}
          columns={[
            {
              accessor: 'serviceName',
              header: t['depositProductAccServiceTableServiceName'],
              fieldType: 'select',
              cellWidth: 'auto',
              selectOptions: service_name,
            },
            {
              accessor: 'ledgerName',
              header: t['depositProductAccServiceTableServiceName'],
              fieldType: 'select',
              cellWidth: 'auto',
              selectOptions: ledger_name,
            },
            {
              accessor: 'amount',
              header: t['depositProductAccServiceTableAmount'],
              cellWidth: 'auto',
              isNumeric: true,
            },
          ]}
        />
      )}
    </GroupContainer>
  );
};
