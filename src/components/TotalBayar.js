import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Rupiah } from '../utilities/rupiah'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {API_URL} from '../utilities/constant'

export default class TotalBayar extends Component {

    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar : totalBayar,
            menus: this.props.keranjangs,
        }

        axios
            .post(API_URL+"pesanans", pesanan)
            .then(res => {
                
                this.props.history.push("/sukses");
            })

    }

    render() {
        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga
        }, 0)
        return (
            <div className="fixed-bottom">
                <div>
                    <Row>
                        <Col md={{ offset: 9 }} className="pb-2 bg-light" >
                            <hr />
                            <h5>Total Harga: <strong className="ml-1 float-right">Rp.{Rupiah(totalBayar)}</strong></h5>
                            <Button className="" block onClick={() => this.submitTotalBayar(totalBayar)}><FontAwesomeIcon className="mr-2" icon={faShoppingCart}  /> <strong>Bayar</strong> </Button>
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }
}
