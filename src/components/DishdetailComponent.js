import React, {Component} from 'react';
import { CardImg, Card, CardText, CardTitle, Button, 
        CardBody, BreadcrumbItem, Breadcrumb, Modal, ModalBody,
         ModalHeader, Label, Row, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, Errors, LocalForm} from 'react-redux-form';
import {Loading} from './LoadingComponent';

const required = val => val && val.length;
const maxLength = len => val => !val || len >= val.length;
const minLength = len => val =>  !(val) || len <= val.length;

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen : false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal () {
        this.setState({isModalOpen : !this.state.isModalOpen})
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
    }

    render() {
        return (
            <React.Fragment>
                <Button className='bg-light border-secondary text-secondary' onClick={this.toggleModal}>
                    <span className='fa fa-edit fa-lg'></span> Submit comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                       <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
                       <ModalBody>
                           <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className='form-group m-2'>
                                    <Label htmlFor='rating'>Rating</Label>
                                    <Control.select model='.rating' className='form-control'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </Control.select>
                                </Row>
                                <Row className='form-group m-2'>
                                    <Label htmlFor='name'>Your Name</Label> 
                                    <Control.text model='.name' className='form-control'
                                      validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}
                                    />
                                    <Errors 
                                    className='text-danger'
                                    show='touched'
                                    model='.name'
                                    messages = {{
                                        required: 'This field is required',
                                        minLength: 'The minimum length is 3 characters',
                                        maxLength: 'The max length is 15 characters'
                                    }}
                                          />
                                </Row>
                                <Row className='form-group m-2'>
                                    <Label htmlFor='comment'>Comment</Label>
                                    <Control.textarea model='.comment' className='form-control'
                                    rows='6' id='comment' name='comment'/>
                                </Row>
                                <Row className='form-group m-2'>
                                    <Button type='submit' color='primary'>Submit</Button>
                                </Row>
                           </LocalForm>
                       </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

   const RenderDish = ({dish}) => {

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
 
    const RenderComments = ({comments, addComment, dishId}) => {

      if(comments != null){
          return(
                <div className='col-12 col-sm-5 m-1'>
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                        {
                            comments.map((comment) => {
                                 return(
                                    <li key={comments.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author},{ new Intl.DateTimeFormat('en-US', {year : 'numeric', month : 'short', day : '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
                                    </li>
                                 )
                            })
                        }
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            )
      } else {
          return(
              <div></div>
          )
      }

    }

    const DishDetail = (props) => {

        if(props.isLoading) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Loading/>
                    </div>
                </div>
            )
        }
        else if (props.errMess) {
            return (
                   <div className='container'>
                       <div className='row'>
                           <h4>{props.errMess}</h4>
                       </div>
                   </div>          
            )
        }
        else if (props.dish != null) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                           <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                           <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                           <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                    </div>
                   <div className='row'>
                      <RenderDish dish={props.dish}/>
                      <RenderComments comments={props.comments}
                      addComment={props.addComment} dishId={props.dish.id}/>
                   </div>
                </div>
              );
    
         } else {
             return <div></div>
           }
    }

export default DishDetail;