import React from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";

import NavBar from "./components/NavBar/NavBar";

import './styles/App.sass';
import {setProducts} from "./redux/ducks/products";
import {setUser, setIsAuth} from "./redux/ducks/user";
import {fetchProducts} from "./api";
import {connect} from "react-redux";
import {check} from "./api";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        const { setIsAuth, setUser } = this.props;

        check().then((data) => {
            setUser(data);
            console.log(data);
            setIsAuth(true);
        }).finally(() => {
            this.setState({loading: false});
        });
    }

    componentDidMount = async () => {
        const { setProducts } = this.props;
        const products = await fetchProducts();
        setProducts(products);
    }

    render() {
        const { quantity } = this.props;
        const { loading } = this.state;

        if (loading) {
            return (
                <section className="preloader-container">
                    <div className="lds-ring">
                        <div> </div>
                        <div> </div>
                        <div> </div>
                        <div> </div>
                    </div>
                </section>
            )
        } else {
            return (
                <BrowserRouter>
                    <NavBar quantity={quantity} />
                    <AppRouter />
                </BrowserRouter>
            )
        }
    }
}

const mapStateToProps = ({ products, basket, user }) => {
    return {
        products,
        quantity: basket.quantity,
        user
    }
}

const actionCreators = {
    setProducts,
    setUser,
    setIsAuth
};


export default connect(
    mapStateToProps,
    actionCreators
)(App);
