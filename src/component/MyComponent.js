import React, { Component } from 'react'
import axios from 'axios'
// react bootstratp to create design
import { Button, Col, Row, Container, Image, Dropdown } from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class MyComponent extends Component {
    constructor() {
        super()
        this.state = {
            allProducts : [],
            products: [],
            department: null,
            nbrRoom: null,
           
        }
       
    }

    componentDidMount() {
      this.getAllProduct()
    }

    // good = () => {
    //     var olview = new ol.View({ center: [0, 0], zoom: 2 }),
    //         baseLayer = new ol.layer.Tile({ source: new ol.source.OSM() }),
    //         map = new ol.Map({
    //             target: document.getElementById('map'),
    //             view: olview,
    //             layers: [baseLayer]
    //         });

    //     // popup
    //     var popup = new ol.Overlay.Popup();
    //     map.addOverlay(popup);

    //     //Instantiate with some options and add the Control

    //     var geocoder = new Geocoder('nominatim', {
    //         provider: 'osm',
    //         lang: 'en',
    //         placeholder: 'Search for ...',
    //         limit: 5,
    //         debug: false,
    //         autoComplete: true,
    //         keepOpen: true
    //     });
    //     map.addControl(geocoder);

    //     //Listen when an address is chosen
    //     geocoder.on('addresschosen', function (evt) {
    //         console.info(evt);
    //         window.setTimeout(function () {
    //             popup.show(evt.coordinate, evt.address.formatted);
    //         }, 3000);
    //     });
    // }


    getAllProduct = () => {
      axios.get('http://localhost:8000/all')
            .then(res => {
                this.setState({ allProducts: res.data })
            })
    }
    sendFilter = () => {
        axios.post(`http://localhost:8000`, null, {
            params: {
                department: this.state.department,
               // nbrRoom: this.state.nbrRoom,
            }
        })
            .then(response => {
                console.log("response: ", response)
                this.setState({ products: response.data })
            }
                
        )
            // .then(res => { this.setState({ department: null, nbrRoom: null }) })
            .catch(err => console.warn(err));
       
    }
   
    handleChange = (e) => {
        e.preventDefault()
        console.log("select departement", e.target.value)
        this.setState({department: e.target.value})
    }
    handleChangeRoom = (e) => {
        e.preventDefault()
        console.log("select room", e.target.value)
        this.setState({nbrRoom: e.target.value})
    }
    handleChangeLocality= (e) => {
        e.preventDefault()
        console.log("select locality", e.target.value)
    }
    render() {
        
        return (

            <div classeName="appContainer"  >
                <Paper height="200px">

                    <Grid container sm={12} style={{ marginTop: '5%' }}>
                        <Grid item sm={8}>
                            map
                        </Grid>
                        <Grid item sm={4}  >
                            <div>Filters :</div>
                            <div classeName="filter" style={{ height: '100px' }} >
                                <FormControl variant="outlined" >
                                     <InputLabel  id="demo-simple-select-outlined-label">
                                        Departement
                                    </InputLabel>
                                    {this.state.allProducts.results &&
                                        <Select  style = {{width: '150px', height: '50px'}}
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={this.state.departement}
                                        onChange={this.handleChange}
                                        >
                                            {this.state.allProducts.results.map(p =>
                                                <MenuItem value={p.location.department_name}>{p.location.department_name}</MenuItem>
                                            )}
                                     
                                        </Select>}
                                </FormControl>
                            </div>
                            
                                <div classeName="filter">
                                    <FormControl variant="outlined" >
                                        <InputLabel >
                                       rooms
                                    </InputLabel>
                                        <Select  style = {{width: '150px', height: '50px'}}
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={this.state.nbrRoom}
                                            onChange={this.handleChangeRoom}
                                        
                                        >
                                      
                                           <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                         
                                        </Select>
                                    </FormControl>

                                </div>
                            {this.state.allProducts.results &&
                                <div classeName="filter">
                                    <FormControl variant="outlined"  >
                                    
                                        <Select  style = {{width: '150px', height: '50px'}}
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={this.state.locality}
                                            onChange={this.handleChangeLocality}
                                        
                                        >
                                       
                                       {this.state.allProducts.results.map(p => 
                                           <MenuItem value={p.id}>{p.location.zipcode}</MenuItem>
                                        
                                           )}
                                        </Select>
                                    </FormControl>

                                </div>}
                            <div>
                                <Button onClick={this.sendFilter} size="small" color="primary">
                                    Search
                            </Button>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item sm={8}>Image
                          {/* {this.state.produits.results && this.state.produits.results.map(res =>
                            <Image classeName="img" src={res.images[0]} rounded width="50px"  height = "50px" />
                        )} */}
                    </Grid>

                </Paper>

            </div>
            // <Paper width= "500px">
            //     <Grid></Grid>
            // </Paper>
            // <Container width= '500px'>
            //     <Row >
            //         <Col width= "300px" >MAP</Col>
            //         <Col width= "300px" >image
            //             {/* {this.state.produits.results && this.state.produits.results.map(res =>
            //                 <Image classeName="img" src={res.images[0]} rounded />
            //             )} */}
            //         </Col>
            //         </Row>
            //     </Container>

        )
    }

}
