import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Error from '../error';
import ErrorBoundary from '../error-boundary/error-boundary';
import MainContainer from '../main-container';
import {HomePage, AboutPage, RelationshipsPage, RequirementsPage, UsersPage, SignUpPage} from '../pages';
import UserDetails from '../pages/user-details';

const App = () => {
    return (
        <ErrorBoundary>
            <Router>
                <MainContainer>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/about" component={AboutPage} />
                        <Route path="/relationships" component={RelationshipsPage} />
                        <Route path="/requirements" component={RequirementsPage} />
                        <Route path="/users" exact component={UsersPage} />
                        <Route path="/signup" component={SignUpPage} />
                        <Route path="/users/:id" render={
                            ({match}) => {
                                const {id} = match.params; // из адресной строки берем slug
                                return <UserDetails userId={id} /> // и передаем его в компоненту
                            }
                        } />
                        <Route component={Error} />
                    </Switch>
                </MainContainer>
            </Router>
        </ErrorBoundary>
    )
};

export default App;