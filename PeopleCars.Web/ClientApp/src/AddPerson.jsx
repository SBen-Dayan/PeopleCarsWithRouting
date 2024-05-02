import { Component } from "react"
import axios from "axios";
import withRouter from "./WithRouter";

class AddPerson extends Component {
    state = {
        person : {
            firstName : '',
            lastName : '',
            age : ''
        }
    }

    onSubmitClick = async() => {
        await axios.post('/api/people/addperson', {...this.state.person});
        this.props.navigate(('/'));
    }

    render() {
        const {firstName, lastName, age} = this.state.person;
        const {person} = this.state;
        return(<>
            <div className="row">
                <div className="col-md-6 offset-md-3 card bg-light p-4">
                    <h2>Add a New Person</h2>
                    <input type="text" className="form-control" name="firstName" placeholder="First Name"
                    value={firstName} onChange={({target : {value}}) => this.setState({person : {...person, firstName : value }})}/>
                    <br/>
                    <input type="text" className="form-control" name="lastName" placeholder="Last Name"
                    value={lastName} onChange={({target : {value}}) => this.setState({person : {...person, lastName : value }})}/>
                    <br/>
                    <input type="text" className="form-control" name="age" placeholder="Age" 
                    value={age} onChange={({target : {value}}) => this.setState({person : {...person, age : value }})}/>
                    <br/>
                    <button className="btn btn-primary btn-lg btn-block" onClick={this.onSubmitClick}>Submit</button>
                </div>
             </div>
        </>)
    }
}

export default withRouter(AddPerson); 