import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TXT } from 'data/texts';
import { RECENT_PROJECTS } from 'data/config';

import { AppState, AppDispatch } from 'modules/store';
import { setMaxRecentFiles, RecentProjectData } from 'modules/recent-projects';

import { Form } from 'ui/common/Form';
import { Heading } from 'ui/common/Heading';
import { FormField } from 'ui/common/FormField';
import { OverlayUI } from 'ui/components/Overlay';
import { FormSelect, createSelectOptions } from 'ui/common/FormSelect';

const options = createSelectOptions(Array.from(RECENT_PROJECTS.VALUES), value => ({
    label: value.toString(),
    value: value.toString()
}));

export const SettingsUI: React.SFC = () => {
    const recentProjects = useSelector<AppState, RecentProjectData>(state => state.recentProjects);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <OverlayUI title={TXT.settings.title}>
            <Heading size="small" text={TXT.recentProjects.title} />

            <Form>
                <FormField id="projects-max" label={TXT.recentProjects.max}>
                    <FormSelect
                        id="projects-max"
                        options={options}
                        value={recentProjects.max.toString()}
                        onChange={value => dispatch(setMaxRecentFiles(value))}
                    />
                </FormField>
            </Form>
        </OverlayUI>
    );
};
