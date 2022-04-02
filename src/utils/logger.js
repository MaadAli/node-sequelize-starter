import winston from 'winston';

const myLevels = {
    error: 0,
    info: 3,
    morgan: 2,
    warn: 1
}

const logger = winston.createLogger({
    format: winston.format.json(),
    levels: myLevels,
    transports: [
        new winston.transports.File({filename: './logs/combined.log'}),
        new winston.transports.File({filename: './logs/error.log', level: 'error'})
    ]
});

export default logger;