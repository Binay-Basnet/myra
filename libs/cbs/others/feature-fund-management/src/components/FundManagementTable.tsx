import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { HStack } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

import { Box, Icon, Text } from '@myra-ui';

import { useAppSelector, useGetLedgerListQuery } from '@coop/cbs/data-access';
import { FormInput, FormNumberInput } from '@coop/shared/form';
import { getPaginationQuery, useDebounce } from '@coop/shared/utils';

interface IFundManagementTable {
  name: string;
  remainingProfit: number;
}

export const FundManagementTable = ({ name, remainingProfit }: IFundManagementTable) => {
  const router = useRouter();

  const { control, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({ name, control });

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        w="100%"
        borderTopRadius="br2"
        h="40px"
        alignItems="center"
        bg="gray.700"
        color="white"
      >
        <Text flexBasis="55%" fontWeight="600" fontSize="r1" px="s8">
          COA Ledger
        </Text>

        <Text flexBasis="20%" fontWeight="600" fontSize="r1" px="s8">
          Percent
        </Text>

        <Text flexBasis="20%" fontWeight="600" fontSize="r1" px="s8">
          Amount
        </Text>
        <Box flexBasis="5%" />
      </Box>

      <Box w="100%" bg="white" borderX="1px" borderColor="border.layout">
        {fields.map((item, index) => (
          <HStack
            w="100%"
            minH="36px"
            alignItems="stretch"
            bg="white"
            spacing={0}
            borderBottom="1px"
            borderBottomColor="border.layout"
          >
            <Box flexBasis="55%">
              <FormInput
                name={`${name}.${index}.ledgerName`}
                py="0"
                h="100%"
                w="100%"
                px="s8"
                minH="inherit"
                bg="primary.100"
                _focus={{ boxShadow: 'none' }}
                _focusWithin={{ boxShadow: 'none' }}
                border="none"
                onWheel={(e) => e.currentTarget.blur()}
                borderRadius="0"
                isDisabled
              />
            </Box>

            <Box
              flexBasis="20%"
              w="100%"
              minH="inherit"
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              fontSize="r1"
              borderLeft="1px"
              borderLeftColor="border.layout"
            >
              <FormNumberInput
                name={`${name}.${index}.percent`}
                onChangeAction={(newVal) => {
                  setValue(
                    `${name}.${index}.amount`,
                    ((Number(newVal || 0) / 100) * remainingProfit).toFixed(2)
                  );
                }}
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
                py="0"
                h="100%"
                w="100%"
                px="s8"
                minH="inherit"
                _focus={{ boxShadow: 'none', bg: 'primary.100' }}
                _focusWithin={{ boxShadow: 'none' }}
                border="none"
                onWheel={(e) => e.currentTarget.blur()}
                borderRadius="0"
                isDisabled={router?.asPath?.includes('/view')}
              />
            </Box>

            <Box
              flexBasis="20%"
              w="100%"
              minH="inherit"
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              fontSize="r1"
              borderLeft="1px"
              borderLeftColor="border.layout"
            >
              <FormNumberInput
                name={`${name}.${index}.amount`}
                onChangeAction={(newVal) => {
                  setValue(
                    `${name}.${index}.percent`,
                    Number(((Number(newVal || 0) / remainingProfit) * 100).toFixed(4))
                  );
                }}
                py="0"
                h="100%"
                w="100%"
                px="s8"
                minH="inherit"
                _focus={{ boxShadow: 'none', bg: 'primary.100' }}
                _focusWithin={{ boxShadow: 'none' }}
                border="none"
                onWheel={(e) => e.currentTarget.blur()}
                borderRadius="0"
                isDisabled={router?.asPath?.includes('/view')}
              />
            </Box>

            <Box
              as="button"
              w="s36"
              minH="s36"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              borderLeft="1px"
              borderLeftColor="border.layout"
              cursor={router?.asPath?.includes('/view') ? 'not-allowed' : 'pointer'}
              pointerEvents={router?.asPath?.includes('/view') ? 'none' : 'auto'}
              _focus={{ bg: 'background.500' }}
              _focusVisible={{ outline: 'none' }}
              _hover={{ bg: 'gray.100' }}
              data-testid={`deleteRow-${index}`}
              onClick={() => {
                remove(index);
              }}
              flexBasis="5%"
            >
              <Icon as={IoCloseCircleOutline} color="danger.500" fontSize="2xl" />
            </Box>
          </HStack>
        ))}
      </Box>

      <Box borderBottom="1px" borderX="1px" borderColor="border.layout" borderBottomRadius="br2">
        <LeafCOAHeadSearch
          handleSelect={(val) =>
            append({ ledgerId: val?.value, ledgerName: val?.label, percent: '', amount: '' })
          }
        />
      </Box>
    </Box>
  );
};

interface ILeafCOAHeadSearchProps {
  handleSelect: (val: { label: string; value: string }) => void;
}

const LeafCOAHeadSearch = ({ handleSelect }: ILeafCOAHeadSearchProps) => {
  const [searchValue, setSearchValue] = useState('');

  const currentBranchId = useAppSelector((state) => state?.auth?.user?.currentBranch?.id);

  const router = useRouter();

  const { data: ledgerListData, isFetching } = useGetLedgerListQuery({
    branchId: [currentBranchId as string],
    pagination: getPaginationQuery(),
    filter: {
      query: useDebounce(searchValue, 800),
    },
  });

  const accountSearchOptions =
    ledgerListData?.settings?.chartsOfAccount?.coaLedgerList?.edges?.map((head) => ({
      label: head?.node?.ledgerName as string,
      value: head?.node?.accountCode as string,
    })) ?? [];

  return (
    <AutoComplete
      openOnFocus
      disableFilter
      isOpen
      emptyState={false}
      isLoading={isFetching}
      onSelectOption={({ item: newValue }: any) => {
        handleSelect({ label: newValue?.label, value: newValue?.value });
      }}
    >
      <AutoCompleteInput
        bg="white"
        loadingIcon={null}
        _hover={{ bg: 'gray.50' }}
        _focus={{ bg: 'gray.50' }}
        borderTopRadius={0}
        height="36px"
        placeholder="Search COA Head"
        value={searchValue}
        onChange={(e: any) => {
          setSearchValue(e.target.value);
        }}
        variant="filled"
        isDisabled={router?.asPath?.includes('/view')}
      />

      <AutoCompleteList
        border="1px"
        borderColor="border.layout"
        mt="-6px"
        boxShadow="none"
        fontSize="r1"
        fontStyle="unset"
        fontWeight={500}
      >
        {(!accountSearchOptions || accountSearchOptions?.length === 0) && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            py="s24"
            fontSize="r1"
            color="gray.400"
          >
            No Options Found !!!
          </Box>
        )}
        {accountSearchOptions?.map((option) => (
          <AutoCompleteItem
            key={option.value}
            label={option.label}
            value={option.value}
            textTransform="capitalize"
          >
            {option.label}
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
};
