import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TXT } from 'data/texts';
import { APP, RECENT_PROJECTS } from 'data/config';

import { AppData } from 'modules/app';
import { AppState, AppDispatch } from 'modules/store';
import { setUndo, setRedo } from 'modules/app/actions';
import { RecentProjectData } from 'modules/recent-projects';
import { setMaxRecentFiles } from 'modules/recent-projects/actions';

import { Heading } from 'ui/common/Heading';
import { FormField } from 'ui/common/FormField';
import { OverlayUI } from 'ui/components/Overlay';
import { FormNumber } from 'ui/common/FormNumber';
import { FormSelect, createSelectOptions } from 'ui/common/FormSelect';

const options = createSelectOptions(Array.from(RECENT_PROJECTS.VALUES), value => ({
    label: value.toString(),
    value: value.toString()
}));

export const SettingsUI: React.SFC = () => {
    const recentProjects = useSelector<AppState, RecentProjectData>(state => state.recentProjects);
    const { undo, redo } = useSelector<AppState, AppData>(state => state.app);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <OverlayUI title={TXT.settings.title}>
            <Heading text={TXT.project.title} />

            <FormField id="undo" label={TXT.project.undo.title}>
                <FormNumber
                    id="undo"
                    min={APP.UNDO.MIN}
                    max={APP.UNDO.MAX}
                    value={undo}
                    onChange={value => dispatch(setUndo(value))}
                />
            </FormField>

            <FormField id="redo" label={TXT.project.redo.title}>
                <FormNumber
                    id="redo"
                    min={APP.REDO.MIN}
                    max={APP.REDO.MAX}
                    value={redo}
                    onChange={value => dispatch(setRedo(value))}
                />
            </FormField>

            <Heading text={TXT.recentProjects.title} />

            <FormField id="projects" label={TXT.recentProjects.max}>
                <FormSelect
                    id="projects"
                    options={options}
                    value={recentProjects.max.toString()}
                    onChange={value => dispatch(setMaxRecentFiles(value))}
                />
            </FormField>
        </OverlayUI>
    );
};
