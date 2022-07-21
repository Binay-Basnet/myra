import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import router from 'next/router';
import { Icon } from '@chakra-ui/react';

import {
  Box,
  Button,
  Container,
  FormFooter,
  IconButton,
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

/* eslint-disable-next-line */
export interface CbsAccountOpenFormProps {}

export function CbsAccountOpen(props: CbsAccountOpenFormProps) {
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
