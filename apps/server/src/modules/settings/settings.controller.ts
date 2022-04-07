import { Dto } from '@blagost/api';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('settings')
export class SettingsController {
  constructor(private configService: ConfigService) {}

  @Get()
  getMobileSettings(): Dto.MobileSettings {
    return {
      FILES_BASE_URL: this.configService.get('FILE_STORAGE_BASE_URL'),
    };
  }
}
