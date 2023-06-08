import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';
import { isNaN } from 'lodash';

import { KymCooperativeFormInput, setCooperativeTotalAssets } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopAssets = (props: IProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });

  const { watch } = methods;

  useCooperative({ methods });
  const cashEquivalent = watch('cashAndCashEquivalent') || 0;
  const bank = watch('bank') || 0;
  const investments = watch('investments') || 0;
  const loan = watch('loan') || 0;
  const currentAssets = watch('nonCurrentAssets') || 0;
  const nonCurrentAssets = watch('otherNonCurrentAssets') || 0;

  const totalAssets = cashEquivalent + bank + investments + loan + currentAssets + nonCurrentAssets;

  useEffect(() => {
    dispatch(setCooperativeTotalAssets(totalAssets));
  }, [dispatch, totalAssets]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <Box
          p="s20"
          id="kymCoopAccAssets"
          display="flex"
          flexDirection="column"
          borderBottom="1px solid"
          borderBottomColor="border.layout"
        >
          <Grid columnGap={40} alignItems="center" px="s14" templateColumns="repeat(2,1fr)">
            <GridItem>
              <Text mb="s16" color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="SemiBold">
                {t['kymCoopAssets']}
              </Text>
            </GridItem>

            <GridItem>
              <Text mb="s16" color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="SemiBold">
                {t['kymCoopAmount']}
              </Text>
            </GridItem>
          </Grid>

          <Divider />

          <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(2,1fr)" columnGap={40}>
            <GridItem>
              <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                {t['kymCoopCashandcashequivalents']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                size="xs"
                textAlign="right"
                type="number"
                min={0}
                name="cashAndCashEquivalent"
              />
            </GridItem>
          </Grid>

          <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(2,1fr)" columnGap={40}>
            <GridItem>
              <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                {t['kymCoopBank']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput size="xs" textAlign="right" type="number" min={0} name="bank" />
            </GridItem>
          </Grid>

          <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(2,1fr)" columnGap={40}>
            <GridItem>
              <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                {t['kymCoopInvestments']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput size="xs" textAlign="right" type="number" min={0} name="investments" />
            </GridItem>
          </Grid>

          <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(2,1fr)" columnGap={40}>
            <GridItem>
              <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                {t['kymCoopLoan']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput size="xs" textAlign="right" type="number" min={0} name="loan" />
            </GridItem>
          </Grid>

          <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(2,1fr)" columnGap={40}>
            <GridItem>
              <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                {t['kymCoopNoncurrentassets']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                size="xs"
                textAlign="right"
                type="number"
                min={0}
                name="nonCurrentAssets"
              />
            </GridItem>
          </Grid>

          <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(2,1fr)" columnGap={40}>
            <GridItem>
              <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                {t['kymCoopOthernoncurrentassets']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                size="xs"
                textAlign="right"
                type="number"
                min={0}
                name="otherNonCurrentAssets"
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
              <Text mb="s16" color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="SemiBold">
                {t['kymCoopTotal']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                size="xs"
                isDisabled
                bg="neutralColorLight.Gray-20"
                border="1px solid"
                borderColor="disabled.disabled"
                textAlign="right"
                type="text"
                name="totalAssets"
                value={isNaN(totalAssets) ? '0.00' : totalAssets}
              />
            </GridItem>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};
