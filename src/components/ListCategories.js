import React, { Component } from 'react'
import {Col, ListGroup} from 'react-bootstrap'
import axios from 'axios'
import {API_URL} from '../utilities/constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

const Icon = (props) => {
    const {nama} = props;

    // alert(nama)

    if(nama === "Makanan") {
        return (
                <FontAwesomeIcon icon={faUtensils} className="mr-2" />
        )
    } else if(nama === "Minuman") {
        return (
                <FontAwesomeIcon icon={faCoffee} className="mr-2" />
        )
    } else if(nama === "Cemilan") {
        return(
                <FontAwesomeIcon icon={faCheese} className="mr-2" />
        )
    } else {
        return (
            <div></div>
        )
    }

}

export default class listCategories extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            categories : []
        }
    }
    
    componentDidMount() {
        axios 
            .get(API_URL+"categories")
            .then(res => {
                this.setState({
                    categories : res.data,
                })
            })
            .catch(err=>console.log("error 404" + err))
    }

    render() {
        // console.log(this.props)
        return (
            <Col md={2} mt="2">
                <h4><strong>Daftar Kategori</strong></h4>
                <hr/>
                <ListGroup>
                    {this.state.categories.map(category => {
                        return (
                            <ListGroup.Item 
                                key={category.id} 
                                onClick={() => this.props.changeCategory(category.nama)} 
                                className={ this.props.selectedCategory === category.nama ? 'bg-primary text-white' : "" }
                                style={{cursor:"pointer"}} 
                                >
                                <h5> <Icon nama={category.nama} /> {category.nama}</h5> 
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Col>
        )
    }
}
