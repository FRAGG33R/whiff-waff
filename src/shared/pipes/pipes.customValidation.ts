import { ArgumentMetadata, HttpException, HttpStatus, PipeTransform, ValidationPipe } from '@nestjs/common'

export class CustomValidationPipe implements PipeTransform<any> {
	public transform(value: any, metadata: ArgumentMetadata) {
		const validationPipe = new ValidationPipe({
			whitelist: true,
			exceptionFactory: (errors) => {
				const message = Object.values(errors[0].constraints)[0];
				return new HttpException({ error: 'Bad Request', message }, HttpStatus.BAD_REQUEST);
			},
		});

		return validationPipe.transform(value, metadata);
	}
}