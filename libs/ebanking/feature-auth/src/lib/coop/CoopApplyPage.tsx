import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Box, Button, Text } from '@myra-ui/foundations';

import { GoBack } from '@coop/ebanking/components';
import { useGetCoopListQuery } from '@coop/ebanking/data-access';
import { FormSelect } from '@coop/shared/form';

export const CoopApplyPage = () => {
  const methods = useForm();
  const router = useRouter();

  const { data: coopListData } = useGetCoopListQuery();

  return (
    <>
      <Box>
        <GoBack />
      </Box>

      <Box as="form" display="flex" flexDir="column" gap="s32">
        <Box display="flex" flexDir="column" gap="s8">
          <Text fontSize="r3" color="primary.500" fontWeight="600">
            Apply for COOP registration
          </Text>
          <Text variant="bodyRegular" color="gray.700">
            Find your COOP and apply an application for membership.
          </Text>
        </Box>
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s20">
            <FormSelect
              options={coopListData?.eBanking?.neosysClientsList?.map((coop) => ({
                label: coop?.clientName as string,
                value: coop?.id as string,
              }))}
              label="Co-operative"
              name="cooperative"
            />
          </Box>
        </FormProvider>
        <Button
          width="100%"
          type="button"
          onClick={() => router.push(`/setup/apply/kym?id=${methods.getValues()['cooperative']}`)}
        >
          Continue
        </Button>
      </Box>
    </>
  );
};
