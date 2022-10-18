const RDSProps = {
    "instance-type": {type: "radio", choices: {
        Yes: "You've chosen yes",
        No: "No, thank you"
    }},
}

class Something extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "Yes"
        }
    }

    render () {
        return (
            <div>
                <h1>Hello Forms!</h1>
                <div className="float-container">
                    <div className="float-child">
                        <Features selected={this.state.selected} />
                    </div>
                    <div className="float-child">
                        <Terraform message={RDSProps["instance-type"].choices[this.state.selected]} />
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
                <SizeFeature checked={this.props.selected == "Yes"} label="Yes" />
                <SizeFeature checked={this.props.selected == "No "} label="No" />
            </div>
        )
    }
}

class SizeFeature extends React.Component {
    render() {
        return (
            <label>
                <input
                type="radio" value="yes"
                checked={this.props.checked}
                />
                {this.props.label}
            </label>
        )
    }
}

class Terraform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: props.message
        };
    }
    render () {
        return (
            <textarea name="textarea" rows="5" cols="30" 
                value={this.state.message}
                readOnly>
            </textarea>
        )
    }
}

const root = ReactDOM.createRoot(
    document.getElementById('main_container')
);
root.render(<Something />)