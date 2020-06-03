import React from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { closeOverlay } from 'modules/overlay';

import { Button } from 'ui/common/Button';
import { Heading } from 'ui/common/Heading';
import { ButtonList } from 'ui/common/ButtonList';

type OnClick = () => void;

interface Props {
    readonly title: string;
    readonly back?: boolean;
    readonly buttons?: React.ReactNode[];
}

const getBackButton = (onClick: OnClick): React.ReactNode => (
    <Button
        text={TXT.overlay.back}
        onClick={onClick}
    />
);

export const OverlayUI: React.SFC<Props> = ({ title, back = true, buttons = [], children }) => {
    const dispatch = useDispatch<AppDispatch>();

    if (back) {
        const backButton = getBackButton(() => dispatch(closeOverlay()));
        buttons.unshift(backButton);
    }
    return (
        <div className="Overlay">
            <Heading size="large" text={title} />

            {children}

            <ButtonList type="stretched">
                {buttons.map((btn, i) => (
                    <React.Fragment key={i}>
                        {btn}
                    </React.Fragment>
                ))}
            </ButtonList>
        </div>
    );
};
