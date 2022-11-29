import React, { useEffect, useMemo, useState } from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useDisclosure } from '@chakra-ui/react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  ChakraModal,
  Input,
  Text,
} from '@myra-ui';

import { GetCoaFullViewQuery, useGetCoaFullViewQuery } from '@coop/cbs/data-access';

import { BaseType, MultiTree } from './Tree';

interface ICOASelectModalProps {
  trigger: (props: { id: string; name: string; under: string } | null) => React.ReactNode;
  defaultValue: string | undefined | null;
  onChange: (newValue: string) => void;
}

export const COASelectModal = ({ onChange, trigger, defaultValue }: ICOASelectModalProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const [accordionIndices, setAccordionIndices] = useState<number[]>([]);
  const [value, setValue] = useState<BaseType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: fullView, isFetching } = useGetCoaFullViewQuery();
  const coaLiabilitiesFullView = useMemo(
    () => getCOA(fullView, 'EQUITY_AND_LIABILITIES'),
    [fullView?.settings?.chartsOfAccount?.fullView.data]
  );

  const coaAssetsFullView = useMemo(
    () => getCOA(fullView, 'ASSETS'),
    [fullView?.settings?.chartsOfAccount?.fullView.data]
  );
  const coaExpenditureFullView = useMemo(
    () => getCOA(fullView, 'EXPENDITURE'),
    [fullView?.settings?.chartsOfAccount?.fullView.data]
  );
  const coaIncomeFullView = useMemo(
    () => getCOA(fullView, 'INCOME'),
    [fullView?.settings?.chartsOfAccount?.fullView.data]
  );

  // TODO !DO SOMETHING ABOUT THESE EFFECTS!
  useEffect(() => {
    if (value) {
      onClose();
      setSearchTerm('');
      setAccordionIndices([]);
    }
  }, [value]);

  useEffect(() => {
    if (searchTerm) {
      setAccordionIndices([0, 1, 2, 3]);
    } else {
      setAccordionIndices([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (value?.id) {
      onChange(value?.id);
    }
  }, [value?.id]);

  useEffect(() => {
    const allLedgers = [
      ...coaLiabilitiesFullView,
      ...coaAssetsFullView,
      ...coaExpenditureFullView,
      ...coaIncomeFullView,
    ];

    const foundLedger = allLedgers.find((ledger) => ledger?.id === defaultValue);

    if (foundLedger) {
      setValue({ ...foundLedger, children: [] });
    } else {
      setValue(null);
    }
  }, [defaultValue, isFetching]);

  return (
    <>
      <Box key={JSON.stringify(value)} w="100%" h="100%" onClick={onToggle}>
        {trigger(value)}
      </Box>

      <ChakraModal
        width="4xl"
        scrollBehavior="inside"
        open={isOpen}
        onClose={onClose}
        title="Ledger Mapping"
      >
        <Input
          value={searchTerm}
          type="search"
          placeholder="Search for ledger"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Box minH="50vh" display="flex" flexDir="column" py="s16" gap="s16" bg="white">
          <Accordion index={accordionIndices} allowMultiple allowToggle mb="0" border="none">
            <AccordionItem mt="s8">
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    onClick={() => {
                      setAccordionIndices((prev) =>
                        prev?.includes(0) ? prev?.filter((p) => p !== 0) : [...prev, 0]
                      );
                    }}
                    p="s12"
                    bg={isExpanded ? '#E0E5EB' : ''}
                    h="60px"
                  >
                    <Box flex="1" textAlign="left">
                      <Text fontSize="r1" fontWeight="SemiBold">
                        Equity and Liabilities
                      </Text>
                    </Box>
                    {isExpanded ? (
                      <IoChevronUpOutline fontSize="18px" />
                    ) : (
                      <IoChevronDownOutline fontSize="18px" />
                    )}
                  </AccordionButton>

                  <AccordionPanel display="flex" flexDir="column" gap="s16">
                    <MultiTree
                      value={value}
                      setValue={(newValue) => setValue(newValue)}
                      data={coaLiabilitiesFullView ?? []}
                      searchTerm={searchTerm}
                    />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem mt="s8">
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    onClick={() => {
                      setAccordionIndices((prev) =>
                        prev?.includes(1) ? prev?.filter((p) => p !== 1) : [...prev, 1]
                      );
                    }}
                    p="s12"
                    bg={isExpanded ? '#E0E5EB' : ''}
                    h="60px"
                  >
                    <Box flex="1" textAlign="left">
                      <Text fontSize="r1" fontWeight="SemiBold">
                        Assets
                      </Text>
                    </Box>
                    {isExpanded ? (
                      <IoChevronUpOutline fontSize="18px" />
                    ) : (
                      <IoChevronDownOutline fontSize="18px" />
                    )}
                  </AccordionButton>

                  <AccordionPanel display="flex" flexDir="column" gap="s16">
                    <MultiTree
                      value={value}
                      setValue={(newValue) => setValue(newValue)}
                      data={coaAssetsFullView ?? []}
                      searchTerm={searchTerm}
                    />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>

            <AccordionItem mt="s8">
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    onClick={() => {
                      setAccordionIndices((prev) =>
                        prev?.includes(2) ? prev?.filter((p) => p !== 2) : [...prev, 2]
                      );
                    }}
                    p="s12"
                    bg={isExpanded ? '#E0E5EB' : ''}
                    h="60px"
                  >
                    <Box flex="1" textAlign="left">
                      <Text fontSize="r1" fontWeight="SemiBold">
                        Expenditure
                      </Text>
                    </Box>
                    {isExpanded ? (
                      <IoChevronUpOutline fontSize="18px" />
                    ) : (
                      <IoChevronDownOutline fontSize="18px" />
                    )}
                  </AccordionButton>

                  <AccordionPanel display="flex" flexDir="column" gap="s16">
                    <MultiTree
                      value={value}
                      setValue={(newValue) => setValue(newValue)}
                      data={coaExpenditureFullView ?? []}
                      searchTerm={searchTerm}
                    />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
            <AccordionItem mt="s8">
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    onClick={() => {
                      setAccordionIndices((prev) =>
                        prev?.includes(3) ? prev?.filter((p) => p !== 3) : [...prev, 3]
                      );
                    }}
                    p="s12"
                    bg={isExpanded ? '#E0E5EB' : ''}
                    h="60px"
                  >
                    <Box flex="1" textAlign="left">
                      <Text fontSize="r1" fontWeight="SemiBold">
                        Income
                      </Text>
                    </Box>
                    {isExpanded ? (
                      <IoChevronUpOutline fontSize="18px" />
                    ) : (
                      <IoChevronDownOutline fontSize="18px" />
                    )}
                  </AccordionButton>

                  <AccordionPanel display="flex" flexDir="column" gap="s16">
                    <MultiTree
                      value={value}
                      setValue={(newValue) => setValue(newValue)}
                      data={coaIncomeFullView ?? []}
                      searchTerm={searchTerm}
                    />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Box>
      </ChakraModal>
    </>
  );
};

const getCOA = (data: GetCoaFullViewQuery | undefined, type: string) =>
  data?.settings?.chartsOfAccount?.fullView.data
    ?.filter((account) => account?.accountClass === type)
    .sort((a, b) =>
      Number(
        a?.accountCode?.localeCompare(b?.accountCode as string, undefined, {
          numeric: true,
          sensitivity: 'base',
        })
      )
    )
    .map((coa) => ({
      id: coa?.id as string,
      name: coa?.name.local as string,
      under: coa?.under as string,
    })) ?? [];
