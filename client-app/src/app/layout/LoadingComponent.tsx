import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string;
    //make the ? to make it optional
}

export default function LoadingComponent({inverted = true, content='Loading...'}: Props) {
    return (
        <Dimmer active={true} inverted = {inverted}>
            <Loader content={content} />

        </Dimmer>
    )
}