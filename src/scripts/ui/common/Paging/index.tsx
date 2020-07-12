import React from 'react';

import { TXT } from 'data/texts';

import { Paging } from 'modules/paging';
import { PagingLink } from 'ui/common/Paging/PagingLink';

interface Props {
    readonly paging: Paging;
}

export const PagingUI: React.SFC<Props> = ({ paging }) => (
    <ul className="Paging">
        <li className="Paging-item" />

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

        <li className="Paging-item">
            {!!paging.onAddPage && (
                <PagingLink
                    text="✚"
                    title={TXT.paging.addPage}
                    active={!!paging.canAddPage}
                    onClick={paging.onAddPage}
                />
            )}
        </li>
    </ul>
);
