import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Key } from 'data/keys';
import { TXT } from 'data/texts';

import { bindKey } from 'modules/keymap';
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

    // close overlay when ESC pressed
    useEffect(() => {
        if (!back) {
            return;
        }
        const close = (e: KeyboardEvent): void => {
            bindKey(e, '-', '-', Key.ESC, () => dispatch(closeOverlay()));
        };
        document.addEventListener('keydown', close);

        return () => {
            document.removeEventListener('keydown', close);
        };
    });

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
