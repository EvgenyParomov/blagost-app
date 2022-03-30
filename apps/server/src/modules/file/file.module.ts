import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileService } from './file.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const baseURL = configService.get('FILE_SERVER_BASE_URL');
        console.log(baseURL);
        return {
          baseURL,
          timeout: 5000,
          maxRedirects: 5,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
