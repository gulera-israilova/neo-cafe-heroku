import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from './modules/image/image.module';
import { AuthModule } from './modules/auth/auth.module';
import { BranchModule } from './modules/branch/branch.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ImageModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: 'postgres://bcbpxfmjcnrkdu:24a52b604ff3f02eb2f4bcb2293d7978cf1456187aae4b9cf108e1172a76618e@ec2-52-1-92-133.compute-1.amazonaws.com:5432/d6qq44un1gpbgu',
        // host: configService.get('DB_HOST'),
        // port: +configService.get('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_NAME'),
        // ssl: {
        //   rejectUnauthorized: false,
        // },
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        extra: {
          ssl: {
              rejectUnauthorized: false
          }
      },
      }),
      inject: [ConfigService],
    }),
    BranchModule,
  ],
  controllers: [],
})
export class AppModule {}
