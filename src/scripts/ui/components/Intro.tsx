import React from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { openOverlay } from 'modules/overlay';
import { selectProject } from 'modules/project/actions';

import { Grid } from 'ui/common/Grid';
import { GridRow } from 'ui/common/Grid/Row';
import { GridColumn } from 'ui/common/Grid/Column';

import { OverlayUI } from 'ui/components/Overlay';
import { LinkButton } from 'ui/common/LinkButton';
import { RecentProjectsUI } from 'ui/components/RecentProjects';

export const IntroUI: React.SFC = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <OverlayUI title={TXT.intro.title} back={false}>
            <Grid>
                <GridRow>
                    <GridColumn>
                        <LinkButton onClick={() => dispatch(openOverlay('CREATE'))}>
                            {TXT.intro.create}
                        </LinkButton>

                        <br />

                        <LinkButton onClick={() => dispatch(selectProject())}>
                            {TXT.intro.open}
                        </LinkButton>
                    </GridColumn>

                    <GridColumn align="right">
                        {TXT.menu.create.shortcut}
                        <br />
                        {TXT.menu.open.shortcut}
                    </GridColumn>
                </GridRow>
            </Grid>

            <RecentProjectsUI />
        </OverlayUI>
    );
};
