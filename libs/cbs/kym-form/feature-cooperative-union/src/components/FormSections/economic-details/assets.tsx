import { FormProvider, useForm } from 'react-hook-form';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';

import { CoopUnionEconomicDetailsInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import {
  getKymSectionCoOperativeUnion,
  useTranslation,
} from '@coop/shared/utils';

import { useCooperativeUnionEconomicDetails } from '../../../hooks';

interface IKymAssestsAndtargetProps {
  setSection: (section: { section: string; subSection: string }) => void;
}

export const KymAssestsAndtarget = ({
  setSection,
}: IKymAssestsAndtargetProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionEconomicDetailsInput>();

  const { watch } = methods;

  useCooperativeUnionEconomicDetails({ methods });

  const cashCurrent = watch('cashAndCashEquivalentCurrent');
  const cashCurrent2 = isNaN(cashCurrent) === true ? 0 : cashCurrent;
  const bankCurrent = watch('bankCurrent');
  const bankCurrent2 = isNaN(bankCurrent) === true ? 0 : bankCurrent;
  const investemntCurrent = watch('investmentsCurrent');
  const investmentCurrent2 =
    isNaN(investemntCurrent) === true ? 0 : investemntCurrent;
  const loanCurrent = watch('loanCurrent');
  const loanCurrent2 = isNaN(loanCurrent) === true ? 0 : loanCurrent;
  const nonCurrentAssetsCurrent = watch('nonCurrentAssetsCurrent');
  const nonCurrentAssetsCurrent2 =
    isNaN(nonCurrentAssetsCurrent) === true ? 0 : nonCurrentAssetsCurrent;
  const otherNonCurrentAssetsCurrent = watch('otherNonCurrentAssetsCurrent');
  const otherNonCurrentAssetsCurrent2 =
    isNaN(otherNonCurrentAssetsCurrent) === true
      ? 0
      : otherNonCurrentAssetsCurrent;

  const totalassestscurrent =
    Number(cashCurrent2) +
    Number(bankCurrent2) +
    Number(investmentCurrent2) +
    Number(loanCurrent2) +
    Number(nonCurrentAssetsCurrent2) +
    Number(otherNonCurrentAssetsCurrent2);

  const cashTarget = isNaN(watch('cashAndCashEquivalentTarget'))
    ? 0
    : watch('cashAndCashEquivalentTarget');
  const bankTarget = isNaN(watch('bankTarget')) ? 0 : watch('bankTarget');
  const investmentsTarget = isNaN(watch('investmentsTarget'))
    ? 0
    : watch('investmentsTarget');
  const loanTarget = isNaN(watch('loanTarget')) ? 0 : watch('loanTarget');
  const currentAssetsTarget = isNaN(watch('nonCurrentAssetsTarget'))
    ? 0
    : watch('nonCurrentAssetsTarget');
  const nonCurrentAssetsTarget = isNaN(watch('otherNonCurrentAssetsTarget'))
    ? 0
    : watch('otherNonCurrentAssetsTarget');

  const totalassestsTARGET =
    Number(cashTarget) +
    Number(bankTarget) +
    Number(investmentsTarget) +
    Number(loanTarget) +
    Number(currentAssetsTarget) +
    Number(nonCurrentAssetsTarget);

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
          scrollMarginTop={'200px'}
          mt="s32"
          pb="s20"
          borderBottom="1px solid"
          borderBottomColor="border.layout"
        >
          <Grid
            columnGap={10}
            alignItems="center"
            px="s14"
            templateColumns="repeat(3,1fr)"
          >
            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopUnionEcoAssets']}
              </Text>
            </GridItem>

            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopUnionEcoCurrent']}
              </Text>
            </GridItem>

            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopUnionEcoTarget']}
              </Text>
            </GridItem>
          </Grid>

          <Divider />

          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(3,1fr)"
            gap="s40"
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopUnionEcoCashAndCashEquivalents']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="cashAndCashEquivalentCurrent"
                __placeholder="0.00"
              />
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="cashAndCashEquivalentTarget"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Divider />
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(3,1fr)"
            gap="s40"
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopUnionEcoBank']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="bankCurrent"
                __placeholder="0.00"
              />
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="bankTarget"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Divider />
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(3,1fr)"
            gap="s40"
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopUnionEcoInvestments']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="investmentsCurrent"
                __placeholder="0.00"
              />
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="investmentsTarget"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Divider />
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(3,1fr)"
            gap="s40"
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopUnionEcoLoanInv']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="loanCurrent"
                __placeholder="0.00"
              />
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="loanTarget"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Divider />
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(3,1fr)"
            gap="s40"
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopUnionEcoNonCurrentAssets']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="nonCurrentAssetsCurrent"
                __placeholder="0.00"
              />
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="nonCurrentAssetsTarget"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Divider />
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(3,1fr)"
            gap="s40"
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopUnionEcootherNonCurrentAssets']}
              </Text>
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="otherNonCurrentAssetsCurrent"
                __placeholder="0.00"
              />
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                type="number"
                min={0}
                name="otherNonCurrentAssetsTarget"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Divider />
          {/* .................................last part ............................... */}
          <Grid
            alignItems="center"
            px="s8"
            py="s16"
            templateColumns="repeat(3,1fr)"
            gap="s40"
          >
            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopUnionRepTotal']}
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
                name="totalAssetsCurrent"
                value={totalassestscurrent}
                __placeholder={t['kymCoopUnionEcoTotalAssets']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                isDisabled={true}
                bg="neutralColorLight.Gray-20"
                border="1px solid"
                borderColor="disabled.disabled"
                textAlign="right"
                type="text"
                name="totalAssetsTarget"
                value={totalassestsTARGET}
                __placeholder={t['kymCoopUnionEcoTotal']}
              />
            </GridItem>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};
