import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, Modal, Text } from '@myra-ui';

import {
  SavingsTenureUpdateInput,
  useAccountDetails,
  useGetAccountOpenProductDetailsQuery,
  useSetupdateSavingTenureMutation,
} from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';

interface IChangeNomineeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTenureModal = ({ isOpen, onClose }: IChangeNomineeProps) => {
  const queryClient = useQueryClient();
  const { accountDetails } = useAccountDetails();
  const productId = accountDetails?.productId;
  const router = useRouter();

  const methods = useForm<SavingsTenureUpdateInput>({
    mode: 'onChange',
  });

  const { mutateAsync: setTenure } = useSetupdateSavingTenureMutation();

  const poductDetails = useGetAccountOpenProductDetailsQuery(
    { id: productId as string },
    {
      enabled: !!productId,
    }
  );

  const productData = poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;
  const maxValue = String(productData?.maxTenureUnitNumber);
  const minValue = String(productData?.minTenureUnitNumber);

  const handleUpdateTeenureAccount = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-',
      msgs: {
        success: 'Tenure updated successfully',
        loading: 'Updating Tenure',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getAccountDetailsData']);

        onClose();
      },
      promise: setTenure({
        SavingsTenureUpdateInput: {
          accountId: router.query['id'] as string,
          updatedTenure: values?.updatedTenure,
        },
      }),
    });
  };

  return isOpen ? (
    <Modal
      open={isOpen}
      onClose={onClose}
      isCentered
      title={
        <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
          Update Tenure
        </Text>
      }
      footer={
        <Box display="flex" px={5} pb={5} justifyContent="flex-end">
          <Button onClick={handleUpdateTeenureAccount}>Save</Button>
        </Box>
      }
      width="xl"
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDir="column" gap={5}>
          <Alert status="info" hideCloseIcon>
            <Box display="flex" gap="s4">
              <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-80">
                Existing Tenure:
              </Text>
              <Text fontSize="s3" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                {accountDetails?.accountTenure}
              </Text>
            </Box>
            <Box display="flex" gap="s4">
              <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-80">
                Allowable Tenure
              </Text>
              <Text fontSize="s3" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                <b>
                  {productData?.minTenureUnitNumber} {productData?.tenureUnit} -{' '}
                  {productData?.maxTenureUnitNumber} {productData?.tenureUnit}
                </b>
              </Text>
            </Box>
          </Alert>

          <FormInput
            isRequired
            type="number"
            name="updatedTenure"
            rules={{
              max: {
                value: maxValue,
                message: 'Tenure is invalid',
              },
              min: {
                value: minValue,
                message: 'Tenure is invalid',
              },
            }}
            textAlign="right"
            rightAddonText={productData?.tenureUnit?.toLowerCase()}
          />
        </Box>
      </FormProvider>
    </Modal>
  ) : null;
};
