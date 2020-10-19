import React from 'react';
import {Card, CardBody, CardText, CardImg, CardTitle, CardSubtitle} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import {Loading} from './LoadingComponent';

const RenderCard = ({item, isLoading, errMess}) => {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
              <Loading />
            );
    }
    else
     return(
        <Card>
            <CardImg src={baseUrl + item.image} alt={item.name}/>
            <CardBody>
            <CardTitle> {item.name} </CardTitle>
              {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
            <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

const Home = (props) => {
    return(
        <div className='container'>
            <div className='row align-items-start'>
                <div className='col-12 col-md m-1'>
                    <RenderCard item={props.dish} 
                          isLoading={props.dishesLoading} errMess={props.dishesErrMes}/>
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCard item={props.promotion} 
                          isLoading={props.promotionsLoading} errMess={props.promotionsErrMes}/>
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCard item={props.leader}/>
                </div>
            </div>
        </div>
    )
}
export default Home;