import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TXT } from 'data/texts';
import { RECENT_PROJECTS_VALUES } from 'data/config';

import { State, AppDispatch } from 'modules/store';
import { setMaxRecentFiles, RecentProjectData } from 'modules/recent-projects';

import { Heading } from 'ui/common/Heading';
import { OverlayUI } from 'ui/components/Overlay';
import { SettingsItemUI } from 'ui/components/SettingsItem';
import { SettingsItemListUI } from 'ui/components/SettingsItemList';
import { FormSelect, createSelectOptions } from 'ui/common/FormSelect';

const options = createSelectOptions(Array.from(RECENT_PROJECTS_VALUES), value => ({
    label: value.toString(),
    value: value.toString()
}));

export const SettingsUI: React.SFC = () => {
    const recentProjects = useSelector<State, RecentProjectData>(state => state.recentProjects);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <OverlayUI title={TXT.settings.title}>
            <Heading size="small" text={TXT.recentProjects.title} />

            <SettingsItemListUI>
                <SettingsItemUI id="projects-max" label={TXT.recentProjects.max}>
                    <FormSelect
                        id="projects-max"
                        options={options}
                        value={recentProjects.max.toString()}
                        onChange={value => setMaxRecentFiles(dispatch, value)}
                    />
                </SettingsItemUI>
            </SettingsItemListUI>
        </OverlayUI>
    );
};
