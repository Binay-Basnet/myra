import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { InfoCard } from '@coop/ebanking/cards';
import { useChangeMyraPasswordMutation } from '@coop/ebanking/data-access';
import { FormInput } from '@coop/shared/form';
import { asyncToast, Box, Button, PathBar } from '@myra-ui';

const validationSchema = yup.object({
  oldPassword: yup.string().required('No Password provided'),
  newPassword: yup.string().required('No Password Provided'),

  cNewPassword: yup
    .string()
    .required('No Password Provided')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.newPassword === value;
    }),
});

export const EbankingChangePassword = () => {
  const router = useRouter();
  const { mutateAsync: changePassword } = useChangeMyraPasswordMutation();
  const methods = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      cNewPassword: '',
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Settings', link: '/settings' },
          { label: 'Security', link: '/settings/change-password' },
        ]}
      />
      <InfoCard title="Change Password">
        <Box
          p="s16"
          as="form"
          display="flex"
          flexDir="column"
          gap="s32"
          onSubmit={methods.handleSubmit(async (data) => {
            await asyncToast({
              id: 'change-coop',
              msgs: {
                loading: 'Changing Password!',
                success: 'Password Changed Successfully',
              },
              promise: changePassword({
                newPassword: data.newPassword,
                oldPassword: data.oldPassword,
              }),
              onSuccess: () => {
                router.push('/settings');
              },
            });
          })}
        >
          <FormProvider {...methods}>
            <Box display="flex" flexDir="column" gap="s20" w="50%">
              <FormInput
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                label="Type Old Password"
              />
              <FormInput
                type="password"
                name="newPassword"
                placeholder="New Password"
                label="Type New Password"
              />
              <FormInput
                name="cNewPassword"
                type="password"
                placeholder="Retype new Password"
                label="Retype New Password"
              />
            </Box>
          </FormProvider>
          <Box display="flex" alignItems="center" gap="s16">
            <Button type="submit" w="100px">
              Submit
            </Button>
            <Button
              onClick={() => methods.reset()}
              type="button"
              shade="neutral"
              variant="outline"
              w="100px"
            >
              Clear
            </Button>
          </Box>
        </Box>
      </InfoCard>
    </Box>
  );
};
