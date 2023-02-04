import type { NavType } from '../NAV';
import { ROUTES } from '../ROUTES';

export const ALTERNATIVE_CHANNELS: NavType = {
  label: 'Alternative Channels',
  menus: {
    USERS: {
      aclKey: 'ALTERNATIVE_CHANNELS_USERS',
      label: 'Users',
      forms: [
        {
          label: 'acActivateMBanking',
          route: ROUTES.ALTERNATIVE_CHANNELS_MBANKING_REG,
          aclKey: 'ALTERNATIVE_CHANNELS_MOBILE_BANKING_REGISTRATION',
        },
        {
          label: 'acActivateEBanking',
          route: ROUTES.ALTERNATIVE_CHANNELS_EBANKING_REG,
          aclKey: 'ALTERNATIVE_CHANNELS_E_BANKING_REGISTRATION',
        },
        {
          label: 'acActivateSMSBanking',
          route: ROUTES.ALTERNATIVE_CHANNELS_SMS_BANKING_REG,
          aclKey: 'ALTERNATIVE_CHANNELS_SMS_REGISTRATION',
        },
      ],
      pages: [
        {
          label: 'acMBanking',
          aclKey: 'ALTERNATIVE_CHANNELS_MOBILE_BANKING_REGISTRATION',
          route: ROUTES.ALTERNATIVE_CHANNELS_MBANKING_REG_LIST,
          addRoute: ROUTES.ALTERNATIVE_CHANNELS_MBANKING_REG,
        },
        {
          label: 'acEBanking',
          aclKey: 'ALTERNATIVE_CHANNELS_E_BANKING_REGISTRATION',
          route: ROUTES.ALTERNATIVE_CHANNELS_EBANKING_REG_LIST,
          addRoute: ROUTES.ALTERNATIVE_CHANNELS_EBANKING_REG,
        },
        {
          label: 'acSMSBanking',
          aclKey: 'ALTERNATIVE_CHANNELS_SMS_REGISTRATION',
          route: ROUTES.ALTERNATIVE_CHANNELS_SMS_BANKING_REG_LIST,
          addRoute: ROUTES.ALTERNATIVE_CHANNELS_SMS_BANKING_REG,
        },
      ],
    },
    DOWNLOADS: {
      aclKey: 'ALTERNATIVE_CHANNELS_DOWNLOADS',
      label: 'Users',
      pages: [
        {
          label: 'acDownloadsForms',
          route: ROUTES.ALTERNATIVE_CHANNELS_DOWNLOADS_FORMS,
          aclKey: 'ALTERNATIVE_CHANNELS_DOWNLOADS',
        },
        {
          label: 'acDownloadsGuidelines',
          route: ROUTES.ALTERNATIVE_CHANNELS_DOWNLOADS_GUIDELINES,
          aclKey: 'ALTERNATIVE_CHANNELS_DOWNLOADS',
        },
        {
          label: 'acDownloadsReports',
          route: ROUTES.ALTERNATIVE_CHANNELS_DOWNLOADS_REPORTS,
          aclKey: 'ALTERNATIVE_CHANNELS_DOWNLOADS',
        },
        {
          label: 'acDwnloadsDirectives',
          route: ROUTES.ALTERNATIVE_CHANNELS_DOWNLOADS_DIRECTIVES,
          aclKey: 'ALTERNATIVE_CHANNELS_DOWNLOADS',
        },
      ],
    },
  },
};
