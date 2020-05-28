import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { ask } from 'modules/dialogue';
import { Logger } from 'modules/logger';
import { State, AppDispatch } from 'modules/store';
import { RecentProjectData, RecentProjects } from 'modules/recent-projects';

import { Heading } from 'ui/common/Heading';
import { Paragraph } from 'ui/common/Paragraph';
import { LinkButton } from 'ui/common/LinkButton';

const open = (path: string) => () => Logger.log('OPEN', path);

const onRemove = (dispatch: AppDispatch, path: string) => () => {
    ask(TXT.recentProjects.remove.ask).then(result => {
        if (result) {
            dispatch(RecentProjects.actions.remove(path));
        }
    });
};

const onClear = (dispatch: AppDispatch) => () => {
    ask(TXT.recentProjects.clear.ask).then(result => {
        if (result) {
            dispatch(RecentProjects.actions.clear());
        }
    });
};

export const RecentProjectsUI: React.SFC = () => {
    const projects = useSelector<State, RecentProjectData>(state => state.recentProjects);
    const dispatch = useDispatch<AppDispatch>();
    const hasProjects = (projects.length > 0);

    const clearButton = (
        <LinkButton onClick={onClear(dispatch)}>
            {TXT.recentProjects.clear.title}
        </LinkButton>
    );
    return (
        <>
            <Heading
                size="small"
                text={TXT.recentProjects.title}
                extra={hasProjects ? clearButton : null}
            />
            {(!hasProjects
                ? <Paragraph>{TXT.recentProjects.empty}</Paragraph>
                : (
                    <ul className="RecentProjects">
                        {projects.map((path, i) => {
                            const parts = path.split('/');
                            const title = parts[parts.length - 1];
                            return (
                                <li className="RecentProjects-item" key={i}>
                                    <div className="RecentProjects-item-title">
                                        <LinkButton
                                            title={path}
                                            onClick={open(path)}
                                            limited
                                        >
                                            {title}
                                        </LinkButton>
                                    </div>

                                    <div className="RecentProjects-item-actions">
                                        <LinkButton
                                            title={TXT.recentProjects.remove.title}
                                            onClick={onRemove(dispatch, path)}
                                        >
                                            {TXT.recentProjects.remove.ico}
                                        </LinkButton>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )
            )}
        </>
    );
};
