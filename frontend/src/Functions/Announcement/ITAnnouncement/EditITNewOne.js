import React, { Component } from 'react'
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default class EditProducts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productName : "", 
            topic : "", 
            quantity : "",
            description : "", 
            productCategory : "", 
            availability : "",
            price : "", 
            image : "", 
        }
    }

    handleInputChange = (e)=>{
        const{name,value} = e.target;
        this.setState({
           ...this.state,
           [name]:value
        })
    }

    onSubmit = (e)=>{
        e.preventDefault();
        const id = this.props.match.params.id;
        const{productName, topic, quantity, description, productCategory, availability, price, image} = this.state;
       
        const data = {
            productName:productName,
            topic:topic, 
            quantity:quantity,
            description:description,
            productCategory:productCategory,
            availability:availability,
            price:price, 
            image:image,
        }
        console.log(data);

        //________________validate inputs_____________________
        var numbers = /^[0-9.]+$/;
                      
        if(!this.state.productName || !this.state.topic || !this.state.quantity || !this.state.description|| !this.state.productCategory || !this.state.availability || !this.state.price){
            // || !this.state.image

            if(!this.state.productName){
                toast.error('Please Enter Product Name', {
                    position: "bottom-right",
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }

            if(!this.state.topic){
                toast.error('Please Enter Topic', {
                    position: "bottom-right",
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }

            if(!this.state.quantity){
                toast.error('Please Enter Quantity', {
                    position: "bottom-right",
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });                            
            }

            if(!this.state.description){
                toast.error('Please Enter Description', {
                    position: "bottom-right",
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }

            if(!this.state.productCategory){
                toast.error('Please Select Product Category', {
                    position: "bottom-right",
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }

            if(!this.state.availability){
                toast.error('Please select availability', {
                    position: "bottom-right",
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }



            if(!this.state.price){
                toast.error('Please Enter Product Price', {
                    position: "bottom-right",
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }            

            // if(!this.state.image){
            //     toast.error('Please choose Image', {
            //         position: "bottom-right",
            //         autoClose: 6000,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         }); 
            // }
            
            else if(!quantity.match(numbers)){
                toast.error('Cost Allowed  Positive Numbers Only', {
                    position: "bottom-right",
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }); 
             }

             else if(!price.match(numbers)){
                toast.error('Cost Allowed  Positive Numbers Only', {
                    position: "bottom-right",
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }); 
             }

            else if(price <= 0 ){
                toast.error('Please Enter Valid Amount', {
                    position: "bottom-right",
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });  
            }
        }

        else{
            axios.put(`http://localhost:8070/product/update/${id}`, data).then((res) => {
            if (res.data.success) {
                toast.success('Product Updated Successfully',{position:toast.POSITION.TOP_CENTER});
                this.setState({
                    productName : "", 
                    topic : "", 
                    quantity : "",
                    description : "", 
                    productCategory : "", 
                    availability : "",
                    price : "", 
                    image : "",  
                })
            }
        }).catch(() => {
            toast.error('Submited Unsuccessfully',{position:toast.POSITION.TOP_CENTER});
        })
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        
        axios.get(`http://localhost:8070/product/display/${id}`).then((res) => {
            if(res.data.success) {
                this.setState({
                    productName : res.data.products.productName, 
                    topic : res.data.products.topic, 
                    quantity : res.data.products.quantity,
                    description : res.data.products.description, 
                    productCategory : res.data.products.productCategory, 
                    availability : res.data.products.availability,
                    price : res.data.products.price, 
                    image : res.data.products.image, 
                });
                console.log(this.state.products);
            }
        });
    }

    render() {
        return (
            <div align="center">
            <div className="card shadow rounded mb-8 w-50 bg-white">
            <div className="card-header py-3 ">
            <div className="card-header text-white" style={{background: "#000"}}><h2>UPDATE PRODUCT</h2></div>
            <br/> <form className="row g-3" >
        
            <div className="mb-3">
            <label style={{marginBottom:'5px'}} className="form-label"  Required="required"> Product Name </label>
            <input type="text" className="form-control" name="productName" placeholder="Enter Product Name" Required = "required"
                value={this.state.productName}
                onChange={this.handleInputChange} />
            </div>

            <div className="mb-3">
            <label style={{marginBottom:'5px'}} className="form-label">Topic</label>
            <input type="text" className="form-control" name="topic" placeholder="Enter Original Title" value={this.state.topic}
                onChange={this.handleInputChange}/>
            </div>
    
            <div className="col-md-6">
            <label style={{marginBottom:'5px'}} className="form-label">Quantity </label>
            <input type="number" className="form-control" name="quantity" placeholder="Enter Quantity" Required = "required" 
                value={this.state.quantity } 
                onChange={this.handleInputChange} />
            </div>
    
            <div className="col-md-6">
            <label style={{marginBottom:'5px'}} className="form-label"  Required="required">Price</label>
            <input type="number" className="form-control" name="price" placeholder="Enter Product Price" Required = "required" value={this.state.price}
                onChange={this.handleInputChange}/>
            </div>

            <div className="col-md-6">
            <label style={{marginBottom:'5px'}} className="form-label">Availability</label>
            <select className="form-control" name="availability"  value={this.state.availability}
                onChange={this.handleInputChange} maxLength ="1000" required>
                <option value="">Enter Availability</option>
                <option value="yes">In Stock</option>
                <option value="no">Out Of Stock</option>
            </select>
            </div>

            <div className="col-md-6">
          <label style={{marginBottom:'5px'}} className="form-label">Category</label>
          <select className="form-control" name="productCategory" placeholder="Enter Product Category" value={this.state.productCategory}
              onChange={this.handleInputChange} required>
                 <option value="">Enter Product Category</option>
                 <option value="6 Month">Books</option>
                 <option value="8 Month">Computers</option>
                 <option value="1 Year">Electronics</option>
                 <option value="Men's Fashion">Men's Fashion</option>
                 <option value="Women's Fashion">Women's Fashion</option>
                 <option value="Others">Others</option>
                 
          </select>
          </div>

            <div className="mb-3">
            <label style={{marginBottom:'5px'}} className="form-label">Description</label>
            <textarea type="text"className="form-control" name="description" placeholder="Enter Description" value={this.state.description}
                onChange={this.handleInputChange} maxLength ="1000"required/>
            </div>

            <div>
            <FileBase64 type="file" name="image" multiple={ false } onDone={({ base64 }) => this.setState({ image: base64 })}/>
            </div>
   
            <button className="btn btn-primary" type="submit" style={{marginBottom:'5px'}} onClick={this.onSubmit}>
                &nbsp; Update
            </button>
        </form>
        </div>
        </div>
        </div>

        )
    }

}