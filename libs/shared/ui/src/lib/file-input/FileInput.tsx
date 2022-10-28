/* eslint-disable */
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { BsCloudUpload } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { useDeepCompareEffect } from 'react-use';
import Image from 'next/image';
import {
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Progress,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { isEmpty, isEqual, xorWith } from 'lodash';

import { useGetPreSignedUrlMutation } from '@coop/cbs/data-access';

import { dropdownStyles } from './FileInputStyles';
import Box from '../box/Box';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import TextFields from '../text-fields/TextFields';

export const DefaultFileIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export const isArrayEqual = <T,>(x: T[], y: T[]) => isEmpty(xorWith(x, y, isEqual));

type FileWithUrl = { url?: string; identifier: string };

export interface FileInputProps extends Omit<DropzoneOptions, 'maxFiles'> {
  size?: 'sm' | 'md' | 'lg';
  dropText?: string;
  value?: { url?: string; identifier: string }[];
  onChange?: (file: string[] | FileWithUrl[] | null) => void;
  maxFiles?: 'one' | 'many';
  generateUrls?: true | never;
}

export const FileInput = ({
  size = 'md',
  onChange,
  dropText = 'or drop files to upload',
  value = [],
  maxFiles = 'many',
  generateUrls,
  ...rest
}: FileInputProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[] | FileWithUrl[]>([]);
  const [alreadyAddedFiles, setAlreadyAddedFiles] = useState<
    { url?: string; identifier: string }[] | null
  >(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getInputProps, getRootProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    disabled: maxFiles === 'one' && files.length === 1,

    maxFiles: maxFiles === 'one' ? 1 : Infinity,
    multiple: maxFiles !== 'one',

    ...rest,
  });

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

  useEffect(() => {
    if (onChange) {
      onChange(fileNames);
    }
  }, [fileNames.length]);

  useDeepCompareEffect(() => {
    if (
      (!alreadyAddedFiles || alreadyAddedFiles?.length === 0) &&
      !files.some((file) => value?.some((valueFile) => valueFile.identifier === file.name)) &&
      files.length === 0
    ) {
      if (value) {
        setAlreadyAddedFiles(value);
      }
    }
  }, [value]);

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
          justifyContent="center"
        >
          {size === 'lg' || size === 'sm' ? <Icon as={BsCloudUpload} size="xl" /> : null}

          {size === 'lg' ? (
            <Button shade="neutral" variant="outline">
              <Text color="gray.800"> Add File</Text>
            </Button>
          ) : size === 'md' ? (
            <Text fontSize="r1" fontWeight="500" as="div">
              <Text color="gray.800"> Add File</Text>
            </Text>
          ) : null}

          {size === 'sm' ? null : (
            <TextFields
              align="center"
              variant={size === 'md' ? 'bodySmall' : 'bodyRegular'}
              color="neutralColorLight.Gray-60"
            >
              {dropText}
            </TextFields>
          )}
        </Flex>
      </Box>

      {files.map((file) => (
        <Fragment key={file.name}>
          <FilePreview
            file={file}
            size={size}
            generateFileUrls={generateUrls}
            setFileNames={setFileNames as any}
            remove={() => setFiles((prev) => prev.filter((f) => f.name !== file.name))}
          />
        </Fragment>
      ))}

      {alreadyAddedFiles?.map((fileUrl) => (
        <Fragment key={fileUrl?.url}>
          <FileUrlPreview
            setFileNames={setFileNames as any}
            generateFileUrls={generateUrls}
            identifier={fileUrl?.identifier}
            fileUrl={String(fileUrl?.url)}
            size={size}
            remove={() => {
              setAlreadyAddedFiles((prev) =>
                prev ? prev.filter((f) => f.identifier !== fileUrl.identifier) : null
              );
            }}
          />
        </Fragment>
      ))}
    </Box>
  );
};

type FilePreviewProps =
  | {
      file: File;
      size: 'sm' | 'md' | 'lg';
      remove?: () => void;
      setFileNames?: React.Dispatch<React.SetStateAction<FileWithUrl[]>>;
      generateFileUrls?: true;
    }
  | {
      file: File;
      size: 'sm' | 'md' | 'lg';
      remove?: () => void;
      setFileNames?: React.Dispatch<React.SetStateAction<string[]>>;
      generateFileUrls?: false;
    };

