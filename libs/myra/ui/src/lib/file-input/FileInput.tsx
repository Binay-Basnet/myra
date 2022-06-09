import { useCallback, useEffect, useMemo, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { BsCloudUpload } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import {
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { dropdownStyles } from './FileInputStyles';
import Box from '../box/Box';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import { TextFields } from '../text-fields/TextFields';

export interface FileInputProps extends Omit<DropzoneOptions, 'maxFiles'> {
  size?: 'sm' | 'md' | 'lg';
  dropText?: string;
  onChange?: (file: File[] | null) => void;
  maxFiles?: 'one' | 'many';
}

const DefaultFileIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.75 14H18C17.2044 14 16.4413 13.6839 15.8787 13.1213C15.3161 12.5587 15 11.7956 15 11V2.25C15 2.1837 14.9737 2.12011 14.9268 2.07322C14.8799 2.02634 14.8163 2 14.75 2H9C7.93913 2 6.92172 2.42143 6.17157 3.17157C5.42143 3.92172 5 4.93913 5 6V26C5 27.0609 5.42143 28.0783 6.17157 28.8284C6.92172 29.5786 7.93913 30 9 30H23C24.0609 30 25.0783 29.5786 25.8284 28.8284C26.5786 28.0783 27 27.0609 27 26V14.25C27 14.1837 26.9737 14.1201 26.9268 14.0732C26.8799 14.0263 26.8163 14 26.75 14Z"
        fill="#006837"
      />
      <path
        d="M26.2013 11.7872L17.2131 2.79905C17.1956 2.78167 17.1734 2.76985 17.1492 2.76507C17.1251 2.76029 17.1 2.76276 17.0772 2.77218C17.0545 2.7816 17.035 2.79754 17.0212 2.818C17.0075 2.83846 17.0001 2.86252 17 2.88717V11.0003C17 11.2655 17.1054 11.5199 17.2929 11.7074C17.4804 11.8949 17.7348 12.0003 18 12.0003H26.1131C26.1378 12.0002 26.1618 11.9928 26.1823 11.9791C26.2028 11.9653 26.2187 11.9458 26.2281 11.9231C26.2375 11.9003 26.24 11.8752 26.2352 11.8511C26.2304 11.8269 26.2186 11.8046 26.2013 11.7872Z"
        fill="#006837"
      />
    </svg>
  );
};

/**
 *
 * @see https://react-dropzone.js.org/#section-accepting-specific-file-types for more info about providing props.
 */
export function FileInput({
  size = 'md',
  onChange,
  dropText = 'or drop files to upload',
  maxFiles = 'many',
  ...rest
}: FileInputProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([...files, ...acceptedFiles]);

      onChange && onChange([...files, ...acceptedFiles]);
    },
    [files]
  );

  const { getInputProps, getRootProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,

      maxFiles: maxFiles === 'one' ? 1 : Infinity,
      multiple: maxFiles !== 'one',

      ...rest,
    });

  const removeFile = (file: File) => {
    const newFiles = files.filter((prev) => prev !== file);
    setFiles(newFiles);
    onChange && onChange(newFiles);
  };

  const style = useMemo(
    () => ({
      ...dropdownStyles.baseStyle,
      ...(files.length !== 0 ? dropdownStyles.acceptStyle : {}),
      ...(isFocused ? dropdownStyles.focusedStyle : {}),
      ...(isDragAccept ? dropdownStyles.acceptStyle : {}),
      ...(isDragReject ? dropdownStyles.rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Box display="flex" flexDirection="column" gap="s12">
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

      {files.map((file) => {
        return (
          <FileInputPreview
            file={file}
            size={size}
            remove={() => removeFile(file)}
          />
        );
      })}
    </Box>
  );
}

export const FileInputPreview = ({
  file,
  remove,
  size,
}: {
  file: File;
  remove: any;
  size: 'sm' | 'md' | 'lg';
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setFileUrl(reader.result as string);
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="s12"
      p="s8"
      border="1px solid"
      borderColor="border.element"
      borderRadius="br2"
      minWidth="128px"
    >
      <Box display="flex" alignItems="center" gap="s8">
        <Box
          w="s48"
          h="s48"
          display="flex"
          onClick={() => file.type.includes('image') && onOpen()}
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
        >
          {fileUrl && file.type.includes('image') ? (
            <img src={fileUrl} />
          ) : (
            <Icon as={DefaultFileIcon} size="lg" />
          )}
        </Box>
        {size === 'lg' && (
          <Box>
            <TextFields variant="bodyRegular" fontWeight="500" color="gray.800">
              {file.name}
            </TextFields>
            <TextFields variant="formLabel" color="gray.600">
              {(file.size / 1000 / 1000).toPrecision(2)} MB
            </TextFields>
          </Box>
        )}
      </Box>
      {size === 'md' || size === 'lg' || size === 'sm' ? (
        <Icon
          as={IoClose}
          size="lg"
          cursor="pointer"
          onClick={() => remove()}
        />
      ) : null}

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="300px"
        >
          <ModalCloseButton _focus={{ boxShadow: 'none' }} />
          <img src={fileUrl} />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FileInput;
