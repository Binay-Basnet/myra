import Image from 'next/legacy/image';

import { Box, Radio } from '@myra-ui';

export const ImageFileComponent = (props: { type?: 'png' | 'jpg' }) => {
  const { type = 'jpg' } = props;
  return (
    <Box p="s16" borderRadius="8" height={114} width={138}>
      <Box display="flex" justifyContent="flex-end">
        <Radio />
      </Box>
      <Box display="flex">
        <Image src={type === 'png' ? '/png.svg' : 'jpg.svg'} height={92} width={77} />
      </Box>
    </Box>
  );
};

export default ImageFileComponent;
