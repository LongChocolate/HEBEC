import { BookType } from "@/utils/enum"

export interface Book {
    id: number 
    createdAt: number 
    updatedAt: number 
    thumbnail: string 
    isOutOfStock: boolean 
    isDeleted: boolean 
    page: number 
    size: string 
    publishDate: string 
    finalPrice: number 
    originPrice: number 
    description: string 
    name: string 
    isHighlight: boolean //Nổi bật bth 
    isHighlightRef: boolean //Nổi bật cho bán hàng 
    authorName: string 
    type: BookType 
    isRemoved: boolean 
    code: string 
    kvId: number // Kiot viet id 
    attribute1: string 
    attribute2: string 
    refCommissionPercent: number //Phần trăm hoa hồng khi giói thiệu sản phẩm đc lên đơn (F1) 
    childRefCommissionPercent: number //Phần trăm hoa hồng khi giói thiệu sản phẩm đc lên đơn (F2)
  
    }
    