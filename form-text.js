const RDSProps = {
    "instance-type": {type: "radio", choices: {
        Yes: "You've chosen yes",
        No: "No, thank you"
    }},
}

class Something extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selected: "Yes",
            message: RDSProps["instance-type"].choices["Yes"]
        }
    }

    handleChange(event) {
        this.setState({
            selected: event,
            message: RDSProps["instance-type"].choices[event]
        })
    }

    render () {
        return (
            <div>
                <h1>Hello Forms!</h1>
                <div className="float-container">
                    <div className="float-child">
                        <Features selected={this.state.selected} onChange={this.handleChange}/>
                    </div>
                    <div className="float-child">
                        <Terraform message={this.state.message} />
                    </div>
                </div>
            </div>
        )
    }
}

class Features extends React.Component {
    render () {
        return (
            <div>
                <SizeFeature checked={this.props.selected == "Yes"} label="Yes" onChange={this.props.onChange} />
                <SizeFeature checked={this.props.selected == "No"} label="No" onChange={this.props.onChange} />
            </div>
        )
    }
}

class SizeFeature extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onChange(e.target.value);
    }
    render() {
        return (
            <label>
                <input
                type="radio" value={this.props.label}
                onChange={this.handleChange}
                checked={this.props.checked}
                />
                {this.props.label}
            </label>
        )
    }
}

class Terraform extends React.Component {
    render () {
        return (
            <textarea name="textarea" rows="5" cols="30" 
                value={this.props.message}
                readOnly>
            </textarea>
        )
    }
}

const root = ReactDOM.createRoot(
    document.getElementById('main_container')
);
root.render(<Something />)