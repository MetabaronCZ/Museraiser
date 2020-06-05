import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { openProject } from 'modules/project/actions';
import { AppState, AppDispatch } from 'modules/store';
import { RecentProjectData } from 'modules/recent-projects';
import {
    clearRecentProjects, removeRecentProject
} from 'modules/recent-projects/actions';

import { Heading } from 'ui/common/Heading';
import { Paragraph } from 'ui/common/Paragraph';
import { LinkButton } from 'ui/common/LinkButton';

export const RecentProjectsUI: React.SFC = () => {
    const { files } = useSelector<AppState, RecentProjectData>(state => state.recentProjects);
    const dispatch = useDispatch<AppDispatch>();
    const hasProjects = (files.length > 0);

    const clearButton = (
        <LinkButton onClick={() => dispatch(clearRecentProjects())}>
            {TXT.recentProjects.clear.title}
        </LinkButton>
    );
    return (
        <>
            <Heading
                text={TXT.recentProjects.title}
                extra={hasProjects ? clearButton : null}
            />
            {(!hasProjects
                ? <Paragraph>{TXT.recentProjects.empty}</Paragraph>
                : (
                    <ul className="RecentProjects">
                        {files.map((path, i) => {
                            const parts = path.split('/');
                            const title = parts[parts.length - 1];
                            return (
                                <li className="RecentProjects-item" key={i}>
                                    <div className="RecentProjects-item-title">
                                        <LinkButton
                                            title={path}
                                            onClick={() => dispatch(openProject(path))}
                                            limited
                                        >
                                            {title}
                                        </LinkButton>
                                    </div>

                                    <div className="RecentProjects-item-actions">
                                        <LinkButton
                                            title={TXT.recentProjects.remove.title}
                                            onClick={() => dispatch(removeRecentProject(path))}
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
