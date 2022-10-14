import { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { useSetPasswordMutation } from '@coop/ebanking/data-access';
import { Box, Button, ChakraModal, Icon, Input, PasswordInput, Text } from '@coop/shared/ui';

import { AuthContainer } from '../components/AuthContainer';
import { SignUpStatus } from '../types/SignUpStatus';

interface IDetailsPageProps {
  setStatus: Dispatch<SetStateAction<SignUpStatus>>;
}

export const DetailsPage = ({ setStatus }: IDetailsPageProps) => {
  const router = useRouter();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const { mutateAsync, isLoading } = useSetPasswordMutation({
    onSuccess: (response) => {
      const id = response?.eBanking?.auth?.setPassword?.recordId;

      if (id) {
        onToggle();
      }
    },
  });

  const { register, handleSubmit } = useFormContext<{
    id: string;
    dob: string;
    name: string;
    password: string;
    cPassword: string;
  }>();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await mutateAsync({
          data: { dob: data.dob, password: data.password, name: data.name },
          userId: data.id,
        });
      })}
    >
      <AuthContainer title="Your Details" subtitle="Enter your details to continue with sign up.">
        <Box display="flex" flexDir="column" gap="s20">
          <Input placeholder="Enter your full name" label="Your Name" {...register('name')} />
          <Input type="date" label="Date of Birth (BS)" {...register('dob')} />
          <PasswordInput
            placeholder="Enter your Password"
            label="Password"
            {...register('password')}
          />
          <PasswordInput
            placeholder="Retype your Password"
            label="Confirm Password"
            {...register('cPassword')}
          />
        </Box>

        <Button h="s48" type="submit" isLoading={isLoading} w="100%">
          Continue
        </Button>
      </AuthContainer>

      <ChakraModal width="sm" hasCloseBtn={false} open={isOpen} onClose={onClose}>
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
      </ChakraModal>
    </form>
  );
};

export default DetailsPage;
