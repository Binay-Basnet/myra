import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { AssignedMembersCard } from '@coop/cbs/transactions/ui-components';
import { FormEditableTable } from '@coop/shared/form';
import {
  Alert,
  Box,
  Button,
  DetailPageContentCard,
  Text,
} from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface AgentDetailOverviewProps {}

type DepositAccountTable = {
  memberId: string;
  accountId: string;
  amount: 600;
  memberName: string;
};

export function AgentDetailOverview() {
  const methods = useForm();

  const [showMemberTable, setShowMemberTable] = useState<boolean>(false);

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <AssignedMembersCard />

      {!showMemberTable && (
        <Alert
          status="info"
          title="Create Today's List"
          showUndo={true}
          undoText="Create Today's List"
          undoHandler={() => setShowMemberTable(true)}
        />
      )}

      {showMemberTable && (
        <DetailPageContentCard
          header="Today's List"
          showFooter={true}
          footerButtons={
            <>
              <Button variant="ghost">Discard</Button>

              <Button>Save Changes</Button>
            </>
          }
        >
          <Box p="s16">
            <FormProvider {...methods}>
              <FormEditableTable<DepositAccountTable>
                name="accounts"
                columns={[
                  {
                    accessor: 'memberId',
                    header: 'Member',
                    cellWidth: 'auto',
                    fieldType: 'search',
                    // searchOptions: accountListSearchOptions,
                    cell: (row) => (
                      <Box display="flex" flexDirection="column" gap="s4">
                        <Text
                          fontSize="r1"
                          fontWeight={500}
                          color="neutralColorLight.Gray-80"
                        >
                          {row?.memberName}
                        </Text>
                        <Text
                          fontSize="s3"
                          fontWeight={500}
                          color="neutralColorLight.Gray-60"
                        >
                          {row?.memberId}
                        </Text>
                      </Box>
                    ),
                  },
                  {
                    accessor: 'accountId',
                    header: 'Account',
                    isNumeric: true,
                  },
                  {
                    accessor: 'amount',
                    header: 'Amount',
                    isNumeric: true,
                    // accessorFn: (row) =>
                    //   row.quantity
                    //     ? Number(row.value) * Number(row.quantity)
                    //     : '0',
                  },
                ]}
                // defaultData={accountListDefaultData}
                searchPlaceholder="Search or add member"
                // canDeleteRow={false}
                // canAddRow={false}
              />
            </FormProvider>
          </Box>
        </DetailPageContentCard>
      )}
    </Box>
  );
}

export default AgentDetailOverview;
