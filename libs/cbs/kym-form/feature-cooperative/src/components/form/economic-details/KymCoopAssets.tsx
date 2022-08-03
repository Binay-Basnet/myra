import { FormProvider, useForm } from 'react-hook-form';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopAssets = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });

  const { watch } = methods;
  useCooperative({ methods });
  const cashEquivalent = watch('cashAndCashEquivalent');
  const bank = watch('bank');
  const investments = watch('investments');
  const loan = watch('loan');
  const currentAssets = watch('nonCurrentAssets');
  const nonCurrentAssets = watch('otherNonCurrentAssets');

  const totalAssets =
    Number(cashEquivalent) +
    Number(bank) +
    Number(investments) +
    Number(loan) +
    Number(currentAssets) +
    Number(nonCurrentAssets);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <Box id="kymCoopAccAssets" display="flex" flexDirection="column">
          <Grid
            columnGap={40}
            alignItems="center"
            px="s14"
            templateColumns="repeat(2,1fr)"
          >
            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopAssets']}
              </Text>
            </GridItem>

            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopAmount']}
              </Text>
            </GridItem>
          </Grid>

          <Divider />

          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopCashandcashequivalents']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                name="cashAndCashEquivalent"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>

          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopBank']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="text"
                name="bank"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>

          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopInvestments']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                name="investments"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>

          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopLoan']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="text"
                name="loan"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>

          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopNoncurrentassets']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                textAlign="right"
                type="text"
                name="nonCurrentAssets"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>

          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopOthernoncurrentassets']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="text"
                name="otherNonCurrentAssets"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>

          <Divider />

          <Grid
            alignItems="center"
            px="14px"
            py="s16"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopTotal']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                isDisabled={true}
                bg="neutralColorLight.Gray-20"
                border="1px solid"
                borderColor="disabled.disabled"
                textAlign="right"
                type="text"
                name="totalAssets"
                value={isNaN(totalAssets) ? '0.00' : totalAssets}
                placeholder={t['kymCoopTotalassets']}
              />
            </GridItem>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};
