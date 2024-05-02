import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Home extends Component {
    state = {
        people: [],
        searchText: ''
    }

    renderTable = () => {
        const { people, searchText } = this.state;
        const lowerText = searchText;
        return (<>
            <table className="table table-bordered table-hover mt-5">
                <thead>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Age</td>
                        <td>Car Count</td>
                        <td>Add Car</td>
                        <td>Delete Cars</td>
                    </tr>
                </thead>
                <tbody>
                    {people.map(p => {
                        if (p.firstName.toLowerCase().includes(lowerText) || !searchText) {
                            return this.renderRow(p)
                        }
                    }
                    )}
                </tbody>
            </table>
        </>)
    }

    renderRow = ({ id, firstName, lastName, age, carCount }) =>
        <React.Fragment key={id}>
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td>{carCount}</td>
                <td><Link to={`/addcar/${id}`} className="btn btn-primary">Add Car</Link></td>
                <td><Link to={`/deletecars/${id}`} className="btn btn-danger">Delete Cars</Link></td>
            </tr>
        </React.Fragment>

    componentDidMount = async () => {
        let { data } = await axios.get('/api/people/getall');
        data = data.map(async person => {
            const result = await axios.get(`/api/car/carCountForPerson?id=${person.id}`);
            return { ...person, carCount: result.data };
        })
        const people = await Promise.all(data);
        this.setState({ people });
    }

    render() {
        const { people, searchText } = this.state;
        return (<>
            <div className="row mt-5">
                <div className="col-md-10">
                    <input type="text" className="form-control form-control-lg" placeholder="Search People"
                        value={searchText} onChange={({ target: { value } }) => this.setState({ searchText: value })} />
                </div>
                <div className="col-md-2">
                    <button onClick={() => this.setState({ searchText: '' })} className="btn btn-dark btn-lg w-100">Clear</button>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <a href="/addperson" style={{ textDecoration: 'none' }}>
                        <button className="btn btn-success btn-lg w-100">Add Person</button>
                    </a>
                </div>
            </div>
            {(people.length && this.renderTable()) || <h1 className="mt-4">add some people!</h1>}
        </>)
    }
}