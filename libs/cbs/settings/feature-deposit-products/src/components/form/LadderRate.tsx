import { useFormContext } from 'react-hook-form';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { FormEditableTable, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type SalesTable = {
  type: string;
  amount: number;
  rate: number;
};

export const LadderRate = () => {
  const { watch } = useFormContext<{
    ladderRateData: SalesTable[];
    nature: NatureOfDepositProduct;
    ladderRate: boolean;
    allowLoan: boolean;
    withdrawRestricted: boolean;
  }>();
  const { t } = useTranslation();

  const ladderRate = watch('ladderRate');

  const ladderSwitch = [
    {
      label: t['yes'],
      value: true,
    },
    {
      label: t['no'],
      value: false,
    },
  ];

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <Box display={'flex'} flexDirection="column" gap="s20">
          <Box alignItems="center" display={'flex'} justifyContent="space-between">
            <Text color="neutralColorLight.Gray-70" fontSize={'s3'} fontWeight="Medium">
              {t['depositProductLadderRate']}
            </Text>
            <FormSwitchTab name="ladderRate" options={ladderSwitch} />
          </Box>
          {ladderRate && (
            <FormEditableTable<SalesTable>
              name="ladderRateData"
              columns={[
                {
                  accessor: 'type',
                  header: t['depositProductInterestType'],
                  accessorFn: () => 'More Than',
                },
                {
                  accessor: 'amount',
                  header: t['depositProductInterestLadderAmount'],
                  isNumeric: true,
                },
                {
                  accessor: 'rate',
                  header: t['depositProductInterestLadderRate'],
                  fieldType: 'percentage',
                  isNumeric: true,
                },
              ]}
            />
          )}
        </Box>
      </GridItem>
    </FormSection>
  );
};
