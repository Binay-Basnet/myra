import { ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineMobile, AiOutlineWarning } from 'react-icons/ai';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { GoBack } from '@coop/ebanking/components';
import {
  authenticate,
  logoutCooperative,
  switchCooperative,
  useAppDispatch,
  useCheckAccountMutation,
  useGetCoopListQuery,
  useGetMyraMeQuery,
  useLoginToCooperativeMutation,
} from '@coop/ebanking/data-access';
import { EbankingHeaderLayout } from '@coop/ebanking/ui-layout';
import { FormSelect } from '@coop/shared/form';
import { Box, Button, ChakraModal, getError, Icon, Input, Text, TextFields } from '@coop/shared/ui';

const SetupConnectPage = () => {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState('');
  const { isOpen, onClose, onToggle } = useDisclosure();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { isOpen: failIsOpen, onClose: failIsOnClose, onToggle: failIsOnToggle } = useDisclosure();

  //   const user = useAppSelector((state) => state.auth?.user);
  const methods = useForm<{ id: string; mobileNumber: string; otp: string; pin?: number }>();

  const { refetch } = useGetMyraMeQuery();
  const { data } = useGetCoopListQuery();

  const { mutateAsync: loginToCooperative } = useLoginToCooperativeMutation();

  const { isLoading, mutateAsync: checkAccount } = useCheckAccountMutation({
    onSuccess: async (response) => {
      if (response?.eBanking?.auth?.checkAccount?.success) {
        const coopResponse = await loginToCooperative({
          cooperativeId: methods.getValues().id,
          pinCode: String(methods.getValues().pin),
          mobileNumber: methods.getValues().mobileNumber,
        });

        dispatch(logoutCooperative());
        // queryClient.refetchQueries('getMyraMe');

        const tokens = coopResponse.eBanking.auth.loginToCooperative.record;
        const accessToken = tokens.token.access;
        const refreshToken = tokens.token.refresh;

        if (accessToken) {
          dispatch(switchCooperative({ token: accessToken, user: tokens.data }));
          refetch().then((res) =>
            dispatch(authenticate({ user: res?.data?.eBanking?.auth?.meMyraUser?.data }))
          );
          // queryClient.invalidateQueries('getMyraMe');
        }
        localStorage.setItem('coop-refreshToken', String(refreshToken));
        onToggle();
      } else {
        setErrMsg(getError(response?.eBanking?.auth?.checkAccount?.error) as string);
        failIsOnToggle();
      }
    },
  });

  // const { isLoading: setPinLoading, mutateAsync: setPin } = useSetNewPinMutation({
  //   onSuccess: async (response) => {
  //     if (response?.eBanking?.auth?.setNewPin?.record?.id) {
  //       const coopResponse = await loginToCooperative({
  //         cooperativeId: methods.getValues().id,
  //         pinCode: methods.getValues().pin as number,
  //       });
  //
  //       const tokens = coopResponse.eBanking.auth.loginToCooperative.record;
  //       const accessToken = tokens.token.access;
  //       const refreshToken = tokens.token.refresh;
  //
  //       if (accessToken) {
  //         dispatch(switchCooperative({ token: accessToken, user: tokens.data }));
  //       }
  //       localStorage.setItem('coop-refreshToken', String(refreshToken));
  //       router.push('/home');
  //     }
  //   },
  // });

  return (
    <FormProvider {...methods}>
      <Box alignSelf="start">
        <GoBack />
      </Box>
      <Box display="flex" flexDir="column" gap="s16">
        <Text fontSize="r3" color="primary.500" fontWeight="600">
          Connect to an existing COOP
        </Text>
        <TextFields variant="bodyRegular" color="gray.700">
          If you are already a member of a COOP, you can start using Myra if you have signed up for
          mobile banking.
        </TextFields>
      </Box>

      <FormProvider {...methods}>
        <Box display="flex" flexDir="column" gap="s20">
          <FormSelect
            name="id"
            options={data?.eBanking?.neosysClientsList?.map((d) => ({
              label: d.clientName,
              value: d.id,
            }))}
            label="Co-operative"
            rules={{
              required: { message: 'Cooperative Is Required', value: true },
            }}
          />
          <Input
            leftElement={<Icon as={AiOutlineMobile} color="gray.500" />}
            label="Mobile Number"
            errorText={methods?.formState?.errors?.mobileNumber?.message as string}
            placeholder="Enter your mobile number"
            {...methods.register('mobileNumber', {
              required: { message: 'Mobile Number Is Required!!', value: true },
            })}
          />
          <Input
            label="Pin"
            errorText={methods?.formState?.errors?.pin?.message as string}
            {...methods.register('pin', {
              required: { message: 'Pin Is Required!!', value: true },
            })}
          />
        </Box>
      </FormProvider>

      <Button
        w="100%"
        isLoading={isLoading}
        onClick={methods.handleSubmit(async (submitData) => {
          await checkAccount({
            id: submitData?.id,
            pin: submitData?.pin,
            mobileNumber: submitData?.mobileNumber,
          });
        })}
      >
        Check for account
      </Button>

      <ChakraModal
        width="sm"
        hasCloseBtn={false}
        open={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <Box display="flex" flexDir="column" alignItems="center" gap="s24" py="s32">
          <Box display="flex" flexDir="column" alignItems="center" gap="s12">
            <Icon as={IoMdCheckmarkCircleOutline} size="xl" color="primary.500" />
            <Text fontSize="r2" fontWeight="600" color="primary.500">
              Success
            </Text>
          </Box>
          <Text fontSize="r1" color="gray.900" textAlign="center">
            Congratulations! Your account has been connected successfully.
          </Text>
          <Button
            onClick={() => {
              queryClient.clear();
              router.replace('/home');

              onClose();
            }}
          >
            Continue
          </Button>
        </Box>
      </ChakraModal>

      <ChakraModal
        closeOnOverlayClick={false}
        width="sm"
        hasCloseBtn={false}
        open={failIsOpen}
        onClose={failIsOnClose}
      >
        <Box display="flex" flexDir="column" alignItems="center" gap="s24" py="s32">
          <Box display="flex" flexDir="column" alignItems="center" gap="s12">
            <Icon as={AiOutlineWarning} size="xl" color="red.500" />
            <Text fontSize="r2" fontWeight="600" color="red.500">
              Failed
            </Text>
          </Box>
          <Text fontSize="r1" color="gray.900" textAlign="center">
            {errMsg}
          </Text>
          <Button
            shade="danger"
            onClick={() => {
              failIsOnClose();
            }}
          >
            Go Back
          </Button>
        </Box>
      </ChakraModal>
    </FormProvider>
  );
};

export default SetupConnectPage;

SetupConnectPage.getLayout = (page: ReactElement) => (
  <EbankingHeaderLayout>{page}</EbankingHeaderLayout>
);
