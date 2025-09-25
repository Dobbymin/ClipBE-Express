import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ClipBE-Express',
      description: 'CLIP 개발용 서버',
      version: 'v2.0.0',
    },
    servers: [
      {
        url: 'https://clip-be-express.vercel.app/',
        description: 'Develop Server',
      },
      {
        url: 'http://localhost:8081/',
        description: 'Local Server',
      },
    ],
    components: {
      schemas: {
        BaseResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'string' },
            serverDateTime: { type: 'string', example: 'string' },
            errorCode: { type: 'string', nullable: true, example: 'string' },
            errorMessage: { type: 'string', nullable: true, example: 'string' },
          },
        },
        FailResponse: {
          allOf: [
            { $ref: '#/components/schemas/BaseResponse' },
            {
              type: 'object',
              properties: {
                status: { type: 'string', example: 'FAIL' },
                data: { type: 'object', nullable: true, example: null },
              },
            },
          ],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./swagger/*.swagger.js'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  const swaggerUiOptions = {
    deepLinking: true,
    displayOperationId: false,
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 1,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
  };

  app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(specs, { swaggerOptions: swaggerUiOptions }));

  // JSON 명세 보기용
  app.get('/swagger.json', (_, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  // Redirect /swagger-ui to the Swagger UI
  app.get('/swagger', (_, res) => {
    res.redirect('/swagger-ui/');
  });
};
