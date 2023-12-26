import { asyncToast, Box, Button, Text } from '@myra-ui';

import { useSavingInterestPostingMutation } from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';

/* eslint-disable-next-line */
export interface EodActionsProps {}

export const EodActions = () => {
  const { mutateAsync: savingInterestPosting } = useSavingInterestPostingMutation();

  const handleInterestBooking = () => {
    asyncToast({
      id: 'saving-interest-posting',
      msgs: {
        loading: 'Posting saving interests',
        success: 'Saving interest posted',
      },
      promise: savingInterestPosting({}),
    });
  };

  return (
    <Box p="s16">
      <SettingsCard
        title="EOD Actions"
        // subtitle="Define what are the activities the system shall conduct during the day end process."
      >
        <Box display="flex">
          <Box display="flex" flexDirection="column" gap="s16" w="100%">
            <Box pb="s24" display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" flexDirection="column">
                <Text fontWeight="SemiBold" color="gray.800" fontSize="r1" lineHeight="17px">
                  Interest Booking
                </Text>
                <Text fontWeight="Regular" color="gray.600" fontSize="s3" lineHeight="150%">
                  This action will post all the interest accrued amount from accrued ledger of
                  Saving Accounts to their respective principal ledger
                </Text>
              </Box>

              <Button onClick={handleInterestBooking}>Perform Interest Booking</Button>
            </Box>
          </Box>
        </Box>
      </SettingsCard>
    </Box>
  );
};

export default EodActions;
