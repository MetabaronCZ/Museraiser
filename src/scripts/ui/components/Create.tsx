import React from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { createProject } from 'modules/project';

import { Button } from 'ui/common/Button';
import { Paragraph } from 'ui/common/Paragraph';
import { OverlayUI } from 'ui/components/Overlay';

export const CreateUI: React.SFC = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <OverlayUI title={TXT.create.title}>
            <Paragraph>...</Paragraph>

            <Button
                text={TXT.create.new}
                onClick={() => createProject(dispatch, {})}
            />
        </OverlayUI>
    );
};
