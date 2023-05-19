import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import { asyncToast } from '@myra-ui/components';
import { Text } from '@myra-ui/foundations';
import { SettingsFooter } from '@myra-ui/templates';

import {
  useGetCoaFullViewQuery,
  useGetPearlsReportsFormulaQuery,
  useUpdatePearlsReportFormulaMutation,
} from '@coop/cbs/data-access';

import { FormulaEditor } from '../components/forumula/FormulaEditor';

interface ReportSettingsProps {
  indicator: 'P1' | 'P2X' | 'P2' | 'E1' | 'E5' | 'E6' | 'E7' | 'E8' | 'A1' | 'A2' | 'L1' | 'L2';
}

type Formula = {
  expression: string;
  variables: Record<string, string>;
};

export const PEARLSReportSettings = ({ indicator }: ReportSettingsProps) => {
  const [formula, setFormula] = useState<Formula | null>(null);

  const { data, isFetching } = useGetPearlsReportsFormulaQuery();
  const { mutateAsync: updateFormula } = useUpdatePearlsReportFormulaMutation();
  const { data: coaView } = useGetCoaFullViewQuery();

  const pearlsGroup = data?.settings?.general?.reports?.pearls?.list?.find(
    (group) => group?.indicatorId === indicator
  );

  useEffect(() => {
    if (pearlsGroup?.expression && pearlsGroup?.values) {
      setFormula({
        expression: pearlsGroup?.expression,
        variables: pearlsGroup?.values,
      });
    }
  }, [isFetching, indicator]);

  return (
    <>
      <Box p="s16" display="flex" flexDir="column" gap="s16">
        <Box display="flex" flexDir="column" gap="s4">
          <Text fontSize="r1" color="gray.800" fontWeight="600" lineHeight="16.25px">
            {pearlsGroup?.indicatorId} - {pearlsGroup?.header}
          </Text>
          <Text fontSize="s3" color="gray.600" fontWeight="500" lineHeight="16.25px">
            {pearlsGroup?.description}
          </Text>
        </Box>

        {formula && (
          <Box
            p="s16"
            border="1px"
            borderColor="border.layout"
            display="flex"
            flexDir="column"
            gap="s16"
            borderRadius="br2"
          >
            <FormulaEditor
              label="Expression"
              formula={formula}
              onFormulaEdit={(newFormula) => setFormula(newFormula)}
            />
            <Box display="flex" flexDir="column" gap="s8">
              <Text fontSize="r1" fontWeight={500} color="gray.700">
                Ledger Code & Names
              </Text>
              <Box display="flex" flexDir="column">
                {Object.values(formula.variables).map((variables) => (
                  <>
                    {variables.split(',').map((v) => (
                      <Box fontSize="r1" color="gray.800">
                        {`${v} -  ${
                          coaView?.settings?.chartsOfAccount?.fullView.data?.find(
                            (d) => d?.id === v
                          )?.name?.local
                        }`}
                      </Box>
                    ))}
                  </>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <SettingsFooter
        handleSave={async () => {
          if (formula?.variables) {
            await asyncToast({
              id: 'formula',
              msgs: {
                success: 'Formula Updated',
                loading: 'Updated Formula',
              },
              promise: updateFormula({
                data: {
                  values: formula?.variables,
                },
                indicatorId: indicator,
              }),
            });
          }
        }}
        handleDiscard={() => {
          if (pearlsGroup?.expression && pearlsGroup?.values) {
            setFormula({
              expression: pearlsGroup?.expression,
              variables: pearlsGroup?.values,
            });
          }
        }}
      />
    </>
  );
};
