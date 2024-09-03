export interface DocumentResult<T> {
	_doc: T;
}

export type PageList<T> = {
	list: T[];
	currentPage: number;
	totalPage: number;
};
