import React from "react";

import {
    Container,
    Badge,
    Form,
    Card,
    Col,
    Row,
    Button
} from "react-bootstrap";

import "./Home.sass";
import {setProducts, setStore} from "../../redux/ducks/products";
import {setBasket, setQuantity} from "../../redux/ducks/basket";
import {connect} from "react-redux";
import {fetchOneProduct} from "../../api/products";

class Home extends React.Component {
    onChangeStore = ({ target }) => {
        const { setStore } = this.props;
        setStore(parseInt(target.value));
    }

    onAddToBasket = (productId) => async () => {
        const { setBasket } = this.props;
        const product = await fetchOneProduct(productId);
        product[0].quantity = 0;
        setBasket(product[0]);
    }

    render() {
        const { products, current_store } = this.props.products;
        const stores = products
            .map((product) => {
                return {
                    id: product.store_id,
                    name: product.name
                }
            });
        let distinctStores = [];
        stores.filter(function(item){
            let i = distinctStores.findIndex(x => (x.name == item.name));
            if(i <= -1){
                distinctStores.push(item);
            }
            return null;
        });

        return (
            <>
                <Container className="p-3">
                    <Form className="w-50">
                        Магазин
                        <Form.Select aria-label="Выбор магазина" onChange={this.onChangeStore} value={current_store}>
                            {
                                distinctStores.map((store) =>
                                    <option value={store.id}>{store.name}</option>
                                )
                            }
                        </Form.Select>
                    </Form>
                    <Row xs={1} md={3} className="g-4 mt-2">
                        {
                            products
                                .filter((product) => product.store_id === current_store)
                                .map((product) => {
                                return (
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{product.product_name}</Card.Title>
                                                <div className="d-flex justify-content-between mt-4 align-items-center">
                                                    <Badge bg="secondary">{product.price} ₽</Badge>
                                                    <Button onClick={this.onAddToBasket(product.id)}>В корзину</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </>
        )
    }
}

const mapStateToProps = ({ products }) => {
    return {
        products
    }
}

const actionCreators = {
    setProducts,
    setStore,
    setBasket,
    setQuantity
};

export default connect(
    mapStateToProps,
    actionCreators
)(Home);