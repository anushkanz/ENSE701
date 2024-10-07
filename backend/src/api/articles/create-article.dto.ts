import { Date } from 'mongoose';

export class CreateArticleDto {
    title: string;
    authors: string;
    source: string;
    publication_year: string;
    doi: string;
    summary: string;
    linked_discussion: string;
    status: string;
}