type OnClick = () => void;
type OnPage = (page: number) => void;

interface PagingButton {
    readonly active: boolean;
    readonly onClick: OnClick;
}

interface PagingPage {
    readonly value: number;
    readonly onClick: OnClick | null;
}

interface Paging {
    readonly first: PagingButton;
    readonly prev: PagingButton;
    readonly next: PagingButton;
    readonly last: PagingButton;
    readonly pages: PagingPage[];
}

export const createPaging = (page: number, count: number, perPage: number, maxPages: number, onPage: OnPage): Paging => {
    const lastPage = Math.ceil(count / perPage) - 1;

    let from = Math.max(0, page - Math.ceil(maxPages / 2));
    const to = Math.min(lastPage + 1, from + maxPages);

    if (lastPage + 1 === to) {
        from = Math.max(0, to - maxPages);
    }
    const pages = Array(to - from).fill(0).map((_, i) => from + i);

    return {
        first: {
            active: page > 0,
            onClick: () => onPage(0)
        },
        prev: {
            active: page > 0,
            onClick: () => onPage(page - 1)
        },
        next: {
            active: page < lastPage,
            onClick: () => onPage(page + 1)
        },
        last: {
            active: page < lastPage,
            onClick: () => onPage(lastPage)
        },
        pages: pages.map(p => ({
            value: p + 1,
            onClick: (p === page ? null : () => onPage(p))
        }))
    };
};
