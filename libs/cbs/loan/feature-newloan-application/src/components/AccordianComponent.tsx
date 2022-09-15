import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AccordionPanel } from '@chakra-ui/react';

import { useGetLoanProductDetailsDataQuery } from '@coop/cbs/data-access';
import { Accordion, AccordionButton, AccordionItem, Box, Icon, Text } from '@coop/shared/ui';

import { CriteriaCard } from './CriteriaCard';

interface IcomponentProps {
  productId: string;
}

export const AccordianComponent = ({ productId }: IcomponentProps) => {
  const [triggerQuery, setTriggerQuery] = useState(false);
  const poductDetails = useGetLoanProductDetailsDataQuery(
    { id: productId },
    {
      enabled: triggerQuery,
    }
  );
  const penaltyOnInstallmentData =
    poductDetails?.data?.settings?.general?.loanProducts?.formState?.data?.penaltyOnInstallment;
  const rebateData = poductDetails?.data?.settings?.general?.loanProducts?.formState?.data?.rebate;
  const penaltyOnInterestData =
    poductDetails?.data?.settings?.general?.loanProducts?.formState?.data?.penaltyOnInterest;
  const penaltyOnPrincipalData =
    poductDetails?.data?.settings?.general?.loanProducts?.formState?.data?.penaltyOnPrincipal;

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
                  Penalty on Principal{' '}
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
                          {penaltyOnPrincipalData?.dayAfterInstallmentDate}
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Rate
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {penaltyOnPrincipalData?.penaltyRate} %
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Amount
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {penaltyOnPrincipalData?.penaltyAmount}
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
              >
                <Text color="gray.800" fontWeight="500" fontSize="r1">
                  Penalty on Interest
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
                          {penaltyOnInterestData?.dayAfterInstallmentDate}
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Rate
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {penaltyOnInterestData?.penaltyRate} %
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Amount
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {penaltyOnInterestData?.penaltyAmount}
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
              >
                <Text color="gray.800" fontWeight="500" fontSize="r1">
                  Penalty on Installment
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
                          {penaltyOnInstallmentData?.dayAfterInstallmentDate}
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Rate
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {penaltyOnInstallmentData?.penaltyRate} %
                        </Text>
                      </Box>
                    </li>
                    <li>
                      <Box display="flex" flexDirection="row" gap="s4" flexWrap="wrap">
                        <Text fontWeight="400" fontSize="s3">
                          Penalty Amount
                        </Text>

                        <Text fontWeight="600" fontSize="s3">
                          {penaltyOnInstallmentData?.penaltyAmount}
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
      </Accordion>
    </Box>
  );
};
