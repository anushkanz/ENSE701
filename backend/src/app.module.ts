import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './api/books/book.module';
import { ArticleModule } from './api/articles/article.module';
import { UserModule } from './api/users/user.module';
import * as dotenv from 'dotenv';
// remember to replace the <username> and <password> with your credentials
dotenv.config();
const MONGOOSE_USERNAME = process.env.MONGOOSE_USERNAME;
const MONGOOSE_PASSWORD = process.env.MONGOOSE_PASSWORD;
const MONGOOSE_CLUSTER = process.env.MONGOOSE_CLUSTER;
const MONGOOSE_DB = process.env.MONGOOSE_DB;

const DB_URI =`mongodb+srv://${MONGOOSE_USERNAME}:${MONGOOSE_PASSWORD}@${MONGOOSE_CLUSTER}/${MONGOOSE_DB}?retryWrites=true&w=majority&appName=ENSE701Cluster`;

@Module({
  imports: [
    MongooseModule.forRoot(DB_URI),
    BookModule,
    ArticleModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
