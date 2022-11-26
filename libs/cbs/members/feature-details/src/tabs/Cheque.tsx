import { IoAdd } from 'react-icons/io5';

import { Box, Button, Icon, Text } from '@myra-ui';

import { ChequeTable } from '../components';

export const Cheques = () => (
  <>
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Text fontSize="r3" fontWeight="600">
        Cheques
      </Text>
      <Button leftIcon={<Icon as={IoAdd} />}>New Cheque</Button>
    </Box>
    <ChequeTable />
  </>
);
