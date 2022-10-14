import { SetMetadata } from '@nestjs/common';

export const NoAccessToken = () => SetMetadata('NoAccessToken', true);
