import React from "react";

import BasketItems from "../../components/BasketItems/BasketItems";
import BasketOrder from "../../components/BasketOrder/BasketOrder";

import {
    Container
} from "react-bootstrap";

class Basket extends React.Component {
    render() {
        return (
            <Container>
                <BasketItems />
                <BasketOrder />
            </Container>
        )
    }
}

export default Basket;