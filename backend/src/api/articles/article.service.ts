import { Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';

@Injectable()
export class ArticleService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}
    test(): string {
        return 'article route testing';
    }
    async findAll(): Promise<Article[]> {
        return await this.articleModel.find().exec();
    }

    async findOne(id: string): Promise<Article> {
        return await this.articleModel.findById(id).exec();
    }

    async create(createArticleDto: CreateArticleDto) {
        return await this.articleModel.create(createArticleDto);
    }
    async update(id: string, createArticleDto: CreateArticleDto) {
        return await this.articleModel.findByIdAndUpdate(id, createArticleDto).exec();
    }
    async delete(id: string) {
        const deletedArticle = await this.articleModel.findByIdAndDelete(id).exec();
        return deletedArticle;
    }

    async search(title: string){
        return title;
        return await this.articleModel.find({ "title": { $regex: /title/i } }).exec();
    }

    async updateStatus(id: string,createArticleDto: CreateArticleDto) {
        const article = await this.articleModel.findOne({ _id: id}).exec();
        if (article?._id) {
            const newStatus = 0;
            if(article?.status === '0' ){
                const newStatus = 1;
            }     
            let data = {
                ...createArticleDto,
                status: newStatus
            };
            return await this.articleModel.findByIdAndUpdate(id, data).exec();
        }
    }
}