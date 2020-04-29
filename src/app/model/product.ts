
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

// export class Category {
//     private id: number;
//     private title: string;
  
//     get id(): number {
//       return this.id;
//     }
  
//     set id(value: number) {
//       this.id = value;
//     }
  
//     get title(): string {
//       return this.title;
//     }
  
//     set title(value: string) {
//       this.title = value;
//     }
//   }