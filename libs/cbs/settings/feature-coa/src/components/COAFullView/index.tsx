import { useMemo } from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Text } from '@myra-ui';

import { CoaView, useGetChartOfAccountsQuery, useGetCoaFullViewQuery } from '@coop/cbs/data-access';

import Tree from '../Tree';
import { arrayToTreeCOA } from '../../utils/arrayToTree';

export const COAFullView = () => {
  const { data } = useGetChartOfAccountsQuery();
  const memberTypes = data?.settings?.general?.chartsOfAccount?.class?.data;

  const { data: fullView, isFetching } = useGetCoaFullViewQuery();

  const coaLiabilitiesFullView = useMemo(
    () =>
      fullView?.settings?.chartsOfAccount?.fullView.data
        ?.filter((account) => account?.accountClass === 'EQUITY_AND_LIABILITIES')
        .sort((a, b) =>
          Number(
            a?.accountCode?.localeCompare(b?.accountCode as string, undefined, {
              numeric: true,
              sensitivity: 'base',
            })
          )
        ) ?? [],
    [isFetching]
  );

  const coaLiabilitiesTree = useMemo(
    () => arrayToTreeCOA(coaLiabilitiesFullView as CoaView[]),
    [coaLiabilitiesFullView.length, isFetching]
  );

  const coaAssetsFullView = useMemo(
    () =>
      fullView?.settings?.chartsOfAccount?.fullView.data
        ?.filter((account) => account?.accountClass === 'ASSETS')
        .sort((a, b) =>
          Number(
            a?.accountCode?.localeCompare(b?.accountCode as string, undefined, {
              numeric: true,
              sensitivity: 'base',
            })
          )
        ) ?? [],

    [isFetching]
  );

  const coaAssetsTree = useMemo(
    () => arrayToTreeCOA(coaAssetsFullView as CoaView[]),
    [coaAssetsFullView.length, isFetching]
  );

  const coaExpenditureFullView = useMemo(
    () =>
      fullView?.settings?.chartsOfAccount?.fullView.data
        ?.filter((account) => account?.accountClass === 'EXPENDITURE')
        .sort((a, b) => (String(a?.accountCode) > String(b?.accountCode) ? 1 : -1)) ?? [],

    [isFetching]
  );

  const coaExpenditureTree = useMemo(
    () => arrayToTreeCOA(coaExpenditureFullView as CoaView[]),
    [coaExpenditureFullView.length, isFetching]
  );

  const coaIncomeFullView = useMemo(
    () =>
      fullView?.settings?.chartsOfAccount?.fullView.data
        ?.filter((account) => account?.accountClass === 'INCOME')
        .sort((a, b) => (String(a?.accountCode) > String(b?.accountCode) ? 1 : -1)) ?? [],

    [isFetching]
  );

  const coaIncomeTree = useMemo(
    () => arrayToTreeCOA(coaIncomeFullView as CoaView[]),
    [coaIncomeFullView.length, isFetching]
  );

  return (
    <Box p="10px" display="flex" flexDirection="column" justifyContent="space-between">
      <Accordion allowMultiple allowToggle mb="0" border="none">
        {memberTypes?.map((memberType) => (
          <AccordionItem key={memberType?.id} mt="s8">
            {({ isExpanded }) => (
              <>
                <AccordionButton p="s12" bg={isExpanded ? '#E0E5EB' : ''} h="60px">
                  <Box flex="1" textAlign="left">
                    <Text fontSize="r1" fontWeight="SemiBold">
                      {memberType?.name}
                    </Text>
                  </Box>
                  {isExpanded ? (
                    <IoChevronUpOutline fontSize="18px" />
                  ) : (
                    <IoChevronDownOutline fontSize="18px" />
                  )}
                </AccordionButton>
                <AccordionPanel display="flex" flexDir="column" gap="s16">
                  {memberType.name.toLowerCase() === 'equity and liabilities' &&
                    coaLiabilitiesTree.map((account) => (
                      <Tree current={account} data={account.children} />
                    ))}
                  {memberType.name.toLowerCase() === 'assets' &&
                    coaAssetsTree.map((account) => (
                      <Tree current={account} data={account.children} />
                    ))}
                  {memberType.name.toLowerCase() === 'expenditure' &&
                    coaExpenditureTree.map((account) => (
                      <Tree current={account} data={account.children} />
                    ))}
                  {memberType.name.toLowerCase() === 'income' &&
                    coaIncomeTree.map((account) => (
                      <Tree current={account} data={account.children} />
                    ))}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};
