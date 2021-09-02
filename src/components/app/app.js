import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../pages/characterPage';
import BooksPage from '../pages/booksPage';
import HousePage from '../pages/housePage';
import gotService from '../../services/gotService';
import './app.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BooksItem from '../pages/booksItem';


export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button onClick={this.toggleRandomChar} className="toggle-btn" type="button">Toggle Random Character</button>
                            </Col>
                        </Row>
                        
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/houses' component={HousePage} />
                        <Route path='/books' exact component={BooksPage} />
                        <Route path='/books/:id' render={
                            ({match}) => {
                                console.log(match);
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>}
                        }/>

                    </Container>
                </div>
            </Router>
        )
    }
}