export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images?: string;
}

export type ProductAddData = {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images?: string[]
};

export interface ProductQueryParams {
    offset: number;
    limit: number;
    title?: string;
}
