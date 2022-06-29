import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import router from 'next/router';

import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Button, Container, IconButton, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CbsAccountOpenFormProps {}

export function CbsAccountOpen(props: CbsAccountOpenFormProps) {
  const { t } = useTranslation();
  const methods = useForm();
  return (
    <Container minW="container.xl" height="fit-content" mt="130" p="s20">
      <FormProvider {...methods}>
        <form>
          <Box
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px="5"
            background="neutralColorLight.Gray-0"
            borderBottom="1px solid #E6E6E6"
            borderTopRadius={5}
          >
            <Text fontSize="r2" fontWeight="600">
              {t['newAccountOpen']}
            </Text>
            <IconButton
              variant={'ghost'}
              aria-label="close"
              icon={<GrClose />}
              onClick={() => router.back()}
            />
          </Box>
          <Box
            w="100%"
            background="neutralColorLight.Gray-0"
            p="s20"
            display="flex"
            flexDirection="column"
          >
            <Box w="50%">
              <FormSelect
                name="memberId"
                label={t['accountOpenMemberId']}
                placeholder={t['accountOpenMemberId']}
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ]}
              />
            </Box>

            <Box mt="s32" w="50%">
              <FormSelect
                name="memberId"
                label={t['accProductName']}
                placeholder={t['accSelectProduct']}
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ]}
              />
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            w="100%"
            p="s20"
            background="neutralColorLight.Gray-0"
          >
            <Text fontSize="r1" color="neutralColorLight.Gray-60">
              {t['accInterest']}
            </Text>
            <Box
              w="100%"
              mt="s16"
              display="flex"
              justifyContent="space-between"
            >
              <FormInput
                id="noOfShares"
                name="noOfReturnedShares"
                label={t['accInterestRate']}
                placeholder={t['accSource']}
              />
              <FormInput
                type="number"
                textAlign="right"
                id="noOfShares"
                name="noOfReturnedShares"
                label={t['accInterestSanctionedById']}
                placeholder={'0.0'}
              />

              <FormInput
                type="number"
                textAlign="right"
                id="noOfShares"
                name="noOfReturnedShares"
                label={t['accInterestSanctionedByName']}
                placeholder={'0.0'}
              />
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            w="100%"
            p="s20"
            background="neutralColorLight.Gray-0"
          >
            <Text
              fontWeight="SemiBold"
              fontSize="r1"
              color="neutralColorLight.Gray-60"
            >
              {t['accDepositFrequency']}
            </Text>
            <Box
              w="100%"
              mt="s16"
              display="flex"
              justifyContent="space-between"
            >
              <Text
                fontSize="s3"
                color="neutralColorLight.Gray-80"
                fontWeight="Medium"
              >
                {t['accWeekly']}
              </Text>
            </Box>
          </Box>

          <Box
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px="5"
            background="white"
            borderTopRadius={5}
          >
            <Text>Save as Draft</Text>
            <Button>Add</Button>
          </Box>
        </form>
      </FormProvider>
    </Container>
  );
}
