import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AccordionPanel } from '@chakra-ui/react';

import {
  PrematurePenaltyDateType,
  useGetAccountOpenProductPenaltyQuery,
} from '@coop/cbs/data-access';
import { Accordion, AccordionButton, AccordionItem, Box, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { CriteriaCard } from './CriteriaCard';

interface IcomponentProps {
  productId: string;
}

export const AccordianComponent = ({ productId }: IcomponentProps) => {
  const { t } = useTranslation();
  const [triggerQuery, setTriggerQuery] = useState(false);
  const poductDetails = useGetAccountOpenProductPenaltyQuery(
    { productId },
    {
      enabled: triggerQuery,
    }
  );
  const penaltyData =
    poductDetails?.data?.settings?.general?.depositProduct?.getPenaltyRebateInfo?.data?.penalty;
  const rebateData =
    poductDetails?.data?.settings?.general?.depositProduct?.getPenaltyRebateInfo?.data?.rebate;
  const prematurePenaltyData =
    poductDetails?.data?.settings?.general?.depositProduct?.getPenaltyRebateInfo?.data
      ?.prematurePenalty;
  const withdrawData =
    poductDetails?.data?.settings?.general?.depositProduct?.getPenaltyRebateInfo?.data
      ?.withdrawPenalty;

  useEffect(() => {
    if (productId) {
      setTriggerQuery(true);
    }
  }, [productId]);

  return (
    <Box border="1px solid" borderColor="border.layout" borderRadius="br2">
      <Accordion borderBottom="1px" borderBottomColor="border.layout" allowToggle>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                border="none"
                p="s16"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                _hover={{}}
                _expanded={{}}
                h="40px"
              >
                <Text color="gray.800" fontWeight="500" fontSize="r1">
                  Criteria
                </Text>
                <Icon
                  as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                  color="gray.800"
                  flexShrink={0}
                />
              </AccordionButton>
              <AccordionPanel p="s16">
                <CriteriaCard productId={productId} />
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                border="none"
                p="s16"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                h="40px"
              >
                <Text color="gray.800" fontWeight="500" fontSize="r1">
                  Penalty
                </Text>
                <Icon
                  as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                  color="gray.800"
                  flexShrink={0}
                />
              </AccordionButton>
              <AccordionPanel p="s16">
                <Box px="s20">
                  <ul>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Days from end date
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {penaltyData?.dayAfterInstallmentDate}
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Rate
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {penaltyData?.penaltyRate} %
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Amount
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {penaltyData?.penaltyAmount}
                        </Text>
                      </Box>
                    </li>
                  </ul>
                </Box>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                border="none"
                p="s16"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                h="40px"
                _hover={{}}
                _expanded={{}}
              >
                <Text color="gray.800" fontWeight="500" fontSize="r1">
                  Rebate
                </Text>
                <Icon
                  as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                  color="gray.800"
                  flexShrink={0}
                />
              </AccordionButton>
              <AccordionPanel p="s16">
                <Box px="s20">
                  <ul>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Days before the installment date
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {rebateData?.dayBeforeInstallmentDate}
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          No. of installments
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {rebateData?.noOfInstallment} %
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Amount
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {rebateData?.rebateAmount}
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Percentage of Deposited Amount
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {rebateData?.rebateAmount} %
                        </Text>
                      </Box>
                    </li>
                  </ul>
                </Box>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                border="none"
                p="s16"
                bg="white"
                display="flex"
                alignItems="center"
                h="40px"
                justifyContent="space-between"
                _hover={{}}
                _expanded={{}}
              >
                <Text color="gray.800" fontWeight="500" fontSize="r1">
                  Premature Penalty Setup
                </Text>
                <Icon
                  as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                  color="gray.800"
                  flexShrink={0}
                />
              </AccordionButton>
              <AccordionPanel p="s16">
                <Box px="s20">
                  <ul>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Date Type
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {(prematurePenaltyData?.penaltyDateType ===
                            PrematurePenaltyDateType.EffectiveDaysFromStart &&
                            t['effectiveDaysFromStart']) ||
                            (prematurePenaltyData?.penaltyDateType ===
                              PrematurePenaltyDateType.RemainingDaysToGetMatured &&
                              t['remainingDaysToGetMatured'])}
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          No. of Days
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {prematurePenaltyData?.noOfDays} %
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Ledger Mapping
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {prematurePenaltyData?.penaltyLedgerMapping}
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Amount
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {prematurePenaltyData?.penaltyAmount}
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Rate
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {prematurePenaltyData?.penaltyRate}%
                        </Text>
                      </Box>
                    </li>
                  </ul>
                </Box>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                border="none"
                p="s16"
                bg="white"
                display="flex"
                alignItems="center"
                h="40px"
                justifyContent="space-between"
                _hover={{}}
                _expanded={{}}
              >
                <Text color="gray.800" fontWeight="500" fontSize="r1">
                  Withdraw Penalty Setup
                </Text>
                <Icon
                  as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                  color="gray.800"
                  flexShrink={0}
                />
              </AccordionButton>
              <AccordionPanel p="s16">
                <Box px="s20">
                  <ul>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Amount
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {withdrawData?.penaltyAmount}
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Rate
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {withdrawData?.penaltyRate} %
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Ledger Mapping
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {withdrawData?.penaltyLedgerMapping}
                        </Text>
                      </Box>
                    </li>
                  </ul>
                </Box>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
