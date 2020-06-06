import React from 'react';

import { TXT } from 'data/texts';

import { createPaging } from 'modules/paging';
import { PagingLink } from 'ui/common/Paging/PagingLink';

type OnPage = (page: number) => void;

interface Props {
    readonly page: number;
    readonly count: number;
    readonly perPage: number;
    readonly maxPages: number;
    readonly onPage: OnPage;
}

export const PagingUI: React.SFC<Props> = ({ page, count, perPage, maxPages, onPage }) => {
    const paging = createPaging(page, count, perPage, maxPages, onPage);
    return (
        <ul className="Paging">
            <li className="Paging-item">
                <PagingLink
                    text="≪"
                    title={TXT.paging.first}
                    active={paging.first.active}
                    onClick={paging.first.onClick}
                />
            </li>

            <li className="Paging-item">
                <PagingLink
                    text="❮"
                    title={TXT.paging.prev}
                    active={paging.prev.active}
                    onClick={paging.prev.onClick}
                />
            </li>

            <li className="Paging-item">
                <div className="Paging-pages">
                    {paging.pages.map(p => (
                        <div className="Paging-pages-item" key={p.value}>
                            {p.onClick
                                ? <PagingLink text={p.value} onClick={p.onClick} />
                                : (
                                    <div className="Paging-active">
                                        {p.value}
                                    </div>
                                )
                            }
                        </div>
                    ))}
                </div>
            </li>

            <li className="Paging-item">
                <PagingLink
                    text="❯"
                    title={TXT.paging.next}
                    active={paging.next.active}
                    onClick={paging.next.onClick}
                />
            </li>

            <li className="Paging-item">
                <PagingLink
                    text="≫"
                    title={TXT.paging.last}
                    active={paging.last.active}
                    onClick={paging.last.onClick}
                />
            </li>
        </ul>
    );
};
