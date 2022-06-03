import { useCallback, useMemo } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { BsCloudUpload } from 'react-icons/bs';
import { Flex, Text } from '@chakra-ui/react';

import { dropdownStyles } from './FileInputStyles';
import Box from '../box/Box';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import { TextFields } from '../text-fields/TextFields';

export interface FileInputProps extends DropzoneOptions {
  size?: 'sm' | 'md' | 'lg';
  dropText?: string;
  onChange?: (file: File | null) => void;
}

/**
 *
 * @see https://react-dropzone.js.org/#section-accepting-specific-file-types for more info about providing props.
 */
export function FileInput({
  size = 'md',
  onChange,
  dropText = 'or drop files to upload',
  ...rest
}: FileInputProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange && onChange(acceptedFiles[0]);
  }, []);

  const { getInputProps, getRootProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      ...rest,
    });

  const style = useMemo(
    () => ({
      ...dropdownStyles.baseStyle,
      ...(isFocused ? dropdownStyles.focusedStyle : {}),
      ...(isDragAccept ? dropdownStyles.acceptStyle : {}),
      ...(isDragReject ? dropdownStyles.rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Box
      height={size === 'md' ? '124px' : size === 'sm' ? '64px' : '200px'}
      cursor="pointer"
      _hover={{
        bg: 'neutralColorLight.Gray-10',
      }}
      {...getRootProps({ style })}
    >
      <input {...getInputProps()} />
      <Flex
        direction="column"
        gap={size === 'md' ? 's8' : 's16'}
        alignItems="center"
        justifyContent={'center'}
      >
        {size === 'lg' || size === 'sm' ? (
          <Icon as={BsCloudUpload} size="xl" />
        ) : null}

        {size === 'lg' ? (
          <Button shade="neutral" variant="outline">
            Add File
          </Button>
        ) : size === 'md' ? (
          <Text fontSize="r1" fontWeight="500">
            Add File
          </Text>
        ) : null}

        {size === 'sm' ? null : (
          <TextFields
            align={'center'}
            variant={size === 'md' ? 'bodySmall' : 'bodyRegular'}
            color="neutralColorLight.Gray-60"
          >
            {dropText}
          </TextFields>
        )}
      </Flex>
    </Box>
  );
}

export default FileInput;
