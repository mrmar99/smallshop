import React from "react";

import {
    Container,
    Table
} from "react-bootstrap";

import {connect} from "react-redux";
import {fetchOrdersByMonth} from "../../api";

class Report extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: {}
        };
    }

    componentDidMount = async () => {
        const ordersByMonth = await fetchOrdersByMonth();
        this.setState({ orders: ordersByMonth });
    }

    render() {
        const { orders } = this.state;

        return (
            <>
                <Container className="p-3">
                    <h3>Отчет по продажам</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>№ заказа</th>
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th>Номер телефона</th>
                                <th>Магазин</th>
                                <th>Наименование</th>
                                <th>Способ доставки</th>
                                <th>Способ оплаты</th>
                                <th>Стоимость</th>
                                <th>Создан</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            Object.values(orders).map((o) => {
                                return (
                                    <tr>
                                        <td>{o.id}</td>
                                        <td>{o.first_name}</td>
                                        <td>{o.last_name}</td>
                                        <td>{o.number}</td>
                                        <td>{o.store_name}</td>
                                        <td>{o.name}</td>
                                        <td>{o.obtaining_method}</td>
                                        <td>{o.payment_method}</td>
                                        <td>{o.price}</td>
                                        <td>{o.created_at}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user: user.user
    }
}

const actionCreators = {

};

export default connect(
    mapStateToProps,
    actionCreators
)(Report);