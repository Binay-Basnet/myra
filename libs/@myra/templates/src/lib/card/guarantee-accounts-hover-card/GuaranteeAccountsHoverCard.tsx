import { ReactNode } from 'react';

import { HoverCard, Tooltip } from '@myra-ui/components';
import { Box, Text } from '@myra-ui/foundations';

import { RedirectButton, ROUTES } from '@coop/cbs/utils';

export type AssociatedGuaranteeAccounts = {
  loanAccountName: string;
  loanId: string;
}[];

/* eslint-disable-next-line */
export interface GuaranteeAccountsHoverCardProps {
  trigger: ReactNode;
  associatedGuaranteeAccounts: AssociatedGuaranteeAccounts;
}

export const GuaranteeAccountsHoverCard = ({
  trigger,
  associatedGuaranteeAccounts,
}: GuaranteeAccountsHoverCardProps) => (
  <HoverCard>
    <HoverCard.Trigger>{trigger}</HoverCard.Trigger>
    <HoverCard.Content>
      <HoverCard.Header>
        <Text fontWeight={500} fontSize="r1" color="gary.700" p="s16">
          Associated Guarantee Accounts
        </Text>
      </HoverCard.Header>
      <HoverCard.Body>
        <Box p="s16" display="flex" flexDirection="column">
          {associatedGuaranteeAccounts?.map(
            (account) =>
              account?.loanAccountName &&
              account?.loanId && (
                <RedirectButton
                  label={<Tooltip title={account?.loanAccountName as string} />}
                  link={`${ROUTES.CBS_LOAN_ACCOUNT_DETAILS}?id=${account?.loanId}`}
                />
              )
          )}
        </Box>
      </HoverCard.Body>
    </HoverCard.Content>
  </HoverCard>
);

export default GuaranteeAccountsHoverCard;
