import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Rupiah } from '../utilities/rupiah'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'

const ModalKeranjang = ({ showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah,kurang, changeHandler, submitHandler, totalHarga, hapusPesanan }) => {
    if (keranjangDetail) {
        return (
            <div>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {keranjangDetail.product.nama}
                            <strong className="ml-2" >Rp. {Rupiah(keranjangDetail.product.harga)}</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Total Harga :</Form.Label>
                                <br/>
                                <strong>Rp. {Rupiah(totalHarga)}</strong>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Jumlah :</Form.Label>
                                <Button variant="primary" size="sm" className="mr-3 ml-3 " onClick={() => kurang()} > 
                                    <FontAwesomeIcon icon={faMinus} /> 
                                </Button>
                                <strong>{jumlah}</strong>
                                <Button variant="primary" size="sm" className="ml-3" onClick={() => tambah()}>
                                    <FontAwesomeIcon icon={faPlus} /> 
                                </Button>
                                
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Keterangan</Form.Label>
                                <Form.Control as="textarea" rows={3} name="keterangan" placeholder="Pedas sekali" value={keterangan} onChange={(event) => changeHandler(event) } />
                            </Form.Group>
                            <Button variant="primary" block type="submit" > Simpan </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
                            <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    } else {
        return (
            <div>

            </div>
        )
    }
};

export default ModalKeranjang;
