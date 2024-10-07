import { HydratedDocument } from 'mongoose';
export type ArticleDocument = HydratedDocument<Article>;
export declare class Article {
    title: string;
    authors: string;
    source: string;
    publication_year: string;
    doi: string;
    summary: string;
    linked_discussion: string;
    status: string;
}
export declare const ArticleSchema: import("mongoose").Schema<Article, import("mongoose").Model<Article, any, any, any, import("mongoose").Document<unknown, any, Article> & Article & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Article, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Article>> & import("mongoose").FlatRecord<Article> & {
    _id: import("mongoose").Types.ObjectId;
}>;
