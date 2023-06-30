import { Book } from "./books";

export interface Category {
    id: number;
    createdAt: number;
    updatedAt: number;
    priority: number;
    thumbnail: string;
    isDeleted: boolean;
    name: string;
    level: number;
    isHighlight: boolean;
    isShowInApp: boolean;
    refCommissionPercent: number; //Phần trăm hoa hồng khi giói thiệu sản phẩm đc lên đơn (F1)
    childRefCommissionPercent: number; //Phần trăm hoa hồng khi giói thiệu sản phẩm đc lên đơn (F2)
    books: Book[];
    parent1: Category;
    children1: Category[];
    parent2: Category;
    children2: Category[];
    parent3: Category;
    children3: Category[];
    parent4: Category;
    children4: Category[];
    parent5: Category;
    children5: Category[];
    parent6: Category;
    children6: Category[];
    parent7: Category;
    children7: Category[];
    parent8: Category;
    children8: Category[];
    root: Category;
    child: Category[];
}
