import React from 'react';
import cn from 'classnames';

interface Props {
    readonly align?: 'left' | 'center' | 'right';
}

export const GridColumn: React.SFC<Props> = ({ align = 'left', children }) => (
    <div
        className={cn('Grid-row-column', {
            'Grid-row-column--right': ('right' === align),
            'Grid-row-column--center': ('center' === align)
        })}
    >
        {children}
    </div>
);
