import React, { Component } from 'react';
import styles from './App.module.css';
import {Card,Button,Row,Col,Container} from 'react-bootstrap';

class Pagination extends Component {


   state = {
    users: null,
    total: null,
    per_page: null,
    current_page: 1
  }

   componentDidMount() {
    this.handlePagination (1);
  }


  handlePagination = async pageNumber => {
	  
    const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    this.setState({
      users: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page
    });
  }


  render() {

    let users, renderPageNumbers;

    if (this.state.users !== null) {
   users = this.state.users.map(user => (

<Col className='mt-5'>
 <Card style={{ width: '18rem'}}>
  <Card.Img variant="top" src={user.avatar} />
  <Card.Body>
    <Card.Title>{user.first_name}{user.last_name}</Card.Title>
    <Card.Text>
     Email : {user.email}
    </Card.Text>
    <Button variant="primary">Get Profile</Button>
  </Card.Body>
</Card>
</Col>


))}

    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
        pageNumbers.push(i);
      }


      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.current_page === number ?styles.active: '';

        return (
          <span key={number} className={classes}  onClick={() => this.handlePagination (number)}>{number}</span>
        );
      });
    }


return (
    <Container>
		<h1>React Pagination ...</h1>
	<Row>{users}
  	
	<div className='mt-5 mb-5' style={{cursor:"pointer"}}>

	<span  style={{padding:"5px",border:"2px solid green"}} onClick={() => this.handlePagination (1)}>&laquo;</span>
          &nbsp;&nbsp;{renderPageNumbers}&nbsp;&nbsp;

	<span  style={{padding:"5px",border:"2px solid green"}} onClick={() => this.handlePagination (1)}>&raquo;</span>
        </div>
	 </Row> 
      </Container>
    );
  }

}

export default Pagination;