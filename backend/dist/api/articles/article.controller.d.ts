import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    test(): string;
    findAll(): Promise<import("./article.schema").Article[]>;
    header(arg0: string): void;
    search(title: string): Promise<import("./article.schema").Article[]>;
    findOne(id: string): Promise<import("./article.schema").Article>;
    addArticle(createArticleDto: CreateArticleDto): Promise<{
        message: string;
    }>;
    updateArticleStatus(id: string, createArticleDto: CreateArticleDto): Promise<{
        message: string;
    }>;
    updateArticle(id: string, createArticleDto: CreateArticleDto): Promise<{
        message: string;
    }>;
    deleteArticle(id: string): Promise<import("mongoose").Document<unknown, {}, import("./article.schema").Article> & import("./article.schema").Article & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
