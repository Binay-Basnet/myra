import { Dispatch, SetStateAction, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlineMobile, AiOutlineWarning } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { useSignUpMutation } from '@coop/ebanking/data-access';
import { Box, Button, ChakraModal, Icon, Input, Text } from '@myra-ui';

import { AuthContainer } from '../components/AuthContainer';
import { SignUpStatus } from '../types/SignUpStatus';

interface ISignUpHomePage {
  setStatus: Dispatch<SetStateAction<SignUpStatus>>;
}

export const SignUpHomePage = ({ setStatus }: ISignUpHomePage) => {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const { isOpen: failIsOpen, onClose: failIsOnClose, onToggle: failIsOnToggle } = useDisclosure();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext<{ mobileNo: string; id: string }>();

  const { mutateAsync, isLoading } = useSignUpMutation({
    onSuccess: (response) => {
      const id = response?.eBanking?.auth?.signUp?.recordId;
      const error = response?.eBanking?.auth?.signUp?.error;
      if (id) {
        setValue('id', id);
        setStatus(SignUpStatus.OTP);
      } else {
        failIsOnToggle();
        if (error?.__typename === 'BadRequestError') {
          setErrMsg(error.badRequestErrorMessage);
        } else {
          setErrMsg('Something Went Wrong. Please Try again!!');
        }
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await mutateAsync({ mobileNo: data.mobileNo });
      })}
    >
      <AuthContainer
        showGoBack
        title="Sign up to Myra"
        subtitle="Please enter your phone number below to get started."
      >
        <Input
          leftElement={<Icon as={AiOutlineMobile} color="gray.500" />}
          label="Mobile Number"
          type="number"
          placeholder="Enter your mobile number"
          errorText={errors?.mobileNo?.message}
          {...register('mobileNo', {
            minLength: {
              value: 10,
              message: 'Invalid Mobile Number.',
            },
            required: {
              value: true,
              message: 'This field should not be empty.',
            },
          })}
        />

        <Box w="100%" display="flex" flexDir="column" gap="s16">
          <Button h="s48" w="100%" type="submit" isLoading={isLoading}>
            Continue
          </Button>
          <Text fontSize="r1" color="gray.700">
            Already a member?
            <Text
              as="span"
              color="primary.500"
              cursor="pointer"
              onClick={() => router.push('/login')}
            >
              Login instead
            </Text>
          </Text>
        </Box>
      </AuthContainer>
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
              reset();
              failIsOnClose();
              setStatus(SignUpStatus.INITIAL);
            }}
          >
            Go Back
          </Button>
        </Box>
      </ChakraModal>
    </form>
  );
};

export default SignUpHomePage;
