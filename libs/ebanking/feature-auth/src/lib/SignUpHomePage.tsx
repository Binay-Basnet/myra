import { Dispatch, SetStateAction, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlineMobile, AiOutlineWarning } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Box, Button, Icon, Input, Modal, Text } from '@myra-ui';

import { axiosAgent } from '@coop/ebanking/data-access';
import { getAPIUrl } from '@coop/shared/utils';

import { AuthContainer } from '../components/AuthContainer';
import { SignUpStatus } from '../types/SignUpStatus';

interface ISignUpHomePage {
  setStatus: Dispatch<SetStateAction<SignUpStatus>>;
}

export type SignUpResponse = {
  recordId?: string;
};

type SignUpBody = {
  mobileNo: string;
};

const schemaPath = getAPIUrl();

const signUp = async (body: SignUpBody) => {
  const response = await axiosAgent.post<SignUpResponse>(`${schemaPath}/ebanking/signup`, body);

  return response?.data;
};

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

  const { mutateAsync, isLoading } = useMutation(signUp, {
    onError: (error: AxiosError<{ error: { message: string } }>) => {
      failIsOnToggle();

      setErrMsg(error?.response?.data?.error?.message || 'Something went wrong. Please try Again.');
    },

    onSuccess: (response) => {
      const id = response?.recordId;
      if (id) {
        setValue('id', id);
        setStatus(SignUpStatus.OTP);
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
      <Modal
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
      </Modal>
    </form>
  );
};

export default SignUpHomePage;
