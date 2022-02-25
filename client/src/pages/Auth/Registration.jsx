import React from "react";

import {
    Container,
    Form,
    FormControl,
    InputGroup,
    Button
} from "react-bootstrap";
import {registration} from "../../api";
import {setIsAuth, setUser} from "../../redux/ducks/user.js";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: ""
        };
    }

    handleChange = ({ target }) => {
        const { value, name } = target;
        this.setState({ ...this.state, [name]: value.toString() });
    }

    handleRegistration = async (e) => {
        try {
            e.preventDefault();
            const { email, password, firstName, lastName } = this.state;
            const { setUser, setIsAuth } = this.props;
            const user = await registration(email, password, firstName, lastName);
            setUser(user);
            setIsAuth(true);
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    render() {
        const { email, password, firstName, lastName } = this.state;

        return (
            <Container className="mt-4">
                <Form>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Имя</InputGroup.Text>
                        <FormControl value={firstName} onChange={this.handleChange} type="text" name="firstName" required />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Фамилия</InputGroup.Text>
                        <FormControl value={lastName} onChange={this.handleChange} type="text" name="lastName" required />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Email</InputGroup.Text>
                        <FormControl value={email} onChange={this.handleChange} type="text" name="email" required />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Пароль</InputGroup.Text>
                        <FormControl value={password} onChange={this.handleChange} type="password" name="password" required />
                    </InputGroup>
                    <div className="d-flex justify-content-end">
                        <Button
                            type="submit"
                            onClick={this.handleRegistration}
                        >
                            <Link to="/">Регистрация</Link>
                        </Button>
                    </div>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user: user.user
    }
};

const actionCreators = {
    setIsAuth,
    setUser
};

export default connect(
    mapStateToProps,
    actionCreators
)(Registration);