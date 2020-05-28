import React from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { Logger } from 'modules/logger';
import { AppDispatch } from 'modules/store';
import { openOverlay } from 'modules/overlay';

import { List } from 'ui/common/List';
import { OverlayUI } from 'ui/components/Overlay';
import { LinkButton } from 'ui/common/LinkButton';
import { RecentProjectsUI } from 'ui/components/RecentProjects';

const open = (): void => Logger.log('OPEN');

export const IntroUI: React.SFC = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <OverlayUI title={TXT.intro.title} back={false}>
            <List>
                <LinkButton onClick={() => openOverlay(dispatch, 'CREATE')}>
                    {TXT.intro.create}
                </LinkButton>

                <LinkButton onClick={open}>{TXT.intro.open}</LinkButton>
            </List>

            <RecentProjectsUI />
        </OverlayUI>
    );
};
