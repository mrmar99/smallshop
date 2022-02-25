import React from "react";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {connect} from "react-redux";

import {createOrder} from "../../api";
import {clearBasket} from "../../redux/ducks/basket";

class BasketOrder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            number: "",
            address: "",
            obtaining_method: "1",
            payment_method: "2"
        };
    }

    onChange = ({ target }) => {
        const { value, name } = target;
        console.log(value);

        this.setState({
            ...this.state,
            [name]: value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { first_name, last_name, number, address, obtaining_method, payment_method } = this.state;
        const { basket, clearBasket } = this.props;
        const commonPrice = Object.values(basket).reduce((acc, product) => {
            console.log(product)
            return acc += (product.price * product.quantity)
        }, 0);
        const orderFormData = new FormData();
        orderFormData.append("first_name", first_name);
        orderFormData.append("last_name", last_name);
        orderFormData.append("number", number);
        orderFormData.append("address", address);
        orderFormData.append("obtaining_method", obtaining_method);
        orderFormData.append("payment_method", payment_method);
        orderFormData.append("price", commonPrice);
        orderFormData.append("basket", JSON.stringify(basket));
        try {
            await createOrder(orderFormData);
            this.setState({
                first_name: "",
                last_name: "",
                number: "",
                address: "",
                obtaining_method: "1",
                payment_method: "2"
            });
            clearBasket();
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { first_name, last_name, number, address, obtaining_method, payment_method } = this.state;
        const { quantity } = this.props;

        return (
            <>
                {
                    quantity > 0 ?
                        <>
                            <p className="h3">Оформление заказа</p>
                            <Form className="mt-4" onSubmit={this.onSubmit}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>Ваши имя и фамилия</InputGroup.Text>
                                    <FormControl required value={first_name} name="first_name" onChange={this.onChange} aria-label="Имя" />
                                    <FormControl required value={last_name} name="last_name" onChange={this.onChange} aria-label="Фамилия" />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text>Телефон</InputGroup.Text>
                                    <FormControl required value={number} name="number" onChange={this.onChange} type="tel" />
                                </InputGroup>
                                <InputGroup className="mt-3">
                                    <InputGroup.Text>Адрес</InputGroup.Text>
                                    <FormControl required value={address} name="address" onChange={this.onChange} as="textarea" />
                                </InputGroup>
                                <InputGroup className="mt-3">
                                    <InputGroup.Text>Способ получения</InputGroup.Text>
                                    <Form.Select name="obtaining_method" value={obtaining_method} onChange={this.onChange} aria-label="Выберите способ получения">
                                        <option value="Курьер">Курьер</option>
                                        <option value="Самовывоз">Самовывоз</option>
                                    </Form.Select>
                                </InputGroup>
                                <InputGroup className="mt-3">
                                    <InputGroup.Text>Способ оплаты</InputGroup.Text>
                                    <Form.Select name="payment_method" value={payment_method} aria-label="Выберите способ оплаты">
                                        <option value="Наличными">Наличными</option>
                                        <option value="Картой при получении">Картой при получении</option>
                                    </Form.Select>
                                </InputGroup>
                                <div className="d-flex justify-content-end">
                                    <Button type="submit" className="my-3">
                                        Оформить
                                    </Button>
                                </div>
                            </Form>
                        </>
                    :
                        <p className="h3 mt-5 text-center">Чтобы оформить заказ, добавьте товары в корзину</p>
                }
            </>
        )
    }
}

const mapStateToProps = ({ basket }) => {
    return {
        basket: basket.basket,
        quantity: basket.quantity
    };
}

const actionCreators = {
    clearBasket
};


export default connect(
    mapStateToProps,
    actionCreators
)(BasketOrder);