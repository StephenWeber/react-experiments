class Something extends React.Component {
    render () {
        return (
            <h1>Hello Buttons!</h1>
        )
    }
}

const root = ReactDOM.createRoot(
    document.getElementById('main_container')
);
root.render(<Something />)