import Image from "next/legacy/image";

import { useTranslation } from '@coop/shared/utils';

import Box from '../box/Box';
import Text from '../text/Text';
import TextFields from '../text-fields/TextFields';

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
      <Image height={100} width={100} src="/workInProgress.svg" alt="cetral chakra" />
      <Text color="neutralColorLight.Gray-70" fontWeight="500" fontSize="m1">
        {t['workinProgress']}
      </Text>
      <Text color="neutralColorLight.Gray-50" fontWeight="Regular" fontSize="r1">
        {t['ThisPageIsUnderConstruction']} &nbsp;
        <TextFields onClick={() => window.location.reload()} as="span" variant="link">
          {t['follow']}
        </TextFields>
        <Text as="span" color="neutralColorLight.Gray-50" fontWeight="Regular" fontSize="r1">
          {t['usForUpdates']}.
        </Text>
      </Text>
    </Box>
  );
};

export default WIPState;
