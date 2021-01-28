import React, { Component } from 'react'
import { Col, ListGroup, Row, Badge, Card } from 'react-bootstrap'
import { Rupiah } from '../utilities/rupiah'
import ModalKeranjang from './ModalKeranjang'
import TotalBayar from './TotalBayar'
import axios from 'axios'
import { API_URL } from "../utilities/constant";
import swal from "sweetalert";
import "../overflow.css"

export default class Hasil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
            totalHarga : 0
        }
    }

    handleShow = (keranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: keranjang,
            jumlah : keranjang.jumlah,
            keterangan : keranjang.keterangan,
            totalHarga : keranjang.total_harga,
        })
    }
    handleClose = () => {
        this.setState({
            showModal: false 
        })
    }

    tambah = () => {
        this.setState({
            jumlah : this.state.jumlah+1,
            totalHarga : this.state.keranjangDetail.product.harga*(this.state.jumlah+1)
        })
    }
    kurang = () => {
        if(this.state.jumlah > 0) {
            this.setState({
                jumlah : this.state.jumlah-1,
                totalHarga : this.state.keranjangDetail.product.harga*(this.state.jumlah-1)
            }) 
        }
    }

    changeHandler = (event) => {
        this.setState({
            keterangan : event.target.value,
        })
    }

    submitHandler = (event) =>{
        event.preventDefault();

        const data = {
            jumlah: this.state.jumlah,
            keterangan : this.state.keterangan,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
        };

        axios
            .put(API_URL + "keranjangs/"+this.state.keranjangDetail.id, data)
            .then((res) => {
                swal({
                    title: "Berhasil di Update ",
                    text: data.product.nama,
                    icon: "success",
                    button: false,
                });
                this.handleClose();
        })
    }
    hapusPesanan = (id) =>{
        axios
            .delete(API_URL + "keranjangs/"+id)
            .then((res) => {
                swal({
                    title: "Berhasil di Hapus ",
                    text : "Terhapus",
                    icon: "error",
                    button: false,
                });
                this.handleClose();
            })
    }

    render() {
        // console.log(this.state.keranjangDetail)
        const { keranjangs } = this.props;
        return (
            <Col md={3} mt="2">
                <h4><strong>Hasil</strong></h4>
                <hr />
                <Card className="hasil text-left" style={{height:"500px",overflow:"auto"}} >
                    <ListGroup variant="flush">
                        {keranjangs.map(keranjang => {
                            return (
                                <ListGroup.Item key={keranjang.id} onClick={() => this.handleShow(keranjang)} >
                                    <Row>
                                        <Col md="2">
                                            <h4>
                                                <Badge pill variant="success">{keranjang.jumlah}</Badge>
                                            </h4>
                                        </Col>
                                        <Col md="10" >
                                            <h5>{keranjang.product.nama}</h5>
                                            <p> Rp.{Rupiah(keranjang.product.harga)} </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12" className="float-right text-right" >
                                            <h5> <strong> Rp.{Rupiah(keranjang.total_harga)}</strong> </h5>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        })}

                        <ModalKeranjang handleClose={this.handleClose} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} submitHandler={this.submitHandler} hapusPesanan={this.hapusPesanan} {...this.state} />
                    </ListGroup>
                </Card>
                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        )
    }
} 
