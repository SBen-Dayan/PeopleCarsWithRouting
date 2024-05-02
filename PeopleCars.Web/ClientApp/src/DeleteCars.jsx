import { Component, Fragment } from "react"
import axios from "axios"
import withRouter from "./WithRouter"

class DeleteCars extends Component {
    state = {
        cars: []
    }

    componentDidMount = async () => {
        const { data } = await axios.get(`/api/car/carsForPerson?id=${this.props.params.personid}`);
        this.setState({ cars: data });
    }

    onYesClick = () => {
        const id = +this.props.params.personid;
        axios.post('/api/car/deleteCarsForPerson', { id });
        this.return();
    }

    return = () => this.props.navigate('/')

    renderTable = () => {
        const { cars } = this.state
        return (<>
            <div style={{ backgroundColor: 'white', minHeight: 1000, paddingTop: 10 }}>
                <div className="row mt-5">
                    <div className="col-md-12">
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map(this.renderRow)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Are you sure you want to delete all of these cars?</h3>
                    </div>
                    <div className="col-md-6 mt-2">
                        <a href="/" style={{ textdecoration: 'none' }}>
                            <button onClick={this.return} className="btn btn-primary btn-lg w-100">
                                No
                            </button>
                        </a>
                    </div>
                    <div className="col-md-6 mt-2">
                        <button onClick={this.onYesClick} className="btn btn-danger btn-lg w-100">
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </>)
    }


    renderRow = ({ id, make, model, year }) =>
        <Fragment key={id}>
            <tr>
                <td>{make}</td>
                <td>{model}</td>
                <td>{year}</td>
            </tr>
        </Fragment>

    render() {
        const { cars } = this.state;
        return (
            (cars.length && this.renderTable()) || <h1 className="text-center mt-4">No cars yet!</h1>
        )
    }
}

export default withRouter(DeleteCars);