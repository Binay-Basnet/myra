import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';

import { KymCooperativeFormInput, setCooperativeTotalEquity } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KymEquityLiabilities = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { watch } = useFormContext<KymCooperativeFormInput>();

  const shareCapital = watch('shareCapital') || 0;
  const reserveAndSurplus = watch('reserveAndSurplus') || 0;
  const savingDeposit = watch('savingDeposit') || 0;
  const loanAccount = watch('loanAccount') || 0;
  const capitalGrant = watch('capitalGrant') || 0;
  const currentLiabilities = watch('currentLiabilities') || 0;
  const nonCurrentLiabilities = watch('nonCurrentLiabilities') || 0;

  const totalEquityAndLiabilities =
    Number(shareCapital) +
    Number(reserveAndSurplus) +
    Number(savingDeposit) +
    Number(loanAccount) +
    Number(capitalGrant) +
    Number(currentLiabilities) +
    Number(nonCurrentLiabilities);

  useEffect(() => {
    dispatch(setCooperativeTotalEquity(totalEquityAndLiabilities));
  }, [dispatch, totalEquityAndLiabilities]);

  return (
    <Box
      p="s20"
      id="kymCoopAccEquityandLiabilities"
      display="flex"
      flexDirection="column"
      borderBottom="1px solid"
      borderBottomColor="border.layout"
    >
      <Grid columnGap={40} alignItems="center" px="s14" templateColumns="repeat(2,1fr)">
        <GridItem>
          <Text mb="s16" color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="SemiBold">
            {t['kymCoopEquityandLiabilities']}
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
            {t['kymCoopShareCapital']}
          </Text>
        </GridItem>

        <GridItem>
          <FormInput size="xs" textAlign="right" type="number" min={0} name="shareCapital" />
        </GridItem>
      </Grid>
      <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(2,1fr)" columnGap={40}>
        <GridItem>
          <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
            {t['kymCoopReserveandsurplus']}
          </Text>
        </GridItem>

        <GridItem>
          <FormInput size="xs" textAlign="right" type="number" min={0} name="reserveAndSurplus" />
        </GridItem>
      </Grid>
      <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(2,1fr)" columnGap={40}>
        <GridItem>
          <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
            {t['kymCoopSavingDeposit']}
          </Text>
        </GridItem>

        <GridItem>
          <FormInput size="xs" textAlign="right" type="number" min={0} name="savingDeposit" />
        </GridItem>
      </Grid>
      <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(2,1fr)" columnGap={40}>
        <GridItem>
          <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
            {t['kymCoopLoanAccount']}
          </Text>
        </GridItem>

        <GridItem>
          <FormInput size="xs" textAlign="right" type="number" min={0} name="loanAccount" />
        </GridItem>
      </Grid>
      <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(2,1fr)" columnGap={40}>
        <GridItem>
          <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
            {t['kymCoopCapitalGrant']}
          </Text>
        </GridItem>

        <GridItem>
          <FormInput size="xs" textAlign="right" type="number" min={0} name="capitalGrant" />
        </GridItem>
      </Grid>
      <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(2,1fr)" columnGap={40}>
        <GridItem>
          <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
            {t['kymCoopCurrentLiabilitiesandpayable']}
          </Text>
        </GridItem>

        <GridItem>
          <FormInput size="xs" textAlign="right" type="number" min={0} name="currentLiabilities" />
        </GridItem>
      </Grid>
      <Grid alignItems="center" px="s8" py="s12" templateColumns="repeat(2,1fr)" columnGap={40}>
        <GridItem>
          <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
            {t['kymCoopNoncurrentliabilities']}
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            size="xs"
            textAlign="right"
            type="number"
            min={0}
            name="nonCurrentLiabilities"
          />
        </GridItem>
      </Grid>

      <Divider />

      <Grid alignItems="center" px="14px" py="s16" templateColumns="repeat(2,1fr)" columnGap={40}>
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
            name="totalEquityLiabilities"
            value={totalEquityAndLiabilities}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
