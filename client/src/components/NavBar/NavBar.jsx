import React from "react";
import {Badge, Container, Nav, Navbar} from "react-bootstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {setUser, setIsAuth} from "../../redux/ducks/user.js";

import "./NavBar.sass";

class NavBar extends React.Component {
    handleExit = async () => {
        const { setUser, setIsAuth } = this.props;
        setUser({ });
        setIsAuth(false)
        localStorage.removeItem("token");
    }

    render() {
        const { quantity } = this.props;
        const { isAuth, isAdmin } = this.props.user;

        return (
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand>Десяточка</Navbar.Brand>
                    <Nav className="me-auto d-flex">
                        <Link to={"/"}>Главная</Link>
                        <Link to={"/basket"}>
                            Корзина <Badge bg="danger">{quantity}</Badge>
                            <span className="visually-hidden">товаров в корзине</span>
                        </Link>
                        {
                            isAuth && isAdmin ?
                                <Link to={"/report"}>Выгрузить отчет</Link>
                                : null
                        }
                        {
                            !isAuth ?
                                <>
                                    <Link to={"/login"}>Войти</Link>
                                    <Link to={"/registration"}>Зарегистрироваться</Link>
                                </> :
                                <>
                                    <Link to={"/"} onClick={this.handleExit}>Выйти</Link>
                                </>
                        }
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

const mapStateToProps = ({ basket, user }) => {
    return {
        basket,
        user: user.user
    }
}

const actionCreators = {
    setUser,
    setIsAuth
};


export default connect(
    mapStateToProps,
    actionCreators
)(NavBar);