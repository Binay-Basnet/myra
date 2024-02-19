import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import { asyncToast } from '@myra-ui/components';
import { Text } from '@myra-ui/foundations';
import { SettingsFooter } from '@myra-ui/templates';

import {
  useGetCoaFullViewQuery,
  useGetCopomisReportSettingsQuery,
  useUpdateCopomisReportFormulaMutation,
} from '@coop/cbs/data-access';

import { FormulaEditor } from '../components/forumula/FormulaEditor';

interface ReportSettingsProps {
  indicator: string;
}

type Formula = {
  expression: string;
  variables: Record<string, string>;
};

export const COPOMISReportSettings = ({ indicator }: ReportSettingsProps) => {
  const [formula, setFormula] = useState<Formula | null>(null);

  const { data, isFetching } = useGetCopomisReportSettingsQuery();
  const { mutateAsync: updateFormula } = useUpdateCopomisReportFormulaMutation();
  const { data: coaView } = useGetCoaFullViewQuery();

  const copomisGroup = data?.settings?.general?.reports?.copomis?.list?.find(
    (group) => group?.id === indicator
  );

  useEffect(() => {
    if (copomisGroup?.expression && copomisGroup?.values) {
      setFormula({
        expression: copomisGroup?.expression,
        variables: copomisGroup?.values as Record<string, string>,
      });
    }
  }, [isFetching, indicator]);

  return (
    <>
      <Box p="s16" display="flex" flexDir="column" gap="s16">
        <Box display="flex" flexDir="column" gap="s4">
          <Text fontSize="r1" color="gray.800" fontWeight="600" lineHeight="16.25px">
            {copomisGroup?.indicatorName}
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
            {Object.values(formula.variables).filter(Boolean).length !== 0 && (
              <Box display="flex" flexDir="column" gap="s8">
                <Text fontSize="r1" fontWeight={500} color="gray.700">
                  Ledger Code & Names
                </Text>
                <Box display="flex" flexDir="column">
                  {Object.values(formula.variables).map((variables) => (
                    <>
                      {variables.split(',').map(
                        (v) =>
                          v && (
                            <Box fontSize="r1" color="gray.800">
                              {`${v} -  ${
                                coaView?.settings?.chartsOfAccount?.fullView.data?.find(
                                  (d) => d?.id === v
                                )?.name?.local
                              }`}
                            </Box>
                          )
                      )}
                    </>
                  ))}
                </Box>
              </Box>
            )}
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
                  expression: formula?.expression,
                  values: formula?.variables,
                },
                indicatorId: indicator,
              }),
            });
          }
        }}
        handleDiscard={() => {
          if (copomisGroup?.expression && copomisGroup?.values) {
            setFormula({
              expression: copomisGroup?.expression,
              variables: copomisGroup?.values as Record<string, string>,
            });
          }
        }}
      />
    </>
  );
};
