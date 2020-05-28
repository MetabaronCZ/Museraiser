import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TXT } from 'data/texts';
import { RECENT_PROJECTS_VALUES } from 'data/config';

import { Settings } from 'modules/settings';
import { State, AppDispatch } from 'modules/store';
import {
    RecentProjectData, RecentProjects, RecentProjectMaxValue
} from 'modules/recent-projects';

import { Button } from 'ui/common/Button';
import { Heading } from 'ui/common/Heading';
import { ContentUI } from 'ui/components/Content';
import { SettingsItemUI } from 'ui/components/SettingsItem';
import { SettingsItemListUI } from 'ui/components/SettingsItemList';
import { FormSelect, createSelectOptions } from 'ui/common/FormSelect';

const options = createSelectOptions(Array.from(RECENT_PROJECTS_VALUES), value => ({
    label: value.toString(),
    value: value.toString()
}));

const setMax = (value: string, dispatch: AppDispatch): void => {
    const max = parseInt(value, 10) as RecentProjectMaxValue;
    dispatch(RecentProjects.actions.setMax(max));
};

export const SettingsUI: React.SFC = () => {
    const recentProjects = useSelector<State, RecentProjectData>(state => state.recentProjects);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <ContentUI>
            <Heading size="large" text={TXT.settings.title} />

            <Heading size="small" text={TXT.recentProjects.title} />

            <SettingsItemListUI>
                <SettingsItemUI id="projects-max" label={TXT.recentProjects.max}>
                    <FormSelect
                        id="projects-max"
                        options={options}
                        value={recentProjects.max.toString()}
                        onChange={value => setMax(value, dispatch)}
                    />
                </SettingsItemUI>
            </SettingsItemListUI>

            <Button
                text={TXT.settings.back}
                onClick={() => dispatch(Settings.actions.toggle())}
            />
        </ContentUI>
    );
};
