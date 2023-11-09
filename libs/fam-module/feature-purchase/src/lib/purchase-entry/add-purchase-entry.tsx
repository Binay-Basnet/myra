import { useForm } from 'react-hook-form';

import { Box, FormHeader, FormSection, GridItem, Input, Text } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormDatePicker,
  FormEditableTable,
  FormInput,
  FormLayout,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';

type SupplierEntryTableType = {
  id: string;
  itemDetails: string;
  quantity: string;
  rate: string;
  tax: string;
  amount: string;
};
export const AddPurchaseEntry = () => {
  const onSave = () => {
    // console.log('save clicked');
  };
  const methods = useForm();

  return (
    <FormLayout hasSidebar methods={methods}>
      <FormHeader title="New Purchase Entry" closeLink={ROUTES.FAM_PURCHASE_ENTRY_LIST} />

      <FormLayout.Content>
        <FormLayout.Form>
          <SectionContainer>
            <FormSection templateColumns={3}>
              <GridItem colSpan={2}>
                <FormSelect
                  isRequired
                  name="SupplierName"
                  label="Supplier Name"
                  options={[]}
                  isLoading={false}
                />
              </GridItem>
              <FormDatePicker name="InvoiceDate" label="Invoice Date" />
              <FormDatePicker name="DueDate" label="Due Date" />

              <FormInput
                isRequired
                type="text"
                name="SupplierInvoiceReference"
                label="Supplier Invoice Reference"
              />
            </FormSection>

            <FormSection templateColumns={1}>
              <FormEditableTable<SupplierEntryTableType>
                name="data"
                defaultData={[
                  {
                    id: '0',
                    itemDetails: 'Laptop',
                    amount: '100000',
                    quantity: '1',
                    rate: '13%',
                    tax: '200',
                  },
                  {
                    id: '1',
                    itemDetails: 'Apple',
                    amount: '100000',
                    quantity: '1',
                    rate: '13%',
                    tax: '200',
                  },
                ]}
                columns={[
                  {
                    accessor: 'itemDetails',
                    header: 'Item Details',
                    cellWidth: 'auto',
                  },
                  {
                    accessor: 'quantity',
                    header: 'Quantity',
                    isNumeric: true,
                  },
                  {
                    accessor: 'rate',
                    header: 'Rate',
                    isNumeric: true,
                  },
                  {
                    accessor: 'tax',
                    header: 'Tax',
                    isNumeric: true,
                  },
                  {
                    accessor: 'amount',
                    header: 'Amount',
                    isNumeric: true,
                  },
                ]}
              />
            </FormSection>
            <FormSection templateColumns={2}>
              <FormTextArea name="Notes" label="Notes" minH="153px" />
              <Box display="flex" flexDir="column" gap="s8">
                <Box display="flex" justifyContent="space-between" w="full">
                  <Text variant="bodyRegular">Discount</Text>
                  <Box w="150px">
                    <Input />
                  </Box>
                </Box>
                <Box
                  p="s8"
                  borderRadius="br2"
                  bg="background.500"
                  display="flex"
                  flexDir="column"
                  gap="s8"
                >
                  <Box display="flex" flexDir="column" gap="s4">
                    <Box display="flex" justifyContent="space-between">
                      <Text variant="bodyRegular">Sub Total</Text>
                      <Text variant="navItems">5000.00</Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text variant="bodyRegular">Discount</Text>
                      <Text variant="navItems">5000.00</Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text variant="bodyRegular">Taxable Total</Text>
                      <Text variant="navItems">5000.00</Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text variant="bodyRegular">VAT</Text>
                      <Text variant="navItems">5000.00</Text>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text variant="navItems">VAT</Text>
                    <Text variant="navItems">5000.00</Text>
                  </Box>
                </Box>
              </Box>
            </FormSection>
            <FormSection header="TDS Information" templateColumns={3}>
              <FormSwitchTab
                options={[
                  { label: 'No TDS', value: 'noTDS' },
                  { label: 'TDS', value: 'TDS' },
                ]}
                name="TDS"
              />
              <GridItem colSpan={2} />
              <FormSelect
                isRequired
                name="TDSAccount "
                label="TDS Account "
                options={[]}
                isLoading={false}
              />
              <FormSelect
                isRequired
                name="TDSType"
                label="TDS Type"
                options={[]}
                isLoading={false}
              />
              <FormSelect
                isRequired
                name="TDSAmount"
                label="TDS Amount"
                options={[]}
                isLoading={false}
              />
            </FormSection>
            <FormSection header="Custom Fields" templateColumns={3}>
              <FormInput name="Label" label="Label" />
              <FormInput name="Label" label="Label" />
              <FormInput name="Label" label="Label" />
            </FormSection>
          </SectionContainer>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={onSave} />
    </FormLayout>
  );
};

export default AddPurchaseEntry;
