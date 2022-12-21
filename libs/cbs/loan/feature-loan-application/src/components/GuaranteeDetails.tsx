import { useMemo, useState } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { omit } from 'lodash';

import {
  Box,
  Button,
  DEFAULT_PAGE_SIZE,
  Divider,
  GridItem,
  Icon,
  Modal,
  Text,
  VStack,
} from '@myra-ui';

import { ObjState, useGetAccountTableListQuery } from '@coop/cbs/data-access';
import { FormAccountSelect, FormMemberSelect, FormNumberInput } from '@coop/shared/form';

import { useLoanProductContext } from '../hooks/useLoanProduct';

type GuaranteeDetailForm = {
  index?: number;
  memberId: string;
  accountId: string;
  accountName?: string | null;
  maxGuranteeAmount: number;
  guranteeAmount: number;
};

export const GuaranteeDetails = () => {
  const [isModal, setIsModal] = useState(false);

  const { product } = useLoanProductContext();

  // Inner Modal Form State
  const methods = useForm<GuaranteeDetailForm>({
    mode: 'onChange',
  });
  const editIndex = methods.getValues()?.index;

  // Outer Modal Form State
  const { control } = useFormContext<{
    memberId: string;
    productId: string;
    gurantee_details: GuaranteeDetailForm[];
  }>();
  const { append, fields, update, remove } = useFieldArray({
    control,
    name: 'gurantee_details',
  });

  // For Account Details
  const guaranteePercent = product?.maxPercentOfGurantee;
  const memberId = methods.watch('memberId');
  const { data: accountListData } = useGetAccountTableListQuery(
    {
      paginate: {
        first: DEFAULT_PAGE_SIZE,
        after: '',
      },
      filter: { memberId },
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );
  const accountId = methods.watch('accountId');
  const totalGuarantee = methods.watch('guranteeAmount');
  const selectedAccount = useMemo(
    () =>
      accountListData?.account?.list?.edges?.find((account) => account.node?.id === accountId)
        ?.node,
    [accountId]
  );
  const currentBalance = selectedAccount?.balance ?? '0';
  const maxGuarantee =
    currentBalance && guaranteePercent
      ? (Number(currentBalance) * Number(guaranteePercent)) / 100
      : 1000;

  if (!product?.allowGurantee) {
    return null;
  }

  return (
    <>
      <Box display="flex" flexDir="column" gap="s16">
        <Text variant="formLabel" color="gray.700">
          Guarantee Details
        </Text>
        <Box>
          <Button
            variant="outline"
            gap="s4"
            onClick={() => {
              methods.reset({});
              setIsModal(true);
            }}
          >
            <Icon as={AiOutlinePlus} />
            Add New
          </Button>
        </Box>
      </Box>

      <Modal
        width="3xl"
        open={isModal}
        onClose={() => setIsModal(false)}
        primaryButtonHandler={() => {
          const index = methods.getValues()?.index;
          const savedValues = {
            ...methods.getValues(),
            accountName: selectedAccount?.accountName,
          };

          if (index !== undefined) {
            update(index, savedValues);
          } else {
            append(savedValues);
          }
          setIsModal(false);
        }}
        isCentered
        isSecondaryDanger
        secondaryButtonLabel={editIndex !== undefined ? 'Delete' : undefined}
        secondaryButtonHandler={() => {
          setIsModal(false);
          remove(editIndex);
        }}
        title="Add Guarantee"
        primaryButtonLabel="save"
        preserveScrollBarGap
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s16">
            <FormMemberSelect name="memberId" label="Select Member" />
            <FormAccountSelect
              memberId={memberId}
              name="accountId"
              label="Select Account"
              filterBy={ObjState.Active}
            />
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="s16">
              <FormNumberInput
                name="maxGuranteeAmountLimit"
                label="Maximum Guarantee Amount Available"
                value={maxGuarantee}
                isDisabled
              />
              <FormNumberInput
                name="guranteeAmount"
                label="Guarantee Amount"
                rules={{
                  max: {
                    value: maxGuarantee,
                    message: 'Guaranntee Limit Exceeeded',
                  },
                }}
              />
            </Box>
            <GridItem
              colSpan={4}
              h="s40"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px="s10"
              bg="background.500"
              borderRadius="br2"
            >
              <Text variant="formLabel" color="gray.600">
                Total Guaranteed Amount
              </Text>

              <Text color="gray.700" fontSize="r1" fontWeight="600">
                {totalGuarantee}
              </Text>
            </GridItem>
          </Box>
        </FormProvider>
      </Modal>

      {fields?.length !== 0 && (
        <Box mt="-s16" border="1px" borderColor="border.layout" borderRadius="br2">
          <Box
            h="s60"
            borderBottom="1px"
            borderBottomColor="border.layout"
            display="flex"
            flexDir="column"
            justifyContent="center"
            px="s12"
          >
            <Text fontSize="r1" fontWeight="600" color="gray.800">
              Guarantee Details
            </Text>
            <Text fontSize="s3" fontWeight="500" color="gray.600">
              Details about the guarantee for loan amount
            </Text>
          </Box>
          <Box
            borderBottom="1px"
            borderBottomColor="border.layout"
            h="50px"
            display="flex"
            alignItems="center"
            px="s12"
          >
            <Text fontSize="r1" fontWeight="600" color="gray.900" w="20%">
              S.N.
            </Text>
            <Text fontSize="r1" fontWeight="600" color="gray.900" w="40%">
              Name
            </Text>
            <Text fontSize="r1" fontWeight="600" color="gray.900" w="40%">
              Guarantee
            </Text>
          </Box>

          <VStack spacing={0} divider={<Divider />}>
            {fields?.map((field, index) => (
              <Box key={field.id} px="s16" display="flex" alignItems="center" w="100%" h="60px">
                <Text fontSize="r1" color="gray.900" w="20%">
                  {index + 1}
                </Text>
                <Text fontSize="r1" color="gray.900" w="40%" textTransform="capitalize">
                  {field.accountName}
                </Text>

                <Text fontSize="r1" color="gray.900" w="20%">
                  {field.guranteeAmount}
                </Text>
                <Box display="flex" gap="s8">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsModal(true);
                      const fieldWithOutId = omit(field, 'id');
                      methods.reset({
                        ...fieldWithOutId,
                        index,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    shade="danger"
                    variant="ghost"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </>
  );
};
