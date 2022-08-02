import { HttpException, HttpStatus } from '@nestjs/common';

export default class NotFoundException extends HttpException {
  constructor(
    className: string,
    fieldName: string,
    uniqueField: number | string,
  ) {
    super(
      `Entity with class ${className} and ${fieldName} ${uniqueField} is not found.`,
      HttpStatus.NOT_FOUND,
    );
  }
}
