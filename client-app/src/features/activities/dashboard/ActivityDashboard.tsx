import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';



export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();   
    const {loadActivities, activityRegistry} = activityStore; 

    // inside the {} we tell useEffect what we want to do when the component loaded up
    useEffect(() => {
     if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry,loadActivities])//this dependency will have effect that the function will only load one  
  
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filter</h2>
            </Grid.Column>
        </Grid>
    )
})