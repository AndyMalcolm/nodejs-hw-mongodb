import path from 'node:path';

export const ENV_VARS = {
    PORT: "PORT"
};

export const SORT_ORDER = {
    ASC: "asc",
    DESC: "desc",
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
    SMTP_HOST: "SMTP_HOST",
    SMTP_PORT: "SMTP_PORT",
    SMTP_USER: "SMTP_USER",
    SMTP_PASSWORD: "SMTP_PASSWORD",
    SMTP_FROM: "SMTP_FROM",
    JWT_SECRET: "JWT_SECRET",
    APP_DOMAIN: "APP_DOMAIN",
};

export const TEMPLATES_DIR = path.join(process.cwd(), "src", "templates");

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), "temp");
export const UPLOAD_DIR = path.join(process.cwd(), "uploads");


export const CLOUDINARY = {
    CLOUD_NAME: "CLOUD_NAME",
    API_KEY: "API_KEY",
    API_SECRET: "API_SECRET",
    ENABLE_CLOUDINARY: "ENABLE_CLOUDINARY",
};

export const SWAGGER_PATH = path.join(process.cwd(), "docs", "swagger.json");

// вроде все нпм установил и на сайтах зарегался(проверить)

// осталось понять, где файлы в папку сваггер скачать, а так код есть и всё в докс тоже есть
// ещё почитать конспект по сваггеру и всё сделать, а если не, то у ментора спросить, что с папкой, чем заполнять

// "scripts": {
//     "build": "npm run build-docs",
// "build-docs": "redocly bundle --ext json -o docs/swagger.json",
// "preview-docs": "redocly preview-docs",
// } вот это в пакедж.джсон добавил уже

// redocly.yaml где создать?
// папку uploads удалил, но она опять появляется, это почему? папка темп нужна? 

// swagger добавил, правильный? если не, то заново все создам