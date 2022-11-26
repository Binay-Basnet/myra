import { FormEditableTable } from '@coop/shared/form';
import { Box } from '@myra-ui';

type JournalVouchersTableType = {
  transferred_to: string;
  dr_amount: string;
  cr_amount: string;
  description: string;
};

export const JournalVouchersTable = () => (
  <Box display="flex" flexDir="column" gap="s12">
    <FormEditableTable<JournalVouchersTableType>
      name="data"
      columns={[
        {
          accessor: 'transferred_to',
          header: 'Account',
          cellWidth: 'auto',
          fieldType: 'select',
          selectOptions: [
            {
              label: 'House Expense',
              value: 'savings_account',
            },
            {
              label: 'Repair and Maintenance',
              value: 'current_account',
            },
            {
              label: 'Employee Expenses',
              value: 'employee_expense',
            },
            {
              label: 'Meeting Allowance',
              value: 'Meeting Allowance',
            },
            {
              label: 'Prabhu Bank',
              value: 'Prabhu Bank',
            },
            {
              label: 'Siddhartha Bank',
              value: 'siddhartha-bank',
            },
            {
              label: 'Himalayan Bank',
              value: 'himalayan-bank',
            },
            {
              label: 'NIC Asia',
              value: 'nic-asia',
            },
          ],
        },
        {
          accessor: 'dr_amount',
          header: 'DR Amount',
          isNumeric: true,
        },
        {
          accessor: 'cr_amount',
          header: 'CR Amount',
          isNumeric: true,
        },
        {
          accessor: 'description',
          hidden: true,
          fieldType: 'textarea',
          header: 'Description',
        },
      ]}
    />
    <Box
      display="flex"
      h="s36"
      px="s36"
      borderRadius="br2"
      bg="background.500"
      alignItems="center"
      fontSize="r1"
      fontWeight="500"
    >
      <Box
        w="67%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="end"
        textAlign="right"
        px="s12"
        borderRight="1px"
        borderColor="border.layout"
      >
        Total
      </Box>
      <Box
        w="20%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="end"
        textAlign="right"
        px="s12"
        borderRight="1px"
        borderColor="border.layout"
      >
        4500
      </Box>{' '}
      <Box
        w="20%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="end"
        textAlign="right"
        px="s12"
        borderRight="1px"
        borderColor="border.layout"
      >
        4500
      </Box>
    </Box>
    <Box w="100%" textAlign="right" fontSize="s3" fontWeight={500} color="gray.700">
      Difference: NPR 0
    </Box>
  </Box>
);
