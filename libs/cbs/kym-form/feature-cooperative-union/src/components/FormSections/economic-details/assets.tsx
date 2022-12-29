import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';
import { isNaN } from 'lodash';

import {
  CoopUnionEconomicDetailsInput,
  setCooperativeUnionTotalAssetsCurrent,
  setCooperativeUnionTotalAssetsTarget,
} from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { getKymSectionCoOperativeUnion, useTranslation } from '@coop/shared/utils';

import { useCooperativeUnionEconomicDetails } from '../../../hooks';

interface IKymAssestsAndtargetProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymAssestsAndtarget = ({ setSection }: IKymAssestsAndtargetProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const methods = useForm<CoopUnionEconomicDetailsInput>();

  const { watch } = methods;

  useCooperativeUnionEconomicDetails({ methods });

  const cashCurrent = watch('cashAndCashEquivalentCurrent');
  const cashCurrent2 = isNaN(cashCurrent) === true ? 0 : cashCurrent;
  const bankCurrent = watch('bankCurrent');
  const bankCurrent2 = isNaN(bankCurrent) === true ? 0 : bankCurrent;
  const investemntCurrent = watch('investmentsCurrent');
  const investmentCurrent2 = isNaN(investemntCurrent) === true ? 0 : investemntCurrent;
  const loanCurrent = watch('loanCurrent');
  const loanCurrent2 = isNaN(loanCurrent) === true ? 0 : loanCurrent;
  const nonCurrentAssetsCurrent = watch('nonCurrentAssetsCurrent');
  const nonCurrentAssetsCurrent2 =
    isNaN(nonCurrentAssetsCurrent) === true ? 0 : nonCurrentAssetsCurrent;
  const otherNonCurrentAssetsCurrent = watch('otherNonCurrentAssetsCurrent');
  const otherNonCurrentAssetsCurrent2 =
    isNaN(otherNonCurrentAssetsCurrent) === true ? 0 : otherNonCurrentAssetsCurrent;

  const cashTarget = isNaN(watch('cashAndCashEquivalentTarget'))
    ? 0
    : watch('cashAndCashEquivalentTarget');
  const bankTarget = isNaN(watch('bankTarget')) ? 0 : watch('bankTarget');
  const investmentsTarget = isNaN(watch('investmentsTarget')) ? 0 : watch('investmentsTarget');
  const loanTarget = isNaN(watch('loanTarget')) ? 0 : watch('loanTarget');
  const currentAssetsTarget = isNaN(watch('nonCurrentAssetsTarget'))
    ? 0
    : watch('nonCurrentAssetsTarget');
  const nonCurrentAssetsTarget = isNaN(watch('otherNonCurrentAssetsTarget'))
    ? 0
    : watch('otherNonCurrentAssetsTarget');

  const totalassestscurrent =
    Number(cashCurrent2) +
    Number(bankCurrent2) +
    Number(investmentCurrent2) +
    Number(loanCurrent2) +
    Number(nonCurrentAssetsCurrent2) +
    Number(otherNonCurrentAssetsCurrent2);

  const totalassestsTARGET =
    Number(cashTarget) +
    Number(bankTarget) +
    Number(investmentsTarget) +
    Number(loanTarget) +
    Number(currentAssetsTarget) +
    Number(nonCurrentAssetsTarget);

  useEffect(() => {
    dispatch(setCooperativeUnionTotalAssetsCurrent(totalassestscurrent));
    dispatch(setCooperativeUnionTotalAssetsTarget(totalassestsTARGET));
  }, [dispatch, totalassestscurrent, totalassestsTARGET]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          id="kymCoopUnionAccAssets"
          scrollMarginTop="200px"
          mt="s32"
          pb="s20"
          borderBottom="1px solid"
          borderBottomColor="border.layout"
        >
          <Grid columnGap={10} alignItems="center" px="s14" templateColumns="repeat(3,1fr)">
            <GridItem>
              <Text mb="s16" color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="SemiBold">
                {t['kymCoopUnionEcoAssets']}
              </Text>
            </GridItem>

            <GridItem>
              <Text mb="s16" color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="SemiBold">
                {t['kymCoopUnionEcoCurrent']}
              </Text>
            </GridItem>

            <GridItem>
              <Text mb="s16" color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="SemiBold">
                {t['kymCoopUnionEcoTarget']}
              </Text>
            </GridItem>
          </Grid>

          <Divider />

          <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(3,1fr)" gap="s40">
            <GridItem>
              <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                {t['kymCoopUnionEcoCashAndCashEquivalents']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="cashAndCashEquivalentCurrent"
              />
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="cashAndCashEquivalentTarget"
              />
            </GridItem>
          </Grid>
          <Divider />
          <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(3,1fr)" gap="s40">
            <GridItem>
              <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                {t['kymCoopUnionEcoBank']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput textAlign="right" type="number" min={0} name="bankCurrent" />
            </GridItem>
            <GridItem>
              <FormInput textAlign="right" type="number" min={0} name="bankTarget" />
            </GridItem>
          </Grid>
          <Divider />
          <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(3,1fr)" gap="s40">
            <GridItem>
              <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                {t['kymCoopUnionEcoInvestments']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput textAlign="right" type="number" min={0} name="investmentsCurrent" />
            </GridItem>
            <GridItem>
              <FormInput textAlign="right" type="number" min={0} name="investmentsTarget" />
            </GridItem>
          </Grid>
          <Divider />
          <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(3,1fr)" gap="s40">
            <GridItem>
              <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                {t['kymCoopUnionEcoLoanInv']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput textAlign="right" type="number" min={0} name="loanCurrent" />
            </GridItem>
            <GridItem>
              <FormInput textAlign="right" type="number" min={0} name="loanTarget" />
            </GridItem>
          </Grid>
          <Divider />
          <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(3,1fr)" gap="s40">
            <GridItem>
              <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                {t['kymCoopUnionEcoNonCurrentAssets']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput textAlign="right" type="number" min={0} name="nonCurrentAssetsCurrent" />
            </GridItem>
            <GridItem>
              <FormInput textAlign="right" type="number" min={0} name="nonCurrentAssetsTarget" />
            </GridItem>
          </Grid>
          <Divider />
          <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(3,1fr)" gap="s40">
            <GridItem>
              <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                {t['kymCoopUnionEcootherNonCurrentAssets']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="otherNonCurrentAssetsCurrent"
              />
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="otherNonCurrentAssetsTarget"
              />
            </GridItem>
          </Grid>
          <Divider />
          {/* .................................last part ............................... */}
          <Grid alignItems="center" px="s8" py="s16" templateColumns="repeat(3,1fr)" gap="s40">
            <GridItem>
              <Text mb="s16" color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="SemiBold">
                {t['kymCoopUnionRepTotal']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                isDisabled
                bg="neutralColorLight.Gray-20"
                border="1px solid"
                borderColor="disabled.disabled"
                textAlign="right"
                type="text"
                name="totalAssetsCurrent"
                value={totalassestscurrent}
              />
            </GridItem>
            <GridItem>
              <FormInput
                isDisabled
                bg="neutralColorLight.Gray-20"
                border="1px solid"
                borderColor="disabled.disabled"
                textAlign="right"
                type="text"
                name="totalAssetsTarget"
                value={totalassestsTARGET}
              />
            </GridItem>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};
