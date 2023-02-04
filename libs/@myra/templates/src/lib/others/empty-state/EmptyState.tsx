import { IconType } from 'react-icons';
import { BsArrowUpRight } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AddButtonList, Box, Icon, PopOverComponentForButtonList, Text } from '@myra-ui';

import { Id_Type, useGetNewIdMutation } from '@coop/cbs/data-access';
import { AclKey, Can, RouteValue } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

interface IEmptyStateProps {
  menuIcon: IconType;
  menu: string;
  // onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  forms?: {
    label: string;
    aclKey: AclKey;
    route: RouteValue;
    idType?: Id_Type;
  }[];
  docLink?: string;
}

export const EmptyState = (props: IEmptyStateProps) => {
  const { menuIcon, menu, docLink, forms } = props;
  const { mutateAsync } = useGetNewIdMutation();
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box p="s24" display="flex" flexDir="column" w={480} h={208} gap="s16" boxShadow="md">
      <Icon as={menuIcon} size="xl" color="primary" />
      <Text fontSize="r3" fontWeight="medium">
        No &apos;{menu}&apos; Data
      </Text>
      <Text fontSize="s3" color="gray.500">
        Create New &apos;{menu}&apos;. Or learn more with Myra tutorial resources.
      </Text>
      <Box display="flex" gap="s40" alignItems="center">
        {/* <Button onClick={onClick}>New {type}</Button> */}
        {forms && (
          <Box>
            <PopOverComponentForButtonList buttonLabel={`New ${menu}`}>
              {forms?.map((item) => (
                <Can I="CREATE" a={item.aclKey} key={item?.label}>
                  <AddButtonList
                    label={t[item.label] || item?.label}
                    onClick={() => {
                      if (item.idType) {
                        mutateAsync({ idType: item?.idType ?? null }).then((res) =>
                          router.push(`${item.route}/${res?.newId}`)
                        );
                      } else {
                        router.push(item.route);
                      }
                    }}
                  />
                </Can>
              ))}
            </PopOverComponentForButtonList>
          </Box>
        )}
        {docLink && (
          <Link href={docLink} target="_blank">
            <Box display="flex" gap="s12" cursor="pointer">
              <Text fontSize="r1" color="primary" fontWeight="medium">
                Learn more in Docs
              </Text>
              <Icon as={BsArrowUpRight} />
            </Box>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default EmptyState;
