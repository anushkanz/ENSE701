import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;
    @Schema()
    export class Article {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    authors: string;
    @Prop({ required: true })
    source: string;
    @Prop()
    publication_year: string;
    @Prop({ required: true })
    doi: string;
    @Prop()
    summary: string;
    @Prop({ required: true })
    linked_discussion: string;
    @Prop({ required: true })
    status: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);