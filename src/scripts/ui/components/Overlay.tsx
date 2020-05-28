import React from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { closeOverlay } from 'modules/overlay';

import { Button } from 'ui/common/Button';
import { Heading } from 'ui/common/Heading';

interface Props {
    readonly title: string;
    readonly back?: boolean;
}

export const OverlayUI: React.SFC<Props> = ({ title, back = true, children }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className="Overlay">
            <Heading size="large" text={title} />

            {children}

            {back && (
                <Button
                    text={TXT.overlay.back}
                    onClick={() => closeOverlay(dispatch)}
                />
            )}
        </div>
    );
};
