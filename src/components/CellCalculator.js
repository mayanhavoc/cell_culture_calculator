import React, { Component } from 'react';
import './CellCalculator.css';

const buildState = () =>  {
    return {
        confluency: 1,
        plates: '',
        well_type: 6,
        result_T75: 0,
        result_T175: 0,
        T75Flasks: 0,
        T175Flasks: 0,
    }
};

class CellCalculator extends Component {
    constructor(props){
        super(props);
        this.state = buildState();
        this.getConfluency = this.getConfluency.bind(this);
        this.getNumPlates = this.getNumPlates.bind(this);
        this.getWellType = this.getWellType.bind(this);
        this.getSolution = this.getSolution.bind(this);
        this.reset = this.reset.bind(this);
    } 
    reset(){
        this.setState(() => buildState());
    }
    getConfluency(evt){
        this.setState({ confluency: JSON.parse(evt.target.value) })
    }
    getNumPlates(evt){
        this.setState({plates: JSON.parse(evt.target.value) });
    }
    getWellType(evt){
        this.setState({ well_type: JSON.parse(evt.target.value) });
    }
    getSolution(evt){
        
        const { confluency, well_type, plates } = this.state;
        console.log(confluency, well_type, plates )

        const get_area_per_well = () => well_type === 6 ? 9.5 : 4;
        
        const area_per_well = get_area_per_well(well_type);

        const cells_in_cm2 = confluency * well_type * area_per_well * plates;
        
        const T75Flasks = Math.ceil(cells_in_cm2/75);
        
        const T175Flasks = Math.ceil(cells_in_cm2/175);
        
        const finalRecipe = well_type * plates * 2;

        const total_cell_area_T75 = T75Flasks * 75;

        const total_cell_area_T175 = T175Flasks * 175;

        const pink_result_T75 = (total_cell_area_T75 * finalRecipe)/cells_in_cm2;

        const pink_result_T175 = (total_cell_area_T175 * finalRecipe)/cells_in_cm2;

        this.setState({
            result_T75: pink_result_T75,
            result_T175: pink_result_T175,
            T75Flasks: T75Flasks,
            T175Flasks: T175Flasks,
        });
        evt.preventDefault();
    }
    render() {
        return (
        <div className="component-wrapper d-flex flex-column justify-content-center align-items-center w-50 mx-auto">
            <div className="container">
                <h1 className="brand">Cell Culture Calculator</h1>
            </div>
            <form className="form-control form-border" onSubmit={this.getSolution}>
                <div className="m-3">
                    <header className="my-5" id="screen">
                        <p className='d-inline'>
                        We will suspend our cells in <mark>{this.state.result_T75}</mark>mL for <mark>{this.state.T75Flasks}</mark>T75 flasks and <mark>{this.state.result_T175}</mark>mL for <mark>{this.state.T175Flasks}</mark> T175 flasks.
                        </p>
                    </header>
                    <div className="row mx-auto">
                        <div className="col-md-6 my-2">
                        <label className="form-label" htmlFor="confluency">When do you need your cells?
                            <select
                            className="form-select" 
                            name="confluency" 
                            id="confluency"
                            value={this.state.confluency}
                            onChange={this.getConfluency}
                            >
                            <option value="1">Today</option>
                            <option value="0.5">Tomorrow</option>
                            <option value="0.25">In 2 days</option>
                            <option value="0.125">In 3 days</option>
                            <option value="0.0625">In 4 days</option>
                        </select>
                        </label>
                        </div>
                        <div className="col-md-6 my-2">
                            <label className="form-label">
                                How many plates do you need?
                                <input
                                placeholder="0"
                                name="plates" 
                                type="text"
                                className="form-control" 
                                value={this.state.plates}
                                onChange={this.getNumPlates} 
                                 />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="m-3">
                    <div className="row mx-auto">
                        <div className="col-md-6 my-2">
                        <label className="form-label" htmlFor="well_type">What type of plate would you like to use?
                        <select
                        className="form-select" 
                        name="well_type" 
                        id="well_type"
                        value={this.state.well_type}
                        onChange={this.getWellType}
                        >
                        <option value="6">6 well plates</option>
                        <option value="12">12 well plates</option>
                        </select>
                        </label>
                        </div>
                    </div>
                </div>
                
                <button className="btn btn-primary my-2 mx-2" type="submit" value="Submit">Submit</button>
                <button className="btn btn-success my-2 ms-2" onClick={this.reset}>Reset</button>
            </form>
        </div>
        )}
}

export default CellCalculator;
