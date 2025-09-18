import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';

const PORT = 8080;

const createApp = async () => {
  dotenv.config();

  const app = express();

  // json 포맷을 해독하기 위해 사용하는 미들웨어
  app.use(express.json());

  // x-www-form-urlencoded 포맷을 해독하기 위해 사용하는 미들웨어
  app.use(express.urlencoded({ extended: false }));

  // cors 설정
  app.use(
    cors({
      credentials: true,
      exposedHeaders: ['Authorization', 'Refresh-Token'],
      origin: ['https://clip-in.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
    })
  );

  // 메인 페이지
  app.get('/', (req, res) => {
    res.send('CLIP 개발용 임시서버입니다.');
  });

  return app;
};

createApp().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
