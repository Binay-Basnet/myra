import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { InfoCard } from '@coop/ebanking/cards';
import { useChangeCoopPinMutation } from '@coop/ebanking/data-access';
import { FormInput } from '@coop/shared/form';
import { asyncToast, Box, Button, PathBar } from '@coop/shared/ui';

const validationSchema = yup.object({
  oldPin: yup.string().required('No Pin provided'),
  newPin: yup.string().required('No Pin Provided'),

  cNewPin: yup
    .string()
    .required('No Pin Provided')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.newPin === value;
    }),
});

export const EbankingChangeCoopPin = () => {
  const router = useRouter();
  const { mutateAsync: changeCoopPin } = useChangeCoopPinMutation();
  const methods = useForm({
    defaultValues: {
      oldPin: '',
      newPin: '',
      cNewPin: '',
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Settings', link: '/settings' },
          { label: 'Security', link: '/settings/change-pin' },
        ]}
      />
      <InfoCard title="Change Coop Pin">
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
                loading: 'Changing Pin!',
                success: 'Pin Changed Successfully',
              },
              promise: changeCoopPin({ newPin: data.newPin, oldPin: data.oldPin }),
              onSuccess: () => {
                router.push('/settings');
              },
            });
          })}
        >
          <FormProvider {...methods}>
            <Box display="flex" flexDir="column" gap="s20" w="50%">
              <FormInput
                pattern="[0-9]*"
                type="password"
                name="oldPin"
                placeholder="Old Password"
                label="Type Old Coop Login Pin"
              />
              <FormInput
                pattern="[0-9]*"
                type="password"
                name="newPin"
                placeholder="New Password"
                label="Type New Coop Login Pin"
              />
              <FormInput
                pattern="[0-9]*"
                name="cNewPin"
                type="password"
                placeholder="Retype new Password"
                label="Retype New Coop Login Pin"
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
