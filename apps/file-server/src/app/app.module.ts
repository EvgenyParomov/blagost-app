import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { FileEntity } from './entities/file.entity';
import { RelationEntity } from './entities/relation.entity';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ClearService } from './clear.service';
import { FileService } from './file.service';
import { RelationService } from './relation.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    MulterModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        dest: configService.get('FILES_ROOT'),
        storage: diskStorage({
          destination: configService.get('FILES_ROOT'),
          filename: (_, file, callback) => {
            console.log(file, configService.get('FILES_ROOT'));
            const name = file.originalname.split('.')[0];
            const fileExtName = extname(file.originalname);
            callback(null, `${name}-${uuid()}${fileExtName}`);
          },
        }),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_FILES_HOST'),
          password: configService.get('DB_FILES_PASSWORD'),
          database: configService.get('DB_FILES_DATABASE'),
          port: configService.get('DB_FILES_PORT'),
          username: configService.get('DB_FILES_USERNAME'),
          entities: [FileEntity, RelationEntity],
          synchronize: true,
          autoLoadEntities: true,
          ssl: configService.get('DB_FILES_SSL')
            ? {
                rejectUnauthorized: false,
              }
            : false,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([FileEntity, RelationEntity]),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [ClearService, FileService, RelationService],
})
export class AppModule {
  async onModuleInit() {}
}
