import { number } from "zod"
export type Paging = {
    size: number;
    total_page: number;
    current_page: number;
    total_rows : number;
}

export type Pageable<T>={
    data: Array<T>;
    paging : Paging
}