import { Box, Text } from '@myra-ui/foundations';

import { useTranslation } from '@coop/shared/utils';

import { WipSVG } from './WipSVG';

export const WIPState = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="s16"
    >
      <WipSVG />
      <Text color="neutralColorLight.Gray-70" fontWeight="500" fontSize="m1">
        {t['workinProgress']}
      </Text>
      <Text color="neutralColorLight.Gray-50" fontWeight="Regular" fontSize="r1">
        {t['ThisPageIsUnderConstruction']} &nbsp;
        <Text onClick={() => window.location.reload()} as="span" variant="link">
          {t['follow']}
        </Text>
        <Text as="span" color="neutralColorLight.Gray-50" fontWeight="Regular" fontSize="r1">
          {t['usForUpdates']}.
        </Text>
      </Text>
    </Box>
  );
};

export default WIPState;
