import { IconType } from 'react-icons';
import { BsArrowUpRight } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AddButtonList, Box, Button, Icon, PopOverComponentForButtonList, Text } from '@myra-ui';

import { Id_Type, useGetNewIdMutation } from '@coop/cbs/data-access';
import { AclKey, Can, RouteValue } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

interface IEmptyStateProps {
  menuIcon: IconType | undefined;
  menu: string;
  // onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  forms?: {
    label: string;
    aclKey: AclKey;
    route?: RouteValue;
    idType?: Id_Type;
    onClick?: () => void;
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
      {menuIcon && <Icon as={menuIcon} size="xl" color="primary" />}
      <Text fontSize="r3" fontWeight="medium">
        No &apos;{menu}&apos; Data
      </Text>
      <Text fontSize="s3" color="gray.500">
        Create New &apos;{menu}&apos;. Or learn more with Myra tutorial resources.
      </Text>
      <Box display="flex" gap="s40" alignItems="center">
        {forms && forms?.length === 1 ? (
          <Can I="CREATE" a={forms[0].aclKey} key={forms[0]?.label}>
            <Button
              onClick={() => {
                if (forms[0].onClick) {
                  forms[0].onClick();
                } else if (forms[0].idType) {
                  mutateAsync({ idType: forms[0]?.idType ?? null }).then((res) =>
                    router.push(`${forms[0].route}/${res?.newId}`)
                  );
                } else {
                  router.push(forms[0].route as string);
                }
              }}
            >
              {t[forms[0].label] || forms[0]?.label}
            </Button>
          </Can>
        ) : (
          <Box>
            <PopOverComponentForButtonList buttonLabel={`New ${menu}`}>
              {forms?.map((item) => (
                <Can I="CREATE" a={item.aclKey} key={item?.label}>
                  <AddButtonList
                    label={t[item.label] || item?.label}
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                      } else if (item.idType) {
                        mutateAsync({ idType: item?.idType ?? null }).then((res) =>
                          router.push(`${item.route}/${res?.newId}`)
                        );
                      } else {
                        router.push(item.route as string);
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
