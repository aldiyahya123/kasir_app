import React from 'react'
import {Card, Col} from 'react-bootstrap'
import {Rupiah} from '../utilities/rupiah'

const Menu = ({data, masukKeranjang}) => {

    return (
        <Col md="4" className="mb-4" >
            <Card onClick={() => masukKeranjang(data) } style={{cursor:"pointer"}} >
            <Card.Img variant="top" src={"assets/images/" + data.category.nama.toLowerCase()+"/"+data.gambar } />
            <Card.Body>
                <Card.Title>{data.nama}</Card.Title>
                <p>Kode Item : <strong>{data.kode}</strong> </p> 
                <Card.Text>
                    Rp.&nbsp;{Rupiah(data.harga)}
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
    )
}

export default Menu
