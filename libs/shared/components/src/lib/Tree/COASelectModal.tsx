import React, { useEffect, useState } from 'react';
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

import { ArrayTree, MultiTreeV2 } from './Tree-v2';

interface ICOASelectModalProps {
  trigger: (props: { id: string; name: string; under: string } | null) => React.ReactNode;
  value: string;
  onChange: (newValue: string) => void;

  isMulti: boolean;
  selectableNodes: 'leaf' | 'root' | 'all';
}

export const COASelectModal = ({
  onChange,
  trigger,
  value,
  isMulti,
  selectableNodes,
}: ICOASelectModalProps) => {
  const { data: fullView } = useGetCoaFullViewQuery();

  const coa = fullView?.settings.chartsOfAccount?.fullView.data?.find((c) => c?.id === value);

  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <Box key={JSON.stringify(value)} w="100%" h="100%" onClick={onToggle}>
        {trigger({
          id: coa?.id || '',
          name: coa?.name?.local || '',
          under: coa?.under || '',
        })}
      </Box>

      <Modal
        width="4xl"
        scrollBehavior="inside"
        open={isOpen}
        onClose={onClose}
        title="Ledger Mapping"
      >
        <COATree
          onValueChange={(newValue) => onChange(newValue[0])}
          value={[value]}
          onClose={onClose}
          isMulti={isMulti}
          selectableNodes={selectableNodes}
        />
      </Modal>
    </>
  );
};

interface COATreeProps {
  onClose?: () => void;

  value: string[];
  onValueChange: (newValue: string[]) => void;

  isMulti: boolean;
  selectableNodes: 'leaf' | 'root' | 'all';
}

export const COATree = ({
  value,
  onValueChange,
  isMulti,
  selectableNodes,
  onClose,
}: COATreeProps) => {
  const [accordionIndices, setAccordionIndices] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: fullView, isFetching } = useGetCoaFullViewQuery();

  const coaFullView = React.useMemo(
    () => [
      {
        id: 1,
        title: 'Equity and Liabilities',
        view: getCOA(fullView, 'EQUITY_AND_LIABILITIES'),
      },
      {
        id: 2,
        title: 'Assets',
        view: getCOA(fullView, 'ASSETS'),
      },
      {
        id: 3,
        title: 'Expenditure',
        view: getCOA(fullView, 'EXPENDITURE'),
      },
      {
        id: 4,
        title: 'Income',
        view: getCOA(fullView, 'INCOME'),
      },
      {
        id: 5,
        title: 'Off Sheet Balance',
        view: getCOA(fullView, 'OFF_BALANCE_SHEET'),
      },
    ],
    [isFetching]
  );

  useEffect(() => {
    if (searchTerm) {
      setAccordionIndices([0, 1, 2, 3, 4]);
    } else {
      setAccordionIndices([]);
    }
  }, [searchTerm]);

  // useEffect(() => {
  //   if (value) {
  //     onValueChange(value);
  //   }
  // }, [value]);

  return (
    <>
      <Input
        value={searchTerm}
        type="search"
        placeholder="Search for ledger"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Box display="flex" flexDir="column" py="s16" gap="s16" bg="white">
        <Accordion index={accordionIndices} allowMultiple allowToggle mb="0" border="none">
          {coaFullView.map((coaView, index) => (
            <COAView
              coaView={coaView}
              value={value}
              onValueChange={onValueChange}
              selectableNodes={selectableNodes}
              searchTerm={searchTerm}
              index={index}
              setAccordionIndices={setAccordionIndices}
              accordionIndices={[]}
              isMulti={isMulti}
              onClose={onClose}
            />
          ))}
        </Accordion>
      </Box>
    </>
  );
};

interface COAViewProps<TArray extends ArrayTree> {
  value: string[];
  onValueChange: (newValue: string[]) => void;

  selectableNodes: 'leaf' | 'root' | 'all';

  searchTerm: string;

  index: number;

  coaView: {
    title: string;
    view: TArray[];
  };

  setAccordionIndices: React.Dispatch<React.SetStateAction<number[]>>;
  accordionIndices: number[];
  isMulti: boolean;
  onClose?: () => void;
}

const COAView = React.memo(
  <TArray extends ArrayTree>({
    accordionIndices,
    setAccordionIndices,
    coaView,
    index,
    isMulti,
    onValueChange,
    value,
    selectableNodes,
    onClose,
    searchTerm,
  }: COAViewProps<TArray>) => (
    <AccordionItem mt="s8">
      {({ isExpanded }) => (
        <>
          <AccordionButton
            onClick={() => {
              setAccordionIndices((prev) =>
                prev?.includes(index) ? prev?.filter((p) => p !== index) : [...prev, index]
              );
            }}
            p="s12"
            bg={isExpanded ? '#E0E5EB' : ''}
            h="60px"
          >
            <Box flex="1" textAlign="left">
              <Text fontSize="r1" fontWeight="SemiBold">
                {coaView.title}
              </Text>
            </Box>
            {isExpanded ? (
              <IoChevronUpOutline fontSize="18px" />
            ) : (
              <IoChevronDownOutline fontSize="18px" />
            )}
          </AccordionButton>

          <AccordionPanel display="flex" flexDir="column" gap="s16">
            <MultiTreeV2
              isMulti={isMulti}
              arrayData={coaView.view}
              value={value}
              onValueChange={(newValue) => {
                onValueChange(newValue);
                if (!isMulti) onClose?.();
              }}
              selectableNodes={selectableNodes}
              searchTerm={searchTerm}
              accordionIndices={accordionIndices}
              setAccordionIndices={setAccordionIndices}
              index={index}
            />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
);

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
