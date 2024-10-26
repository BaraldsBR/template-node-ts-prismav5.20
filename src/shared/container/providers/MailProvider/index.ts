import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';
import MailjetMailProvider from './implementations/MailjetMailProvider';

const providers = {
  mailjet: container.resolve(MailjetMailProvider),
};

container.registerInstance<IMailProvider>('MailProvider', providers[mailConfig.driver]);
