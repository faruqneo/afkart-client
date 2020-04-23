
export interface Product {
    id?: string;
    title: string;
    vendor: string;
    category: string;
    price: string;
    description: string;
    tags: Array<string>;
    files: Array<object>;
}