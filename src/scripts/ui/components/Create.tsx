import React from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { setProject } from 'modules/project';
import { createProjectFile } from 'modules/project/file';

import { Button } from 'ui/common/Button';
import { Paragraph } from 'ui/common/Paragraph';
import { OverlayUI } from 'ui/components/Overlay';

type OnClick = () => void;

const getCreateButton = (onClick: OnClick): React.ReactNode => (
    <Button
        text={TXT.create.new}
        onClick={onClick}
    />
);

export const CreateUI: React.SFC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const project = createProjectFile();
    const createButton = getCreateButton(() => dispatch(setProject(project)));
    return (
        <OverlayUI title={TXT.create.title} buttons={[createButton]}>
            <Paragraph>...</Paragraph>
        </OverlayUI>
    );
};
