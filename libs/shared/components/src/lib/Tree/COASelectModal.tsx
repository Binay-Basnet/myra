import React, { useEffect, useMemo, useState } from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useDisclosure } from '@chakra-ui/react';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Input,
  Modal,
  Text,
} from '@myra-ui';

import { GetCoaFullViewQuery, useGetCoaFullViewQuery } from '@coop/cbs/data-access';

import { BaseType, MultiTree } from './Tree';
import { MultiTreeV1 } from './Tree-v1';

interface ICOASelectModalProps {
  trigger: (props: { id: string; name: string; under: string } | null) => React.ReactNode;
  defaultValue: string | undefined | null;
  onChange: (newValue: string) => void;
}

export const COASelectModal = ({ onChange, trigger, defaultValue }: ICOASelectModalProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const [value, setValue] = useState<BaseType | null>(null);

  return (
    <>
      <Box key={JSON.stringify(value)} w="100%" h="100%" onClick={onToggle}>
        {trigger(value)}
      </Box>

      <Modal
        width="4xl"
        scrollBehavior="inside"
        open={isOpen}
        onClose={onClose}
        title="Ledger Mapping"
      >
        <COATree
          setValue={setValue}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onClose={onClose}
        />
      </Modal>
    </>
  );
};

interface COATreeProps {
  defaultValue: string | undefined | null;
  onChange: (newValue: string) => void;
  onClose: () => void;

  type: 'single' | 'multi';

  value: BaseType | null;
  setValue: React.Dispatch<React.SetStateAction<BaseType | null>>;
}

export const COATree = ({ defaultValue, onChange, onClose, value, setValue }: COATreeProps) => {
  const [accordionIndices, setAccordionIndices] = useState<number[]>([]);
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
  const coaOffSheetBalanceFullView = useMemo(
    () => getCOA(fullView, 'OFF_BALANCE_SHEET'),
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
    if (!searchTerm) {
      //   setAccordionIndices([0, 1, 2, 3, 4]);
      // } else {
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
      ...coaOffSheetBalanceFullView,
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
                  <MultiTreeV1
                    isMulti
                    value={value}
                    onValueChange={(newValue) => setValue(newValue)}
                    data={coaLiabilitiesFullView || []}
                    searchTerm={searchTerm}
                  />

                  {/* <MultiTree */}
                  {/*  index={0} */}
                  {/*  value={value} */}
                  {/*  setValue={(newValue) => setValue(newValue)} */}
                  {/*  data={coaLiabilitiesFullView ?? []} */}
                  {/*  searchTerm={searchTerm} */}
                  {/*  setAccordianIndices={setAccordionIndices} */}
                  {/*  accordionIndices={accordionIndices} */}
                  {/* /> */}
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
                    index={1}
                    value={value}
                    setValue={(newValue) => setValue(newValue)}
                    data={coaAssetsFullView ?? []}
                    searchTerm={searchTerm}
                    setAccordianIndices={setAccordionIndices}
                    accordionIndices={accordionIndices}
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
                    index={2}
                    value={value}
                    setValue={(newValue) => setValue(newValue)}
                    data={coaExpenditureFullView ?? []}
                    searchTerm={searchTerm}
                    setAccordianIndices={setAccordionIndices}
                    accordionIndices={accordionIndices}
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
                    index={3}
                    value={value}
                    setValue={(newValue) => setValue(newValue)}
                    data={coaIncomeFullView ?? []}
                    searchTerm={searchTerm}
                    setAccordianIndices={setAccordionIndices}
                    accordionIndices={accordionIndices}
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
                      prev?.includes(4) ? prev?.filter((p) => p !== 4) : [...prev, 4]
                    );
                  }}
                  p="s12"
                  bg={isExpanded ? '#E0E5EB' : ''}
                  h="60px"
                >
                  <Box flex="1" textAlign="left">
                    <Text fontSize="r1" fontWeight="SemiBold">
                      Off Balance Sheet
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
                    index={4}
                    value={value}
                    setValue={(newValue) => setValue(newValue)}
                    data={coaOffSheetBalanceFullView ?? []}
                    searchTerm={searchTerm}
                    setAccordianIndices={setAccordionIndices}
                    accordionIndices={accordionIndices}
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </Box>
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
