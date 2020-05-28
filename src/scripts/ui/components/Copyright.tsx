import React from 'react';

const year = new Date().getFullYear();

export const Copyright: React.SFC = () => (
    <div className="Copyright">
        Copyright © {year} Milan K.
    </div>
);
