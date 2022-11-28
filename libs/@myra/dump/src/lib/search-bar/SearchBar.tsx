import { Fragment, useEffect, useRef, useState } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { IconType } from 'react-icons';
import { AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import {
  IoClose,
  IoDocumentTextOutline,
  IoList,
  IoReturnDownBack,
  IoSearch,
} from 'react-icons/io5';
import { MdOutlineHistory } from 'react-icons/md';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react';

import { Filter_Mode, useGetGlobalSearchQuery, useGetNewIdMutation } from '@coop/cbs/data-access';
import { useDebounce } from '@coop/shared/utils';

import { useSearchNavigate } from './useSearchNavigate';
import Icon from '../icon/Icon';
import Loader from '../loader/Loader';

const keyMap = {
  inputFocus: ['ctrl+/'],
  appSwitcher: 'alt+o',
  showHelpOptions: ['alt+l'],
  clearSearchFocus: ['ctrl+b'],

  // up: ["i"],
  // shiftUp: ["shift+i"],
  // delete: ["r"],
  // addFocus: ["a"]
};

/* eslint-disable-next-line */
export interface SearchBarProps extends InputProps {}

// const recentSearch = [
//   {
//     title: 'Old Dump /Share Issue',
//     link: '/share/share-issue',
//   },
//   {
//     title: 'Old Dump /Member List',
//     link: '/members/list',
//   },
//   {
//     title: 'Old Dump /Account List',
//     link: '/accounts/list',
//   },
//   {
//     title: 'Old Dump /Share Register Report',
//     link: '/reports/cbs/share-report/new',
//   },
// ];

const ICONS: Record<string, IconType> = {
  LIST: IoList,
  REPORTS: IoDocumentTextOutline,
  ADD: AiOutlinePlus,
  PROFILE: FaUser,
  SETTINGS: AiOutlineSetting,
};

const users = [
  {
    id: '43339311893393030393845',
    name: 'Ram Dhakal',
    app: 'Core Banking System',
    image:
      'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    link: '/members/list',
  },
  {
    id: '43339311893393030393845',
    name: 'Ram Dhakal',
    app: 'Core Banking System',
    image:
      'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    link: '/members/list',
  },
  {
    id: '43339311893393030393845',
    name: 'Ram Dhakal',
    app: 'Core Banking System',
    link: '/members/list',
    image:
      'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
];

export const SearchBar = () => {
  const router = useRouter();

  const [inputSearch, setInputSearch] = useState('');
  const [searchAction, setSearchAction] = useState<'FOCUS' | 'SIMPLE' | 'USER' | 'EMPTY'>('EMPTY');

  const debouncedValue = useDebounce(inputSearch, 800);

  const recentSearches = (
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('recent-search') ?? '[]') : []
  ) as {
    title: string;
    link: string;
    hasParams: boolean;
  }[];

  const recentSearch = recentSearches?.reverse().slice(0, 4);

  const { mutateAsync: getNewId } = useGetNewIdMutation();
  const { data: globalSearchData, isLoading } = useGetGlobalSearchQuery(
    {
      filter: { filterMode: Filter_Mode.Or, query: debouncedValue, page: debouncedValue },
      pagination: { after: '', first: 4 },
    },
    {
      enabled: searchAction === 'SIMPLE',
    }
  );

  const globalSearch = globalSearchData?.search?.globalPages?.data?.edges;

  const searchBarRef = useRef<HTMLInputElement>(null);
  const handlers = {
    inputFocus() {
      searchBarRef.current?.focus();
    },
    clearSearchFocus() {
      searchBarRef.current?.blur();
    },
  };

  const searchActionFunc = () => {
    if (searchAction === 'FOCUS' || searchAction === 'EMPTY') {
      return recentSearches?.map((s) => ({
        ...s,
        hasParam: Boolean(s?.hasParams),
      }));
    }
    if (searchAction === 'SIMPLE') {
      return globalSearch?.map((s) => ({
        link: s?.node?.url,
        hasParam: Boolean(s?.node?.hasParam),
      }));
    }
    return users;
  };

  const { focusState, setFocusState } = useSearchNavigate({
    setSearchAction,
    searchBarRef,
    setInputSearch,
    list: searchActionFunc(),
  });

  useEffect(() => {
    setFocusState('EMPTY');
  }, [searchAction, setFocusState]);

  return (
    <Box position="relative" width="100%">
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formSearch = globalSearch?.find((search) => search?.node?.fullCode === inputSearch);

          if (formSearch) {
            const response = formSearch?.node?.hasParam ? await getNewId({}) : null;

            router
              .push(`${formSearch?.node?.url}${response ? `/${response?.newId}` : ''}` as string)
              .then(() => {
                const currentSearch = {
                  title: formSearch?.node?.page,
                  link: formSearch?.node?.url,
                  hasParams: formSearch?.node?.hasParam,
                };

                if (recentSearches && recentSearches?.length !== 0) {
                  localStorage.setItem(
                    'recent-search',
                    JSON.stringify([...recentSearches, currentSearch])
                  );
                } else {
                  localStorage.setItem('recent-search', JSON.stringify([currentSearch]));
                }

                setSearchAction('EMPTY');
                searchBarRef?.current?.blur();
                setInputSearch('');
              });
          }
        }}
      >
        <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
          <InputGroup
            width="100%"
            borderRadius="6px"
            border="none"
            flex={1}
            color="white"
            borderColor="secondary.700"
            _hover={{ color: 'gray.700' }}
          >
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={IoSearch} fontSize="lg" />}
              color={searchAction !== 'EMPTY' ? 'gray.800' : 'currentcolor'}
            />
            <Input
              type="text"
              id="search-input"
              placeholder="Search"
              autoComplete="off"
              color="white"
              fontSize="r1"
              ref={searchBarRef}
              value={inputSearch}
              border="none"
              bg="secondary.900"
              onFocus={() => {
                if (inputSearch) {
                  if (inputSearch[0] === '@') {
                    setSearchAction('USER');
                  } else {
                    setSearchAction('SIMPLE');
                  }
                } else {
                  setSearchAction('FOCUS');
                }
              }}
              onChange={(e) => {
                setInputSearch(e.target.value);
                if (e.target.value[0] === '' || !e.target.value[0]) {
                  setSearchAction('FOCUS');
                } else if (e.target.value[0] === '@') {
                  setSearchAction('USER');
                } else {
                  setSearchAction('SIMPLE');
                }
              }}
              onBlur={() => {
                setFocusState('EMPTY');
                setSearchAction('EMPTY');
              }}
              _hover={{ color: 'gray.800', backgroundColor: 'gray.0' }}
              _focus={{ color: 'gray.800', backgroundColor: 'gray.0' }}
            />

            {searchAction === 'SIMPLE' || searchAction === 'USER' ? (
              <InputRightElement
                cursor="pointer"
                onMouseDown={(e) => e.preventDefault()}
                color="gray.800"
                children={<Icon as={IoClose} />}
              />
            ) : (
              <InputRightElement
                pointerEvents="none"
                color={searchAction !== 'EMPTY' ? 'gray.800' : 'currentcolor'}
                children={
                  <Text fontSize="r1" alignItems="center" pr="s12">
                    Ctrl+/
                  </Text>
                }
              />
            )}
          </InputGroup>
        </GlobalHotKeys>
      </form>

      {searchAction === 'EMPTY' ? null : (
        <Box onMouseDown={(e) => e.preventDefault()}>
          <Box
            position="absolute"
            bottom="-1"
            bg="white"
            width="100%"
            borderRadius="br2"
            p="s8"
            transform="translateY(100%)"
            boxShadow="E2"
            display="flex"
            flexDirection="column"
            gap="s8"
            maxH="400px"
          >
            {isLoading && (
              <Box>
                <Loader height={80} />
              </Box>
            )}
            {searchAction === 'FOCUS' && (
              <>
                {recentSearch && recentSearch?.length !== 0 && (
                  <Text fontSize="s3" color="gray.500" lineHeight="1.5">
                    Recent Search
                  </Text>
                )}

                <Box overflowY="auto">
                  {recentSearch && recentSearch?.length === 0 ? (
                    <NoResultFound title="No Recent Search!" />
                  ) : (
                    recentSearch.map((recent, index) => (
                      <Fragment key={recent?.link}>
                        <RecentSearchCard
                          title={recent.title}
                          onClick={async () => {
                            const response = recent.hasParams ? await getNewId({}) : null;

                            router
                              .push(
                                `${recent.link}${response ? `/${response?.newId}` : ''}` as string
                              )
                              .then(() => {
                                const currentSearch = recent;

                                if (recentSearches && recentSearches?.length !== 0) {
                                  localStorage.setItem(
                                    'recent-search',
                                    JSON.stringify([...recentSearches, currentSearch])
                                  );
                                } else {
                                  localStorage.setItem(
                                    'recent-search',
                                    JSON.stringify([currentSearch])
                                  );
                                }

                                setSearchAction('EMPTY');
                                searchBarRef?.current?.blur();
                                setInputSearch('');
                              });
                          }}
                          isSelected={focusState === index}
                        />
                      </Fragment>
                    ))
                  )}
                </Box>
              </>
            )}
            {searchAction === 'SIMPLE' && (
              <Box overflowY="auto">
                {globalSearch?.length === 0 ? (
                  <NoResultFound />
                ) : (
                  globalSearch?.map((basic, index) => (
                    <Fragment key={basic?.node?.url}>
                      <BasicSearchCard
                        subtitle="Member"
                        type={basic?.node?.iconType as string}
                        app="Core Banking System"
                        link={basic?.node?.url as string}
                        title={basic?.node?.page as string}
                        isSelected={focusState === index}
                        hasParam={basic?.node?.hasParam as boolean}
                        fullCode={basic?.node?.fullCode}
                        onClick={async () => {
                          const response = basic?.node?.hasParam ? await getNewId({}) : null;

                          router
                            .push(
                              `${basic?.node?.url}${
                                response ? `/${response?.newId}` : ''
                              }` as string
                            )
                            .then(() => {
                              const currentSearch = {
                                title: basic?.node?.page,
                                link: basic?.node?.url,
                                hasParams: basic?.node?.hasParam,
                              };

                              if (recentSearches && recentSearches?.length !== 0) {
                                localStorage.setItem(
                                  'recent-search',
                                  JSON.stringify([...recentSearches, currentSearch])
                                );
                              } else {
                                localStorage.setItem(
                                  'recent-search',
                                  JSON.stringify([currentSearch])
                                );
                              }

                              setSearchAction('EMPTY');
                              searchBarRef?.current?.blur();
                              setInputSearch('');
                            });
                        }}
                      />
                    </Fragment>
                  ))
                )}
              </Box>
            )}
            {searchAction === 'USER' && (
              <Box overflowY="auto">
                {users.map((user, index) => (
                  <Fragment key={user?.id}>
                    <UserSearchCard
                      id={user.id}
                      name={user.name}
                      app={user.app}
                      image={user.image}
                      isSelected={focusState === index}
                      link="/members/list"
                      onClick={() => router.push('/members/list')}
                    />
                  </Fragment>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

interface RecentSearchCardProps {
  title: string;
  onClick?: () => void;
  isSelected: boolean;
}

export const RecentSearchCard = ({ title, onClick, isSelected }: RecentSearchCardProps) => (
  <Box
    p="s8"
    width="100%"
    borderRadius="br2"
    display="flex"
    onMouseDown={(e) => e.preventDefault()}
    alignItems="center"
    justifyContent="space-between"
    gap="s10"
    cursor="pointer"
    onClick={onClick}
    bg={isSelected ? 'background.500' : 'white'}
    _hover={{ bg: 'background.500' }}
  >
    <Box display="flex" alignItems="center" color="gray.600" gap="s10">
      <Icon as={MdOutlineHistory} size="sm" />
      <Text fontSize="r1">{title}</Text>
    </Box>

    <Icon as={IoReturnDownBack} size="sm" color="gray.700" />
  </Box>
);

interface BasicSearchCardProps {
  title: string;
  subtitle: string;
  app: string;
  type: string;
  isSelected: boolean;
  onClick?: () => void;
  link: string;
  hasParam: boolean;
  fullCode: string | undefined | null;
}

export const BasicSearchCard = ({
  title,
  subtitle,
  onClick,
  type,
  isSelected,
  link,
  hasParam,
  fullCode,
  app,
}: BasicSearchCardProps) => {
  const { mutateAsync: getNewId } = useGetNewIdMutation();

  return (
    <Box
      p="s8"
      width="100%"
      borderRadius="br2"
      display="flex"
      onMouseDown={(e) => e.preventDefault()}
      alignItems="center"
      justifyContent="space-between"
      gap="s10"
      cursor="pointer"
      onClick={onClick}
      bg={isSelected ? 'background.500' : 'white'}
      _hover={{ bg: 'background.500' }}
      role="group"
    >
      <Box display="flex" alignItems="center" color="gray.600" gap="s16">
        <Icon as={ICONS[type]} />

        <Box display="flex" flexDir="column">
          <Text fontSize="r1" fontWeight="500">
            {title} ({fullCode})
          </Text>

          <Text fontSize="r1" color="gray.500">
            {subtitle}
          </Text>
        </Box>
      </Box>

      <Box
        px="s12"
        py="s4"
        borderRadius="32px"
        display={isSelected ? 'none' : 'block'}
        border="1px"
        borderColor="border.layout"
        _groupHover={{ display: 'none' }}
      >
        <Text fontSize="s1" color="gray.600">
          {app}
        </Text>
      </Box>

      <Box
        px="s12"
        display={isSelected ? 'flex' : 'none'}
        py="s4"
        borderRadius="32px"
        border="1px"
        borderColor="border.layout"
        bg="primary.500"
        gap="s4"
        alignItems="center"
        _groupHover={{ display: 'flex' }}
        as="button"
        onClick={async () => {
          const response = hasParam ? await getNewId({}) : null;

          window.open(`${link}${response ? `/${response?.newId}` : ''}` as string);
        }}
      >
        <Text fontSize="s2" color="white">
          Open In New Tab
        </Text>
        <Icon as={FiArrowUpRight} size="sm" color="white" />
      </Box>
    </Box>
  );
};

interface UserSearchCardProps {
  id: string;
  name: string;
  image?: string;
  app: string;
  isSelected: boolean;
  onClick?: () => void;
  link: string;
}

export const UserSearchCard = ({
  id,
  name,
  image,
  onClick,
  isSelected,
  link,
  app,
}: UserSearchCardProps) => (
  <Box
    p="s8"
    width="100%"
    borderRadius="br2"
    display="flex"
    onMouseDown={(e) => e.preventDefault()}
    alignItems="center"
    justifyContent="space-between"
    gap="s10"
    cursor="pointer"
    onClick={onClick}
    bg={isSelected ? 'background.500' : 'white'}
    _hover={{ bg: 'background.500' }}
    role="group"
  >
    <Box display="flex" alignItems="center" color="gray.600" gap="s16" p="s8">
      <Avatar w="s32" h="s32" title={name} src={image} />

      <Box display="flex" flexDir="column">
        <Text fontSize="r1" fontWeight="500">
          {name} ({id})
        </Text>

        <Text fontSize="r1" color="gray.500">
          Core Banking System / Members
        </Text>
      </Box>
    </Box>

    <Box
      px="s12"
      py="s4"
      borderRadius="32px"
      display={isSelected ? 'none' : 'block'}
      border="1px"
      borderColor="border.layout"
      _groupHover={{ display: 'none' }}
    >
      <Text fontSize="s1" color="gray.600">
        {app}
      </Text>
    </Box>

    <Box
      px="s12"
      display={isSelected ? 'flex' : 'none'}
      py="s4"
      borderRadius="32px"
      border="1px"
      borderColor="border.layout"
      bg="primary.500"
      gap="s4"
      alignItems="center"
      _groupHover={{ display: 'flex' }}
      as="button"
      onClick={() => window.open(link, '_blank')}
    >
      <Text fontSize="s2" color="white">
        Open In New Tab
      </Text>
      <Icon as={FiArrowUpRight} size="sm" color="white" />
    </Box>
  </Box>
);

interface INoResultFoundProps {
  title?: string;
  subtitle?: string;
}

export const NoResultFound = ({
  title = 'No Result Found',
  subtitle = 'Try Adjusting your search',
}: INoResultFoundProps) => (
  <Flex
    h="140px"
    alignItems="center"
    justifyContent="center"
    flexDir="column"
    gap="s4"
    fontWeight={500}
  >
    <Text fontSize="r1" color="gray.700">
      {title}
    </Text>

    <Text fontSize="s3" color="gray.500">
      {subtitle}
    </Text>
  </Flex>
);

export const BasicSearchBar = () => {
  const [inputSearch, setInputSearch] = useState('');

  const [searchAction, setSearchAction] = useState<'FOCUS' | 'SIMPLE' | 'USER' | 'EMPTY'>('EMPTY');

  return (
    <InputGroup
      width="100%"
      borderRadius="6px"
      border="none"
      flex={1}
      color="white"
      borderColor="secondary.700"
      _hover={{ color: 'gray.700' }}
    >
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={IoSearch} fontSize="lg" />}
        color={searchAction !== 'EMPTY' ? 'gray.800' : 'currentcolor'}
      />
      <Input
        type="text"
        id="search-input"
        placeholder="Search"
        autoComplete="off"
        color="white"
        fontSize="r1"
        value={inputSearch}
        border="none"
        bg="secondary.900"
        onFocus={() => {
          if (inputSearch) {
            if (inputSearch[0] === '@') {
              setSearchAction('USER');
            } else {
              setSearchAction('SIMPLE');
            }
          } else {
            setSearchAction('FOCUS');
          }
        }}
        onChange={(e) => {
          setInputSearch(e.target.value);
          if (e.target.value[0] === '' || !e.target.value[0]) {
            setSearchAction('FOCUS');
          } else if (e.target.value[0] === '@') {
            setSearchAction('USER');
          } else {
            setSearchAction('SIMPLE');
          }
        }}
        onBlur={() => {
          setSearchAction('EMPTY');
        }}
        _hover={{ color: 'gray.800', backgroundColor: 'gray.0' }}
        _focus={{ color: 'gray.800', backgroundColor: 'gray.0' }}
      />

      {searchAction === 'SIMPLE' || searchAction === 'USER' ? (
        <InputRightElement
          cursor="pointer"
          onMouseDown={(e) => e.preventDefault()}
          color="gray.800"
          children={<Icon as={IoClose} />}
        />
      ) : (
        <InputRightElement
          pointerEvents="none"
          color={searchAction !== 'EMPTY' ? 'gray.800' : 'currentcolor'}
          children={
            <Text fontSize="r1" alignItems="center" pr="s12">
              Ctrl+/
            </Text>
          }
        />
      )}
    </InputGroup>
  );
};

export default SearchBar;
