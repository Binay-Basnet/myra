import { useDropzone } from 'react-dropzone';
import { useCallback, useMemo } from 'react';
import { TextFields } from '../text-fields/TextFields';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import { BsCloudUpload } from 'react-icons/all';
import { Flex, Text } from '@chakra-ui/react';
import Box from '../box/Box';
import { dropdownStyles } from './FileInputStyles';

export interface FileInputProps {
  size: 'sm' | 'md' | 'lg';
  dropText?: string;
  // TODO ( Change this any )
  onChange: any;
}

export function FileInput({
  size = 'md',
  onChange,
  dropText = 'or drop files to upload',
}: FileInputProps) {
  const onDrop = useCallback((acceptedFiles: any[]) => {
    onChange(acceptedFiles[0]);
  }, []);

  const { getInputProps, getRootProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
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
      <input {...getInputProps({ onChange })} />
      <Flex
        direction="column"
        gap={size === 'md' ? 's8' : 's16'}
        alignItems="center"
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
