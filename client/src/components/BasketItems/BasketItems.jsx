import React from "react";
import {Col, Form, ListGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {setProductQuantity, deleteProduct} from "../../redux/ducks/basket";
import {fetchOneProduct} from "../../api/products";

class BasketItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: {}
        };
    }

    componentDidMount = () => {
        const { basket } = this.props;
        const inputs = {};
        Object.values(basket).forEach((product) =>
            inputs[product.id] = product.quantity
        );
        this.setState({ ...this.state, inputs: inputs });
    }

    onChangeQty = (productId) => async ({ target }) => {
        const { setProductQuantity } = this.props;
        const product = await fetchOneProduct(productId);
        console.log(target.value);
        if (Number.isNaN(parseInt(target.value))) {
            this.setState({...this.state, inputs: {...this.state.inputs, [product[0].id]: 0 } });
        } else if (parseInt(target.value) < 1) {
            console.log("if target value < 1", target.value)
            this.setState({...this.state, inputs: {...this.state.inputs, [product[0].id]: 1 } });
        } else {
            this.setState({ ...this.state, inputs: { ...this.state.inputs, [product[0].id]: parseInt(target.value) } });
        }
        setProductQuantity(target.value, product[0]);
    }

    onSubmitItems = (e) => {
        e.preventDefault();
    }

    render() {
        const { basket } = this.props;
        const { inputs } = this.state;
        const commonPrice = Object.values(basket).reduce((acc, product) =>
            acc += (product.price * inputs[product.id])
        , 0)

        return (
            <Form onSubmit={this.onSubmitItems}>
                <ListGroup as="ol" numbered className="mt-4">
                    {
                        Object.values(basket).map((product) => {
                            console.log(inputs[product.id])
                            return (
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <div className="ms-2 me-auto">
                                        {product.product_name}
                                    </div>
                                    <div className="m-auto">
                                        {product.price} ₽
                                    </div>
                                    <Col sm={5} className="m-auto w-25">
                                        <Form.Control
                                            defaultValue={inputs[product.id]}
                                            onChange={this.onChangeQty(product.id)}
                                            id="inlineFormInputName"
                                            placeholder="Кол-во"
                                        />
                                    </Col>
                                    <div className="me-5">
                                        {product.price * inputs[product.id]} ₽
                                    </div>
                                </ListGroup.Item>
                            )
                        })
                    }
                    <div className="d-flex justify-content-end mt-2">
                        <b>Итого: {commonPrice} ₽</b>
                    </div>
                </ListGroup>
            </Form>
        )
    }
}

const mapStateToProps = ({ basket }) => {
    return {
        basket: basket.basket
    };
}

const actionCreators = {
    setProductQuantity,
    deleteProduct
};


export default connect(
    mapStateToProps,
    actionCreators
)(BasketItems);