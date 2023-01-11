import { useFormContext } from 'react-hook-form';

import { Box } from '@myra-ui';

import { PrintPreferenceInput, SlipSizeStandard } from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';

import { WithdrawSlipPrintBlock } from './WithdrawSlipPrintBlock';

const slipDimensions = {
  [SlipSizeStandard.Width_9Height_3]: {
    height: '3in',
    width: '9in',
  },
  [SlipSizeStandard.Width_7Point5Height_3Point5]: {
    height: '3.5in',
    width: '7.5in',
  },
  [SlipSizeStandard.Width_7Height_3Point5]: {
    height: '3.5in',
    width: '7in',
  },
};

export const WithdrawSlipPrintPreview = () => {
  const { watch } = useFormContext<PrintPreferenceInput>();

  const slipSize = watch('slipSizeStandard');
  const slipCustomSize = watch('slipSizeCustom');

  const block1Pos = watch('blockOne') || { left: 0, top: 0 };
  const block2Pos = watch('blockTwo') || { left: 0, top: 0 };
  const block3Pos = watch('blockThree') || { left: 0, top: 0 };

  const getSlipSize = () => {
    if (!slipSize)
      return {
        height: 0,
        width: 0,
      };

    if (slipSize === 'CUSTOM') {
      return {
        height: `${slipCustomSize?.height || 0}in`,
        width: `${slipCustomSize?.width || 0}in`,
      };
    }

    return slipDimensions[slipSize];
  };

  return (
    <SettingsCard title="Print Preview" subtitle="All Block positions will be reflected here">
      <Box bg="gray.100" minH="300px" m="-s16" p="s16">
        <Box
          overflow="hidden"
          position="relative"
          bg="white"
          w={getSlipSize().width}
          h={getSlipSize().height}
        >
          <WithdrawSlipPrintBlock label="BRANCH" posLeft={block1Pos.left} posTop={block1Pos.top} />
          <WithdrawSlipPrintBlock
            borderColor="danger.400"
            label={
              <Box display="flex" flexDir="column" gap="s4">
                <Box> MEMBER NAME </Box>
                <Box> ACCOUNT NUMBER </Box>
                <Box> PRODUCT NAME </Box>
              </Box>
            }
            posLeft={block2Pos.left}
            posTop={block2Pos.top}
          />
          <WithdrawSlipPrintBlock
            origin="bottom"
            label="SLIP NUMBER"
            borderColor="info.400"
            posLeft={block3Pos.left}
            posTop={block3Pos.top}
          />
        </Box>
      </Box>
    </SettingsCard>
  );
};
