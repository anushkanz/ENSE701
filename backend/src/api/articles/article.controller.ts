import {
    Body,
    Controller,Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { error } from 'console';
import * as jose from "jose";  // Import JOSE for JWT handling
import * as dotenv from 'dotenv';  // Import dotenv for environment variables
dotenv.config();  // Load environment variables

@Controller('api/articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}
    @Get('/test')
    test() {
        return this.articleService.test();
    }
    // Get all articles
    @Get('/')
    async findAll() {
        //const token = this.header('Authorization');
        try {
            return this.articleService.findAll();
        } catch {
            throw new HttpException(
        {
            status: HttpStatus.NOT_FOUND,
            error: 'No Articles found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
        );
        }
    }
    header(arg0: string) {
        throw new Error('Method not implemented.');
    }

    @Post('/search')
    async search(@Body() title : string) {
        try {
            return this.articleService.search(title);
        } catch {
            throw new HttpException(
            {
                status: HttpStatus.NOT_FOUND,
                error: 'No Article found',
            },
        HttpStatus.NOT_FOUND,
        { cause: error },
        );
        }
    }
    
    // Get one article via id
    @Get('/:id')
    async findOne(@Param('id') id: string) {
        try {
            return this.articleService.findOne(id);
        } catch {
            throw new HttpException(
            {
                status: HttpStatus.NOT_FOUND,
                error: 'No Article found',
            },
        HttpStatus.NOT_FOUND,
        { cause: error },
        );
        }
    }// Create/add a Article
    @Post('/')
    async addArticle(@Body() createArticleDto: CreateArticleDto) {
        try {
            await this.articleService.create(createArticleDto);
            return { message: 'Article added successfully' };
        } catch {
            throw new HttpException(
            {
                status: HttpStatus.BAD_REQUEST,
                error: 'Unable to add this article',
            },
        HttpStatus.BAD_REQUEST,
        { cause: error },
        );
        }
    }
    // Update a Article Status
    @Put('/status/:id')
    async updateArticleStatus(
        @Param('id') id: string,
        @Body() createArticleDto: CreateArticleDto,
        ) {
        try {
            await this.articleService.updateStatus(id, createArticleDto);
            return { message: 'Article updated successfully' };
        } catch {
            throw new HttpException(
            {
                status: HttpStatus.BAD_REQUEST,
                error: 'Unable to update this Article',
            },
            HttpStatus.BAD_REQUEST,
            { cause: error },
            );
        }
    }

    // Update a Article
    @Put('/:id')
    async updateArticle(
        @Param('id') id: string,
        @Body() createArticleDto: CreateArticleDto,
        ) {
        try {
            await this.articleService.update(id, createArticleDto);
            return { message: 'Article updated successfully' };
        } catch {
            throw new HttpException(
            {
                status: HttpStatus.BAD_REQUEST,
                error: 'Unable to update this Article',
            },
            HttpStatus.BAD_REQUEST,
            { cause: error },
            );
        }
    }
    // Delete a Article via id
    @Delete('/:id')
    async deleteArticle(@Param('id') id: string) {
        try {
            return await await this.articleService.delete(id);
        } catch {
            throw new HttpException(
        {
            status: HttpStatus.NOT_FOUND,
            error: 'No such a Article',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
        );
        }
    }
}