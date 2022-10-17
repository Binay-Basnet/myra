import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AccordionPanel } from '@chakra-ui/react';

import {
  NatureOfDepositProduct,
  PrematurePenaltyDateType,
  useGetAccountOpenProductDetailsQuery,
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
  const productDetails = useGetAccountOpenProductDetailsQuery(
    { id: productId },
    {
      enabled: triggerQuery,
    }
  );
  const productNature =
    productDetails?.data?.settings?.general?.depositProduct?.formState?.data?.nature;
  const isMandatoryFlag =
    productDetails?.data?.settings?.general?.depositProduct?.formState?.data?.isMandatorySaving;
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
        {(productNature === NatureOfDepositProduct?.RecurringSaving ||
          productNature === NatureOfDepositProduct?.TermSavingOrFd ||
          (productNature === NatureOfDepositProduct?.Saving && isMandatoryFlag)) && (
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
                      {penaltyData?.dayAfterInstallmentDate && (
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
                      )}
                      {penaltyData?.penaltyRate && (
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
                      )}
                      {penaltyData?.penaltyAmount && (
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
                      )}
                    </ul>
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        )}
        {(productNature === NatureOfDepositProduct?.RecurringSaving ||
          (productNature === NatureOfDepositProduct?.Saving && isMandatoryFlag)) && (
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
                      {rebateData?.dayBeforeInstallmentDate && (
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
                      )}
                      {rebateData?.noOfInstallment && (
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
                      )}
                      {rebateData?.rebateAmount && (
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
                      )}
                      {rebateData?.rebateRate && (
                        <li>
                          <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                            <Text fontWeight="400" fontSize="s3">
                              Percentage of Deposited Amount
                            </Text>

                            <Text fontWeight="600" fontSize="s3">
                              {rebateData?.rebateRate} %
                            </Text>
                          </Box>
                        </li>
                      )}
                    </ul>
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        )}
        {productNature !== NatureOfDepositProduct?.Current &&
          productNature !== NatureOfDepositProduct?.Saving && (
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
                        {prematurePenaltyData?.penaltyDateType && (
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
                        )}
                        {prematurePenaltyData?.noOfDays && (
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
                        )}
                        {prematurePenaltyData?.penaltyLedgerMapping && (
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
                        )}
                        {prematurePenaltyData?.penaltyAmount && (
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
                        )}
                        {prematurePenaltyData?.penaltyRate && (
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
                        )}
                      </ul>
                    </Box>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          )}
        {productNature !== NatureOfDepositProduct?.Current &&
          productNature !== NatureOfDepositProduct?.Saving && (
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
                        {withdrawData?.penaltyAmount && (
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
                        )}
                        {withdrawData?.penaltyRate && (
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
                        )}
                        {withdrawData?.penaltyLedgerMapping && (
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
                        )}
                      </ul>
                    </Box>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          )}
      </Accordion>
    </Box>
  );
};
