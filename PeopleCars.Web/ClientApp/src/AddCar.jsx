import { Component } from "react"
import withRouter from "./WithRouter";
import axios from "axios";

class AddCar extends Component {
    state = {
        person : {
            firstName : '',
            lastName : ''
        },
        car : {
            make : '',
            model : '',
            year : ''
        }
    }

    onTextChange = ({target : {name, value}}) => {
        const car = {...this.state.car};
        car[name] = value;
        this.setState({car});
    }

    componentDidMount = async() => {
        const {data} = await axios.get(`/api/people/getperson?id=${this.props.params.personid}`);
        this.setState({person :{...data}});
    }

    render() {
        const {firstName, lastName} = this.state.person;
        const {make, model, year} = this.state.car;
        const {car} = this.state;
        const personId = this.props.params.personid;
        return(<>
        <div className="row">
            <div className="col-md-6 offset-md-3 card bg-light p-4">
                <h2>Add a car for {firstName} {lastName}</h2>
                <input type="text" className="form-control" name="make" placeholder="Make"
                 value={make} onChange={this.onTextChange}/>
                <br/>
                <input type="text" className="form-control" name="model" placeholder="Model"
                 value={model} onChange={this.onTextChange}/>
                <br/>
                <input type="text" className="form-control" name="year" placeholder="Year" 
                value={year} onChange={this.onTextChange}/>
                <br/>
                <button onClick={() => {axios.post('/api/car/addcar', {...car, personId}); this.props.navigate(('/'));}}
                 className="btn btn-primary btn-lg btn-block">Submit</button>
            </div>
        </div>
        </>)   
    }
}

export default withRouter(AddCar); 