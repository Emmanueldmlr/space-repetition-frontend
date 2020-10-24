import React from 'react'
import LoadingOverlay from 'react-loading-overlay';
import {useStoreState} from 'easy-peasy'

function Loader(props) {
    const {isLoading} = useStoreState(State => State.todo)
    return (
        <LoadingOverlay
            active={isLoading}
            spinner
            text='Loading your content...'
            >
            {
                props.children
            }
        </LoadingOverlay>
    )
}

export default Loader
