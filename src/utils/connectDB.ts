import mongoose from 'mongoose'
import config from '../config/environment'
import { logger } from './logger'

mongoose.set('strictQuery', false)

mongoose
  .connect(`${config.db}`)
  .then(() => {
    logger.info('Connected to mongodb')
  })
  .catch((error) => {
    logger.info('Could not connect')
    logger.info(error)
    process.exit(1)
  })
