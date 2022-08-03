import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { Icon } from '@chakra-ui/react';

import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  Agent,
  Atm,
  DepositFrequency,
  FeesAndCharge,
  Interest,
  Member,
  Product,
  RequiredDocuments,
  Tenure,
} from '../component/form';

export function CbsAccountOpen() {
  const { t } = useTranslation();
  const methods = useForm();
  const { watch } = methods;
  const products = watch('productId');

  return (
    <>
      <Container minW="container.xl" height="fit-content" pb="60px">
        <FormProvider {...methods}>
          <form>
            <Box
              position="sticky"
              top="110px"
              bg="gray.100"
              width="100%"
              zIndex="10"
            >
              <FormHeader title={t['newAccountOpen']} />
            </Box>

            <Member />

            <Product />

            {products !== 'voluntary' && <Tenure />}

            <Interest />

            {products !== 'voluntary' && <DepositFrequency />}

            <RequiredDocuments />

            {products === 'voluntary' && <Atm />}

            <FeesAndCharge />

            <Agent />
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.xl" height="fit-content">
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text
                  color="neutralColorLight.Gray-60"
                  fontWeight="Regular"
                  as="i"
                  fontSize="r1"
                >
                  {t['formDetails']}
                </Text>
                <Text
                  color="neutralColorLight.Gray-60"
                  fontWeight="Regular"
                  as="i"
                  fontSize="r1"
                >
                  09:41 AM
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost">
                <Icon as={BiSave} color="primary.500" />
                <Text
                  alignSelf="center"
                  color="primary.500"
                  fontWeight="Medium"
                  fontSize="s2"
                  ml="5px"
                >
                  {t['saveDraft']}
                </Text>
              </Button>
            }
            mainButtonLabel={t['submit']}
            mainButtonHandler={() => alert('Submitted')}
          />
        </Container>
      </Box>
    </>
  );
}
