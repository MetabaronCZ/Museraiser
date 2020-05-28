import React from 'react';

import { TXT } from 'data/texts';
import { Logger } from 'modules/logger';

import { List } from 'ui/common/List';
import { Heading } from 'ui/common/Heading';
import { LinkButton } from 'ui/common/LinkButton';
import { RecentProjectsUI } from 'ui/components/RecentProjects';

const create = (): void => Logger.log('CREATE');
const open = (): void => Logger.log('OPEN');

export const IntroUI: React.SFC = () => (
    <div className="Intro">
        <Heading size="large" text={TXT.intro.title} />
        <List>
            <LinkButton onClick={create}>{TXT.intro.create}</LinkButton>
            <LinkButton onClick={open}>{TXT.intro.open}</LinkButton>
        </List>

        <RecentProjectsUI />
    </div>
);
