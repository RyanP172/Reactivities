import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';



export default observer(function ActivityForm(){

    const {activityStore} = useStore();
    const {createActivity, updateActivity, 
        loading, loadActivity, loadingInitial} = activityStore;        
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({        
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    });

    useEffect(() =>{
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])


    function handleSubmit() {
        if(!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
        } else {
            updateActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
        }        
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name,value} = event.target;
        setActivity({...activity, [name]: value}) //These three dots are called the spread syntax or spread operator. The spread syntax is a feature of ES6, and it’s also used in React.

                                                //Spread syntax allows you to deconstruct an array or object into separate variables. Even though the syntax doesn’t look particularly meaningful when you first encounter it, spread syntax is super useful.
    }

    if(loadingInitial) return <LoadingComponent content='Loading activity...'/>

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit'  />
                <Button as={Link} to={'/activities'} floated='right' type='button' content='Cancel'  />
            </Form>
        </Segment>
    )
})