import React, { Component } from "react";
import { Hasil, ListCategories, Menu } from "../components/index";
import { Row, Col, Container } from "react-bootstrap";
import { API_URL } from "../utilities/constant";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: [],
            selectedCategory: "Makanan",
            keranjangs: [],
        };
    }

    componentDidMount() {
        axios
            .get(API_URL + "products?category.nama=" + this.state.selectedCategory)
            .then((res) => {
                this.setState({
                    menus: res.data,
                });
            })
            .catch((err) => console.log("error 404" + err));

        // show keranjangs
        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data;
                this.setState({ keranjangs });
            })
            .catch((err) => console.log("error 404" + err));
    }

    componentDidUpdate(prevState) {
        if (this.state.keranjangs !== prevState.keranjangs) {
            // show keranjangs
            axios
                .get(API_URL + "keranjangs")
                .then((res) => {
                    const keranjangs = res.data;
                    this.setState({ keranjangs });
                })
                .catch((err) => console.log("error 404" + err));
        }
    }

    changeCategory = (value) => {
        this.setState({
            menus: [],
            selectedCategory: value,
        });

        axios
            .get(API_URL + "products?category.nama=" + value)
            .then((res) => {
                this.setState({
                    menus: res.data,
                });
            })
            .catch((err) => console.log("error 404" + err));
    };

    masukKeranjang = (value) => {
        axios
            .get(API_URL + "keranjangs?product.id=" + value.id)
            .then((res) => {
                if (res.data.length === 0) {
                    const keranjang = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value,
                    };

                    axios
                        .post(API_URL + "keranjangs", keranjang)
                        .then((res) => {
                            swal({
                                title: "Berhasil masuk keranjang",
                                text: keranjang.product.nama,
                                icon: "success",
                                button: false,
                            });
                        })

                        .catch((err) => console.log("error 404" + err));
                } else {
                    const keranjang = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + value.harga,
                        product: value,
                    };

                    axios
                        .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
                        .then((res) => {
                            swal({
                                title: "Berhasil masuk keranjang",
                                text: keranjang.product.nama,
                                icon: "success",
                                button: false,
                            });
                        });
                }
            })
            .catch((err) => console.log("error 404" + err));
    };

    render() {
        return (
            <div className="App">
                <div className="mt-3">
                    <Container fluid>
                        <Row>
                            <ListCategories
                                changeCategory={this.changeCategory}
                                selectedCategory={this.state.selectedCategory}
                            />
                            <Col>
                                <h4>
                                    <strong>Daftar Produk</strong>
                                </h4>
                                <hr />
                                <Row>
                                    {this.state.menus.map((menu) => {
                                        return (
                                            <Menu
                                                data={menu}
                                                key={menu.id}
                                                masukKeranjang={this.masukKeranjang}
                                            />
                                        );
                                    })}
                                </Row>
                            </Col>
                            <Hasil keranjangs={this.state.keranjangs} {...this.props} />
                        </Row>
                    </Container>
                </div>
            </div>
        ); 
    }
}
