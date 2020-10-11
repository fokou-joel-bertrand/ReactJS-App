import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Col, FormGroup, Form, Label, Input, FormFeedback} from 'reactstrap';
import { Link } from 'react-router-dom';


class Contact extends Component{

    constructor(props) {
        super(props);

        this.state = {
            firstname : '',
            lastname : '',
            email : '',
            telnum : '',
            agree : false,
            contactType : 'Tel.',
            message : '',
            touched : {
                firstname : false,
                lastname : false,
                telnum : false,
                email : false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event) {
         const target = event.target;
         const value = target.type === 'checkbox' ? target.check : target.value;
         const name = target.name;

         this.setState({
             [name] : value
         });
    }

    handleSubmit(event) {
        alert(`Records are ${JSON.stringify(this.state)}`);
        event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched : {...this.state.touched, [field]: true}
        });
    }

    validate(firstname, lastname, telnum, email) {
        const error = {
            firstname : '',
            lastname : '',
            telnum : '',
            email : ''
        }
        if (this.state.touched.firstname && firstname.length < 3) {
            error.firstname = 'first name must be > 3 characters'
        }
        else if (this.state.touched.firstname && firstname.length > 10) {
            error.firstname = 'first name must be < 10 characters'
        }
        if (this.state.touched.lastname && lastname.length < 3) {
            error.lastname = 'last name must be > 3 characters'
        }
        else if (this.state.touched.lastname && lastname.length > 10) {
            error.lastname = 'last name must be < 10 characters'
        }

        const reg = /^\d+$/;

        if (this.state.touched.telnum && !reg.test(telnum)) {
            error.telnum = 'Telephone number must be only intergers';
        }

        if (this.state.touched.email && email.split('').filter( x => x === '@').length !== 1) {
             error.email = 'Email must have @';
        }

        return error;
    }

    render() {

        const errors = this.validate(this.state.firstname,this.state.lastname,
                       this.state.telnum,this.state.email);

        return(
            <div className="container">
                <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                            </Breadcrumb>
                <div className='col-12'>
                        <h3>Contact Us</h3>
                        <hr/>
                </div>
                </div>
    
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                     <h3>Send us your feedback</h3>
                     <div className="col-12 col-sm-9">
                         <Form onSubmit={this.handleSubmit}>
                             <FormGroup row>
                                 <Label md={2} htmlFor="firstname">First Name</Label>
                                 <Col md={10}>
                                     <Input type="text" name="firstname" valid={errors.firstname === ''} 
                                     invalid={errors.firstname !== ''} onBlur={this.handleBlur('firstname')} 
                                     onChange={this.handleInputChange} placeholder="First Name" id="firstname" 
                                     value={this.state.firstname}/>
                                 <FormFeedback>{errors.firstname}</FormFeedback>
                                 </Col>
                             </FormGroup>
                             <FormGroup row>
                                 <Label htmlFor="lastname" md={2}>Last Name</Label>
                                 <Col md={10}>
                                    <Input type="text" name="lastname" valid={errors.lastname === ''} 
                                    invalid={errors.lastname !== ''} onBlur={this.handleBlur('lastname')} 
                                    onChange={this.handleInputChange} id="lastname" placeholder="Last Name" 
                                    value={this.state.lastname}/>
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                 </Col>
                             </FormGroup>
                             <FormGroup row>
                                 <Label htmlFor="email" md={2}>Email</Label>
                                 <Col md={10}>
                                    <Input type="email" name="email" valid={errors.email === ''} 
                                    invalid={errors.email !== ''} onBlur={this.handleBlur('email')} 
                                    onChange={this.handleInputChange} id="email" placeholder="Email" 
                                    value={this.state.email}/>
                                    <FormFeedback>{errors.email}</FormFeedback>
                                 </Col>
                             </FormGroup>
                             <FormGroup row>
                                 <Label htmlFor="telnum" md={2}>Contact</Label>
                                 <Col md={10}>
                                    <Input type="text" name="telnum" id="telnum" valid={errors.telnum === ''} 
                                    invalid={errors.telnum !== ''} onBlur={this.handleBlur('telnum')} 
                                    onChange={this.handleInputChange} placeholder="Tel. Num" 
                                    value={this.state.telnum}/>
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                 </Col>
                             </FormGroup>
                             <FormGroup row>
                                 <Col md={{size : 6, offset : 2}}>
                                     <FormGroup check>
                                         <Label check>
                                             <Input type="checkbox" name="agree" onChange={this.handleInputChange} value={this.state.agree}/>
                                             {' '} <strong>May we contact you ?</strong>
                                         </Label>
                                     </FormGroup>
                                 </Col>
                                 <Col md={{size : 3, offset : 1}}>
                                     <Input type="select" value={this.state.contactType} onChange={this.handleInputChange} name='contact'>
                                         <option>Tel.</option>
                                         <option>Email</option>
                                     </Input>
                                 </Col>
                             </FormGroup>
                             <FormGroup row>
                                 <Label htmlFor="message" md={2}>Your feedback</Label>
                                 <Col md={10}>
                                     <Input type="textarea" name="message" onChange={this.handleInputChange} value={this.state.message} id='message' rows='10' />
                                 </Col>
                             </FormGroup>
                             <FormGroup row>
                                 <Col md={{size : 10, offset : 2}}>
                                        <Button color="primary" type="submit">Send Feedback</Button>
                                 </Col>
                             </FormGroup>
                         </Form>
                     </div>
                </div>
            </div>
        );
    }

}

export default Contact;