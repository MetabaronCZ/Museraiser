import React from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { openOverlay } from 'modules/overlay';
import { selectProject } from 'modules/project';

import { List } from 'ui/common/List';
import { OverlayUI } from 'ui/components/Overlay';
import { LinkButton } from 'ui/common/LinkButton';
import { RecentProjectsUI } from 'ui/components/RecentProjects';

export const IntroUI: React.SFC = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <OverlayUI title={TXT.intro.title} back={false}>
            <List>
                <LinkButton onClick={() => dispatch(openOverlay('CREATE'))}>
                    {TXT.intro.create}
                </LinkButton>

                <LinkButton onClick={() => dispatch(selectProject())}>
                    {TXT.intro.open}
                </LinkButton>
            </List>

            <RecentProjectsUI />
        </OverlayUI>
    );
};
