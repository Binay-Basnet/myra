import { useState } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { omit } from 'lodash';

import { Box, Button, Modal, Divider, Icon, Text, VStack } from '@myra-ui';

import {
  LoanProduct,
  useGetCollateralListQuery,
  useGetLoanProductDetailsDataQuery,
} from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

import { COLLATERAL_COMPS } from './collateral';

type CollateralDetailsType = {
  index?: number;
  collateralType: 'Land' | 'Land and Building' | 'Vehicle' | 'Documents' | 'Others' | '';
  ownerName: string;
  relation: string;
  sheetNo: string;
  plotNo: string;
  kittaNo: string;
  area: string;
  valuatorId: string;
  fmvMaxAmount: string;
  dvMinAmount: string;
  valuationMethod: string;
  valuationPercent: string;
  collateralDescription: string;
  collateralFiles: string[];
  valuationFiles: string[];
  collaterallValuation: number;
};

export const CollateralDetails = () => {
  const [isModal, setIsModal] = useState(false);

  // useForm for Inner Modal Form
  const methods = useForm<CollateralDetailsType>({
    mode: 'all',
  });
  const collateralType = methods.watch('collateralType');
  const editIndex = methods.getValues()?.index;

  // Form Context of Outer Form
  const { control, watch } = useFormContext<{
    productId?: string;
    collateralData: CollateralDetailsType[];
  }>();
  const { append, fields, update, remove } = useFieldArray({
    control,
    name: 'collateralData',
  });
  const productId = watch('productId');

  // Query
  const { data: loanProductData } = useGetLoanProductDetailsDataQuery(
    { id: String(productId) },
    {
      enabled: !!productId,
    }
  );
  const { data: collateralListData } = useGetCollateralListQuery();
  const loanProduct = loanProductData?.settings?.general?.loanProducts?.formState
    ?.data as LoanProduct;
  const collateralList = collateralListData?.settings?.general?.loan?.general?.collateralList;

  if (!loanProduct?.isCollateralRequired) {
    return null;
  }

  return (
    <>
      <Box display="flex" flexDir="column" gap="s16">
        <Text variant="formLabel" color="gray.700">
          Collateral Details
        </Text>
        <Box>
          <Button
            variant="outline"
            gap="s4"
            onClick={() => {
              methods.reset({ collateralType: '' });
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
        title="Add Collateral"
        onClose={() => setIsModal(false)}
        primaryButtonLabel="save"
        primaryButtonHandler={methods.handleSubmit(() => {
          if (editIndex !== undefined) {
            update(editIndex, methods.getValues());
          } else {
            append(methods.getValues());
          }
          setIsModal(false);
        })}
        isSecondaryDanger
        isDisabled={!collateralType}
        secondaryButtonLabel={editIndex !== undefined ? 'Delete' : undefined}
        secondaryButtonHandler={() => {
          setIsModal(false);
          remove(editIndex);
        }}
        scrollBehavior={collateralType ? 'inside' : 'outside'}
        preserveScrollBarGap
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s32">
            <Box width="50%" pr="s10">
              <FormSelect
                name="collateralType"
                isDisabled={!!collateralType}
                label="Collateral Type"
                options={loanProduct?.collateralValue?.map((collateralData) => ({
                  label: collateralData?.name as string,
                  value: collateralData?.type as string,
                }))}
              />
            </Box>
            {collateralType && (
              <Box>
                {
                  COLLATERAL_COMPS[
                    collateralList?.find((collateral) => collateral?.id === collateralType)
                      ?.name as
                      | 'Land'
                      | 'Land and Building'
                      | 'Vehicle'
                      | 'Documents'
                      | 'Others'
                      | ''
                  ]
                }
              </Box>
            )}
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
              Collateral Details
            </Text>
            <Text fontSize="s3" fontWeight="500" color="gray.600">
              Details about the valuation for loan amount
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
              Valuation
            </Text>
          </Box>

          <VStack spacing={0} divider={<Divider />}>
            {fields?.map((field, index) => (
              <Box key={field.id} px="s16" display="flex" alignItems="center" w="100%" h="60px">
                <Text fontSize="r1" color="gray.900" w="20%">
                  {index + 1}
                </Text>
                <Text fontSize="r1" color="gray.900" w="40%" textTransform="capitalize">
                  {
                    collateralList?.find((collateral) => collateral?.id === field.collateralType)
                      ?.name
                  }
                </Text>

                <Text fontSize="r1" color="gray.900" w="20%">
                  {field.collaterallValuation}
                </Text>
                <Box display="flex" gap="s8">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsModal(true);
                      const fieldWithOutId = omit(field, 'id');
                      methods.reset({ ...fieldWithOutId, index });
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
