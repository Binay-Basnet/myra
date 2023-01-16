import { Dispatch, SetStateAction } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';

import { Box, Button, Icon, Input, Modal, PasswordInput, Text } from '@myra-ui';

import { axiosAgent } from '@coop/ebanking/data-access';
import { getAPIUrl } from '@coop/shared/utils';

import { AuthContainer } from '../components/AuthContainer';
import { SignUpStatus } from '../types/SignUpStatus';

interface IDetailsPageProps {
  setStatus: Dispatch<SetStateAction<SignUpStatus>>;
}

export type SetPasswordMutation = {
  recordId?: string;
};

type SetPasswordBody = {
  dob: string;
  password: string;
  name: string;
  userId: string;
  otp: string;
};

const schemaPath = getAPIUrl();

const setPassword = async (body: SetPasswordBody) => {
  const response = await axiosAgent.post<SetPasswordMutation>(
    `${schemaPath}/ebanking/set-password`,
    body
  );

  return response?.data;
};

const validationSchema = yup.object({
  name: yup.string().required('Name is Required.'),
  dob: yup.string().required('Date of Birth is Required.'),
  password: yup
    .string()
    .required('No password provided')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  cPassword: yup.string().test('passwords-match', 'Passwords must match', function (value) {
    return this.parent.password === value;
  }),
});

export const DetailsPage = ({ setStatus }: IDetailsPageProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    dob: string;
    name: string;
    password: string;
    cPassword: string;
  }>({ resolver: yupResolver(validationSchema) });

  const { isOpen, onClose, onToggle } = useDisclosure();

  const { mutateAsync, isLoading } = useMutation(setPassword, {
    onSuccess: (response) => {
      const id = response?.recordId;

      if (id) {
        onToggle();
      }
    },
  });

  const { getValues } = useFormContext<{
    id: string;
    otp: string;
  }>();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await mutateAsync({
          dob: data.dob,
          password: data.password,
          name: data.name,
          userId: getValues()['id'],
          otp: getValues()['otp'],
        });
      })}
    >
      <AuthContainer title="Your Details" subtitle="Enter your details to continue with sign up.">
        <Box display="flex" flexDir="column" gap="s20">
          <Input
            placeholder="Enter your full name"
            label="Your Name"
            errorText={errors.name?.message}
            {...register('name')}
          />
          <Input
            type="date"
            label="Date of Birth (BS)"
            errorText={errors.dob?.message}
            {...register('dob')}
          />
          <PasswordInput
            placeholder="Enter your Password"
            label="Password"
            errorText={errors.password?.message}
            {...register('password')}
          />
          <PasswordInput
            placeholder="Retype your Password"
            label="Confirm Password"
            errorText={errors.cPassword?.message}
            {...register('cPassword')}
          />
        </Box>

        <Button h="s48" type="submit" isLoading={isLoading} w="100%">
          Continue
        </Button>
      </AuthContainer>

      <Modal width="sm" hasCloseBtn={false} open={isOpen} onClose={onClose}>
        <Box display="flex" flexDir="column" alignItems="center" gap="s24" py="s32">
          <Box display="flex" flexDir="column" alignItems="center" gap="s12">
            <Icon as={IoMdCheckmarkCircleOutline} size="xl" color="primary.500" />
            <Text fontSize="r2" fontWeight="600" color="primary.500">
              Success
            </Text>
          </Box>
          <Text fontSize="r1" color="gray.900" textAlign="center">
            Congratulations! Your account has been created successfully.
          </Text>
          <Button
            onClick={() => {
              router.push('/login').then(() => setStatus(SignUpStatus.INITIAL));
            }}
          >
            Continue
          </Button>
        </Box>
      </Modal>
    </form>
  );
};

export default DetailsPage;
