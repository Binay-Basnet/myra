import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsCloudUpload } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { useDeepCompareEffect } from 'react-use';
import Image from 'next/legacy/image';
import {
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Progress,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';

import { Box, Button, Icon, Text } from '@myra-ui/foundations';

import { useGetPreSignedUrlMutation } from '@coop/neosys-admin/data-access';

import { DefaultFileIcon, FileInputProps } from './FileInput';
import { dropdownStyles } from './styles/fileInputStyles';

type FileWithUrl = { url?: string; identifier: string };

export const NeosysFileInput = ({
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
          bg: 'gray.100',
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
            <Text
              align="center"
              variant={size === 'md' ? 'bodySmall' : 'bodyRegular'}
              color="gray.600"
            >
              {dropText}
            </Text>
          )}
        </Flex>
      </Box>

      {files.map((file) => (
        <Fragment key={file.name}>
          <NeosysFilePreview
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
          <NeosysFileUrlPreview
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

export const NeosysFilePreview = ({
  file,
  // size,
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
        const preSignedUrl = await getPreSignedUrl(
          {
            contentType: file.type,
          },
          {}
        );

        const putUrl = preSignedUrl?.presignedUrl?.upload?.putUrl;
        const filename = preSignedUrl?.presignedUrl?.upload?.filename;
        const publicUrl = preSignedUrl?.presignedUrl?.upload?.getUrl;

        if (typeof putUrl !== 'string' || !filename || !publicUrl) {
          setError(true);
          return;
        }

        const putResponse = await axios.put(putUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
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
          {/* {size === 'lg' && ( */}
          <Box>
            <Text
              variant="bodyRegular"
              fontWeight="500"
              color="gray.800"
              noOfLines={1}
              width="100%"
            >
              {file.name}
            </Text>
            {!error ? (
              <Text variant="formLabel" color="gray.600">
                {file?.size && (Number(file?.size) / 1000 / 1000).toPrecision(2)} MB
              </Text>
            ) : (
              <Text variant="formLabel" color="danger.500">
                Upload Failed
              </Text>
            )}
          </Box>
          {/* )} */}
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

export const NeosysFileUrlPreview = ({
  fileUrl,
  identifier,
  // size,
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
          {/* {size === 'lg' && ( */}
          <Box>
            <Text
              variant="bodyRegular"
              fontWeight="500"
              color="gray.800"
              noOfLines={1}
              width="100%"
            >
              {file?.name}
            </Text>
            <Text variant="formLabel" color="gray.600">
              {file?.size && (Number(file?.size) / 1000 / 1000).toPrecision(2)} MB
            </Text>
          </Box>
          {/* )} */}
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
