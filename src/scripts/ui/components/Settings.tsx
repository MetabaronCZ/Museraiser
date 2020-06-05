import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TXT } from 'data/texts';
import { APP, RECENT_PROJECTS } from 'data/config';

import { AppState, AppDispatch } from 'modules/store';
import { setUndo, setRedo, AppData } from 'modules/app';
import { setMaxRecentFiles, RecentProjectData } from 'modules/recent-projects';

import { Form } from 'ui/common/Form';
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
            <Form>
                <Heading size="small" text={TXT.project.title} />

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

                <Heading size="small" text={TXT.recentProjects.title} />

                <FormField id="projects" label={TXT.recentProjects.max}>
                    <FormSelect
                        id="projects"
                        options={options}
                        value={recentProjects.max.toString()}
                        onChange={value => dispatch(setMaxRecentFiles(value))}
                    />
                </FormField>
            </Form>
        </OverlayUI>
    );
};
