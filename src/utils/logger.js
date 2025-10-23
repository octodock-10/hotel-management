import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { format } from 'util';

const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const DEFAULT_LEVEL = 'info';
const envLevel = process.env.LOG_LEVEL?.toLowerCase();
let currentLevel = LOG_LEVELS[envLevel] !== undefined ? envLevel : DEFAULT_LEVEL;

const LOG_TO_FILE = process.env.LOG_TO_FILE === 'true';
let fileStream = null;
if (LOG_TO_FILE) {
  const logDir = join(process.cwd(), 'logs');
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true });
  }
  const logPath = join(logDir, `${new Date().toISOString().split('T')[0]}.log`);
  fileStream = createWriteStream(logPath, { flags: 'a' });
}

function formatMessage(level, args) {
  const timestamp = new Date().toISOString();
  const msg = format(...args);
  return `${timestamp} [${level.toUpperCase()}] ${msg}`;
}

function write(level, ...args) {
  if (LOG_LEVELS[level] > LOG_LEVELS[currentLevel]) return;
  const line = formatMessage(level, args);
  switch (level) {
    case 'error':
      console.error(line);
      break;
    case 'warn':
      console.warn(line);
      break;
    case 'info':
      console.info(line);
      break;
    case 'debug':
      console.debug(line);
      break;
    default:
      console.log(line);
  }
  if (fileStream) {
    fileStream.write(line + '\n');
  }
}

export const logger = {
  error: (...args) => write('error', ...args),
  warn: (...args) => write('warn', ...args),
  info: (...args) => write('info', ...args),
  debug: (...args) => write('debug', ...args),
  setLevel: (level) => {
    if (LOG_LEVELS[level] !== undefined) {
      currentLevel = level;
    }
  },
};