export const FilePreview = ({
  file,
  size,
  remove,
  setFileNames,
  generateFileUrls,
}: FilePreviewProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [error, setError] = useState<boolean>(false);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [identifier, setFileName] = useState<string | undefined>('4i9r4');

  const { mutateAsync: getPreSignedUrl } = useGetPreSignedUrlMutation({
    onMutate: () => {
      setFileUploadProgress(1);
    },
    onSuccess: () => {
      setFileUploadProgress(2);
    },
  });

  useEffect(() => {
    const uploadFile = async () => {
      try {
        const {
          presignedUrl: {
            upload: { getUrl: publicUrl, putUrl, filename },
          },
        } = await getPreSignedUrl(
          {
            contentType: file.type,
          },
          {}
        );

        if (typeof putUrl !== 'string' || !filename || !publicUrl) {
          setError(true);
          return;
        }
        const putResponse = await axios.put(putUrl, file, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = (progressEvent.loaded * 98) / progressEvent.total + 2;
            setFileUploadProgress(percentCompleted);
          },
        });

        if (putResponse.status === 200) {
          if (setFileNames) {
            setFileName(filename);
            if (generateFileUrls) {
              setFileNames((prev) => [...prev, { identifier: filename, url: publicUrl }]);
            } else {
              setFileNames((prev: any) => [...prev, filename]);
            }
          }

          setFileUrl(publicUrl);
        }
      } catch (e) {
        setError(true);
      }
    };

    if (!error) {
      uploadFile();
    }
  }, [error]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      border="1px solid"
      borderColor="border.element"
      borderRadius="br2"
      overflow="hidden"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="s12"
        p="s8"
        maxWidth="100%"
      >
        <Box display="flex" alignItems="center" gap="s8">
          <Box
            w="s48"
            h="s48"
            display="flex"
            onClick={() => file?.type.includes('image') && onOpen()}
            alignItems="center"
            justifyContent="center"
            position="relative"
            cursor="pointer"
          >
            {fileUrl && file?.type.includes('image') ? (
              <Image src={fileUrl} layout="fill" objectFit="contain" />
            ) : (
              <Icon as={DefaultFileIcon} size="lg" />
            )}
          </Box>
          {size === 'lg' && (
            <Box>
              <TextFields
                variant="bodyRegular"
                fontWeight="500"
                color="gray.800"
                noOfLines={1}
                width="100%"
              >
                {file.name}
              </TextFields>
              {!error ? (
                <TextFields variant="formLabel" color="gray.600">
                  {file?.size && (Number(file?.size) / 1000 / 1000).toPrecision(2)} MB
                </TextFields>
              ) : (
                <TextFields variant="formLabel" color="danger.500">
                  Upload Failed
                </TextFields>
              )}
            </Box>
          )}
        </Box>
        <Icon
          as={IoClose}
          size="lg"
          cursor="pointer"
          onClick={() => {
            if (remove) {
              remove();
            }
            if (setFileNames) {
              if (generateFileUrls) {
                setFileNames((prev) => prev.filter((name) => name.identifier !== identifier));
              } else {
                setFileNames((prev: any[]) => prev.filter((name) => name !== identifier));
              }
            }
          }}
        />

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />

          <ModalContent
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="300px"
          >
            <ModalCloseButton _focus={{ boxShadow: 'none' }} />
            <img src={fileUrl} alt="file" />
          </ModalContent>
        </Modal>
      </Box>
      {!error ? <Progress size="xs" colorScheme="primary" value={fileUploadProgress} /> : null}
    </Box>
  );
};

type FileUrlPreviewProps =
  | {
      fileUrl: string;
      identifier: string;
      size: 'sm' | 'md' | 'lg';
      remove?: () => void;
      setFileNames: React.Dispatch<React.SetStateAction<FileWithUrl[]>>;
      generateFileUrls?: true;
    }
  | {
      fileUrl: string;
      identifier: string;
      size: 'sm' | 'md' | 'lg';
      remove?: () => void;
      setFileNames: React.Dispatch<React.SetStateAction<string[]>>;
      generateFileUrls?: never;
    };

export const FileUrlPreview = ({
  fileUrl,
  identifier,
  size,
  remove,
  setFileNames,
  generateFileUrls,
}: FileUrlPreviewProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const getFile = async () => {
      if (!fileUrl) return;

      const response = await fetch(fileUrl);

      const blob = await response.blob();
      const newFile = new File([blob], identifier, {
        // Todo use switch case for this type using extension of filename
        type: 'image/jpeg',
      });

      setFile(newFile);
    };

    getFile();
  }, [fileUrl]);

  useEffect(() => {
    if (generateFileUrls) {
      setFileNames((prev) => [...prev, { url: fileUrl, identifier }]);
    } else {
      setFileNames((prev: any) => [...prev, identifier]);
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      border="1px solid"
      borderColor="border.element"
      borderRadius="br2"
      overflow="hidden"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="s12"
        p="s8"
        minWidth="128px"
        maxWidth="100%"
      >
        <Box display="flex" alignItems="center" gap="s8">
          <Box
            w="s48"
            h="s48"
            display="flex"
            onClick={() => file?.type.includes('image') && onOpen()}
            alignItems="center"
            justifyContent="center"
            position="relative"
            cursor="pointer"
          >
            {fileUrl && fileUrl.includes('http') && file?.type.includes('image') ? (
              <Image src={fileUrl} layout="fill" objectFit="contain" />
            ) : (
              <Icon as={DefaultFileIcon} size="lg" />
            )}
          </Box>
          {size === 'lg' && (
            <Box>
              <TextFields
                variant="bodyRegular"
                fontWeight="500"
                color="gray.800"
                noOfLines={1}
                width="100%"
              >
                {file?.name}
              </TextFields>
              <TextFields variant="formLabel" color="gray.600">
                {file?.size && (Number(file?.size) / 1000 / 1000).toPrecision(2)} MB
              </TextFields>
            </Box>
          )}
        </Box>
        <Icon
          as={IoClose}
          size="lg"
          cursor="pointer"
          onClick={() => {
            if (remove) {
              remove();
            }

            if (generateFileUrls) {
              setFileNames((prev) => prev.filter((name) => name.identifier !== identifier));
            } else {
              setFileNames((prev: any[]) => prev.filter((name) => name !== identifier));
            }
          }}
        />
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />

          <ModalContent
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="300px"
          >
            <ModalCloseButton _focus={{ boxShadow: 'none' }} />
            <img src={fileUrl} alt="fileUrl" />
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};
