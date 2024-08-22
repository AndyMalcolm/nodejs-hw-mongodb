import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/contacts.js';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};



// ещё это надо поменять с верхним кодом, но ошибка возникает, а так вроде всё хорошо
// import express from 'express';
// import pino from 'pino-http';
// import cors from 'cors';
// import { env } from './utils/env.js';
// import { ENV_VARS } from './constants/constants.js';
// import { notFoundHandler } from './middleware/notFoundHandler.js';
// import { errorHandler } from './middleware/errorHandler.js';
// import router from './routers/index.js';
// import cookieParser from 'cookie-parser';

// export const setupServer = () => {
//   const app = express();

//   app.use(
//     pino({
//       transport: {
//         target: 'pino-pretty',
//       },
//     }),
//   );

//   app.use(cors());

//   app.use(cookieParser());

//   app.use(
//     express.json({
//       type: ['application/json', 'application/vnd.api+json'],
//       limit: '1mb',
//     }),
//   );

//   app.use(router);

//   app.use(notFoundHandler);

//   app.use(errorHandler);

//   const PORT = env(ENV_VARS.PORT, 3000);
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };
