import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as vamNames from 'src/shared/constants/constants.name-variables'
import * as paths from 'src/shared/constants/constants.paths'
import * as messages from 'src/shared/constants/constants.messages'
import * as cookieParser from 'cookie-parser';
import * as os from 'os';

const prefixRoute = 'api/v1'
const debugLogger = 'debug'
const errorLogger = 'error'
const logLogger = 'log'
const verboseLogger = 'verbose'
const warnLogger = 'warn'
const contestLogger = 'Bootstrap'
const swaggerRoute = '/api'
const documentBuilderVersion = '1.0'
const documentBuildertag = 'whiff-waff'

async function bootstrap() {
	const env: ConfigService = new ConfigService();
	const logger = new Logger(contestLogger);
	let port = env.get(vamNames.PORT);
	try {
		const app = await NestFactory.create(AppModule, {
			cors: true, logger: [debugLogger, errorLogger,
				logLogger, verboseLogger, warnLogger]
		});
		app.setGlobalPrefix(prefixRoute);
		app.use(cookieParser());
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
		app.enableCors();
		const config = new DocumentBuilder().setTitle(messages.TITLE_DOCS).setDescription(messages.DESCRITPION_DOCS).setVersion(documentBuilderVersion).addTag(documentBuildertag).addBearerAuth().build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup(swaggerRoute, app, document, {
			swaggerOptions: {
				url: `${paths.PROTOCOL}${os.hostname}${paths.SEPARATOR}${port}`
			},
		});
		await app.listen(port);
	} catch (error) {

	}

}

bootstrap();
