import React, {Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComments, fetchComments, fetchDishes, fetchPromos} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes : state.dishes,
    promotions : state.promotions,
    leaders : state.leaders,
    comments : state.comments
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComments: (dishId, rating, author, comment) => 
  dispatch(postComments(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback'))
})

class Main extends Component {

  constructor(props){
    super(props);
  }
 componentDidMount() {
   this.props.fetchDishes();
   this.props.fetchComments();
   this.props.fetchPromos();
 }

 render(){

    const HomePage = () => {
             return(
           <Home dish={this.props.dishes.dishes.filter( dish => dish.featured)[0]}
                 dishesLoading={this.props.dishes.isLoading}
                 dishesErrMess={this.props.dishes.errMess}
                 promotion={this.props.promotions.promotions.filter( promo => promo.featured)[0]}
                 promotionsLoading={this.props.promotions.isLoading}
                 promotionsErrMess={this.props.promotions.errMess}
                 leader={this.props.leaders.filter( leader => leader.featured)[0]}
                 commentsErrMess={this.props.comments.errMess}
                 comment={this.props.comments.comments.filter( comment => comment.featured)[0]} />
             )
    }

    const DishWithId = ({match}) => {
        return (
            <DishDetail dish={this.props.dishes.dishes.filter( dish => dish.id === parseInt(match.params.dishId ,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            commentsErrMess={this.props.comments.errMess}
            comments={this.props.comments.comments.filter( comment => comment.dishId === parseInt(match.params.dishId, 10))} 
            postComments={this.props.postComments}/>
        )
    }

  return (
    <div>
   <Header />
     <Switch>
         <Route path='/home' component={HomePage} />
         <Route path='/aboutus' component={() => <About leaders={this.props.leaders}/>}/>
         <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
         <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes}/>}/>
         <Route path='/menu/:dishId' component={DishWithId} />
         <Redirect to='/home'/>
     </Switch>
   <Footer />
    </div>
  );
 }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
