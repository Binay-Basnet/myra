import { FormEditableTable } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

type LoanProcessTableType = {
  serviceName: string;
  serviceID: string;
  serviceCharge: string;
};

export const LoanProcessTable = () => (
  <Box display="flex" flexDir="column" gap="s12">
    <Text fontSize="r1" fontWeight="Medium" color="Gray.800" lineHeight="150%">
      Loan Process Fee and Charges
    </Text>
    <FormEditableTable<LoanProcessTableType>
      name="data"
      columns={[
        {
          accessor: 'serviceName',
          header: 'Service Name',
        },
        {
          accessor: 'serviceID',
          header: 'Service ID',
        },
        {
          accessor: 'serviceCharge',
          header: 'Service Charge',
          isNumeric: true,
        },
      ]}
    />
  </Box>
);
