import React from "react";

import {
    Container,
    Form,
    FormControl,
    InputGroup,
    Button
} from "react-bootstrap";
import {login} from "../../api/";
import {connect} from "react-redux";
import {setUser, setIsAuth} from "../../redux/ducks/user.js";
import {Link} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    handleChange = ({ target }) => {
        const { value, name } = target;
        this.setState({ ...this.state, [name]: value.toString() });
    }

    handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const { setUser, setIsAuth, user } = this.props;
        const fetchedUser = await login(email, password);
        console.log(fetchedUser)
        setUser(fetchedUser);
        setIsAuth(true);
        console.log(user, fetchedUser);
    }

    render() {
        const { email, password } = this.state;

        return (
            <Container className="mt-4">
                <Form>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Email</InputGroup.Text>
                        <FormControl value={email} onChange={this.handleChange} name="email" type="email" aria-label="Email" required />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Пароль</InputGroup.Text>
                        <FormControl value={password} onChange={this.handleChange} type="password" name="password" required />
                    </InputGroup>
                    <div className="d-flex justify-content-end">
                        <Button
                            type="submit"
                            onClick={this.handleLogin}
                        >
                            <Link to="/">Войти</Link>
                        </Button>
                    </div>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user
    }
};

const actionCreators = {
    setIsAuth,
    setUser
};

export default connect(
    mapStateToProps,
    actionCreators
)(Login);