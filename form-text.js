class Something extends React.Component {
    render () {
        return (
            <div>
                <h1>Hello Forms!</h1>
                <div className="float-container">
                    <div className="float-child">
                        <Features />
                    </div>
                    <div className="float-child">
                        <Terrafrom />
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
                <SizeFeature checked={true} />
                <label><input type="radio" name="radio" value="no" /> No</label>
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
                Yes
            </label>
    )
}
}

class Terrafrom extends React.Component {
    render () {
        return (
            <textarea name="textarea" rows="5" cols="30" 
                value="I am a read-only textarea."
                readOnly>
            </textarea>
        )
    }
}

const root = ReactDOM.createRoot(
    document.getElementById('main_container')
);
root.render(<Something />)