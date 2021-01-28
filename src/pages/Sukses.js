import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {API_URL} from '../utilities/constant'
import axios from 'axios'

export default class Sukses extends Component {

    componentDidMount() {
        axios
        .get(API_URL + "keranjangs")
        .then((res) => {
            const keranjangs = res.data;
            keranjangs.map(keranjang => {
                return(
                    axios.delete(API_URL+"keranjangs/"+keranjang.id)
                    .then(res => {
                        console.log(res)
                    })
                )
            })
        })
        .catch((err) => console.log("error 404" + err));
    }

    render() {
        return (
            <div className="mt-4 text-center">
                <img src="assets/images/sukses.svg" width="300" className="mb-5" alt=""/>
                <h2>Pesanan Sukses</h2>
                <p>Terima Kasih sudah memesan</p>
                <Button variant="primary" as={Link} to="/" >Kembali</Button>
            </div>
        )
    }
}
