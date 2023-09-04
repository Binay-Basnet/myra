import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Button, FormSection, GridItem, Text } from '@myra-ui';

import { useTransferPLtoHoMutation } from '@coop/cbs/data-access';

export const TransferPLtoHO = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: transferPLtoHO } = useTransferPLtoHoMutation();

  const handleTransfer = () => {
    asyncToast({
      id: 'transfer-pl-to-ho',
      msgs: {
        loading: 'Transferring P/L to HO',
        success: 'Transferred P/L to HO',
      },
      promise: transferPLtoHO({}),
      onSuccess: () => queryClient.invalidateQueries(['getCurrentFundAmount']),
    });
  };

  return (
    <FormSection header="Transfer Profit/Loss to Head office">
      <GridItem colSpan={3}>
        <Text fontSize="r1">
          The PL balance are in branches, would you like to transfer it to head office to continue?
        </Text>
      </GridItem>

      <Button onClick={handleTransfer}>Transfer</Button>
    </FormSection>
  );
};
