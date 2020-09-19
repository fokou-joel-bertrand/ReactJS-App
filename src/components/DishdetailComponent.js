import React, { Component } from 'react';
import { CardImg, Card, CardText, CardTitle, CardBody } from 'reactstrap';

class DishDetail extends Component {

    renderDish(dish) {
    if(dish !== null){
      return(
        <div className='col-12 col-sm-5 m-1'>
            <Card>
                <CardImg width='100%' src={dish.image} alt={dish.name}/>
                <CardBody>
                 <CardTitle>{dish.name}</CardTitle>
                 <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>       )
    }
    else {
        return(
            <div></div>
        )
    }
 }
 
    renderComments(comments) {

            const cmt =  comments.map((commentKey) => {
                return (
                  <div key={commentKey.id}>
                       <ul className='list-unstyled'>
                          <li>{commentKey.comment}</li>
                          <li>{'-- '+commentKey.author+',  '}
{ new Intl.DateTimeFormat('en-US', {year : 'numeric', month : 'short', day : '2-digit'}).format(new Date(Date.parse(commentKey.date)))}</li>
                        </ul>
                  </div>)
              })
            return(
              <div className='col-12 col-sm-5 m-1'>
                  <h4>Comments</h4>
                  {cmt}
              </div>)
    }

    render() {

     if(this.props.dish != null) {
        return (
            <div className='container'>
               <div className='row'>
                  {this.renderDish(this.props.dish)}
                  {this.renderComments(this.props.dish.comments)}
               </div>
            </div>
          );

     } else {
         return <div></div>
       }
    } 
}

export default DishDetail;