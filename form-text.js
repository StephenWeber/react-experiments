const RDSProps = {
    "instance-type": {type: "radio", choices: {
        Intel: "db.r5.8xlarge",
        Graviton: "db.r6i.8xlarge"
    }},
}

const tfTemplate = `resource "aws_rds_cluster" "example" {
    cluster_identifier        = "example"
    availability_zones        = ["us-west-2a", "us-west-2b", "us-west-2c"]
    engine                    = "mysql"
    db_cluster_instance_class = "INSTANCE_TYPE"
    storage_type              = "io1"
    allocated_storage         = 100
    iops                      = 1000
    master_username           = "test"
    master_password           = "mustbeeightcharaters"
}`

class Something extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selected: "Default",
            message: tfTemplate
        }
    }

    handleChange(event) {
        this.setState({
            selected: event,
            message: tfTemplate.replace("INSTANCE_TYPE", RDSProps["instance-type"].choices[event])
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
                {Object.keys(RDSProps["instance-type"].choices).map((item, index) => {
                    return <SizeFeature checked={this.props.selected == item} label={item} onChange={this.props.onChange}/>
                })}
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