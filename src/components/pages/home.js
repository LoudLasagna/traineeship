/* eslint-disable no-console */
import React from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import ListItem from '../ListItem';
import LoginForm from '../LoginForm';
import MainCartButton from '../MainCartButton';

class App extends React.Component {
  constructor(...args) {
    super(args)

    this.state = { fetchedCatalog: [] }
  }

  componentDidMount() {
    axios.get('/api/v1/catalog')
      .then((response) => {
        this.setState({ fetchedCatalog: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { fetchedCatalog } = this.state
    return (
      <div className="wrapper col-11 mt-3 center-block mx-auto p-4">
        <header>
          <h2>магазинский | каталог</h2>
        </header>
        <div className="menu mb-3 d-flex col-12 justify-content-between">
          <LoginForm />
          <MainCartButton />
        </div>
        <div>
          <Container fluid className="p-0" style={{ minHeight: '500px' }}>
            <Row>
              {fetchedCatalog.length > 0
                ? fetchedCatalog.map((item) => (
                  <Col xs={12} sm={6} lg={4} xl={3} key={item.id}>
                    <ListItem data={item} />
                  </Col>
                ))
                : (
                  <Loader
                    type="TailSpin"
                    color="#2e4666"
                    height={200}
                    width={200}
                    style={{
                      height: '200px',
                      width: '200px',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      margin: '200px auto'
                    }}
                  />
                )}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default connect()(App);
