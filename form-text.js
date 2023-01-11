const RDSProps = {
    "instance-type": {
        type: "radio", 
        label: "Instance Class",
        template: "INSTANCE_TYPE",
        choices: {
            Intel: "db.r5.8xlarge",
            Graviton: "db.r6i.8xlarge"
    }},
    "allocated-storage": {
        type: "radio",
        label: "Initial Storage",
        template: "ALLOCATED_STORAGE",
        choices: {
            '100GiB': "100",
            '1000GiB': "1000"
    }},
}

const tfTemplate = `resource "aws_rds_cluster" "example" {
    cluster_identifier        = "example"
    availability_zones        = ["us-west-2a", "us-west-2b", "us-west-2c"]
    engine                    = "aurora-postgresql"
    db_cluster_instance_class = "INSTANCE_TYPE"
    storage_type              = "io1"
    allocated_storage         = ALLOCATED_STORAGE
    iops                      = 1000
    master_username           = "test"
    master_password           = "mustbeeightcharaters"
}`

class Something extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selected: {},
            message: tfTemplate
        }
    }

    componentDidMount() {
        this.handleChange({"instance-type":"Intel", "allocated-storage":"100GiB"});
    }

    handleChange(event) {
        let newselected = {...this.state.selected, ...event}

        let newmsg = tfTemplate;
        Object.keys(newselected).map((item, index) => {
            let v = newselected[item]
            newmsg = newmsg.replace(RDSProps[item].template, RDSProps[item].choices[v]);
        });


        this.setState({
            selected: newselected,
            message: newmsg // tfTemplate.replace("INSTANCE_TYPE", RDSProps[event.source].choices[event.target.value])
        })
    }

    render () {
        return (
            <div>
                <h1>Terraform Templating forms</h1>
                <p>Below is a form that provides default options for a Terraform module.</p>
                <p>The text on the right changes based on your choices, and is intended to be copied into your service's repo.</p>
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
                <h2>{RDSProps["instance-type"].label}</h2>
                <div>
                {Object.keys(RDSProps["instance-type"].choices).map((item, index) => {
                    return <SizeFeature checked={this.props.selected["instance-type"] == item} label={item} onChange={this.props.onChange} key={index} parent="instance-type" />
                })}
                </div>
                <h2>{RDSProps["allocated-storage"].label}</h2>
                <div>
                {Object.keys(RDSProps["allocated-storage"].choices).map((item, index) => {
                    return <SizeFeature checked={this.props.selected["allocated-storage"] == item} label={item} onChange={this.props.onChange} key={index} parent="allocated-storage"/>
                })}
                </div>
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
        let p = this.props.parent;
        let ne = {};
        ne[p] = e.target.value
        this.props.onChange(ne);
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
            <textarea name="textarea" rows="12" cols="80" 
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