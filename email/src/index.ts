import express from 'express';
import bodyParser from 'body-parser';
var cors = require('cors');

// o consumer esta ligado aqui esperando uma mensagem

import { EmailService } from './service/email.service';
import { ConsumerCretedCustomer } from './consumers/create-customer.consumer';

async function bootstrap() {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({ origin: '*' }));

  // instancia o service sendo ele uma depedencia do consumer;
  const emailService = new EmailService();

  // ligo o consumer
  const consumerCretedCustomer = new ConsumerCretedCustomer(emailService);
  consumerCretedCustomer.createCustomerConsumer();

  app.listen(3001, () => {
    console.log(`Example app listening on port 3000`);
  });
  process.on('beforeExit', async () => {});
}

bootstrap();