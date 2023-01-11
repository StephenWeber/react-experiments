class Something extends React.Component {
    render () {
        return (
            <div>
                <h1>Naya:</h1>
                <RenderColors colors={tally(["Naya"])} />
                <h1>Naya Bant:</h1>
                <RenderColors colors={tally(["Naya","Bant"])} />
            </div>
        );
    }
}

const ShardToGuild = {
    "Bant": ["g","w","u"],
    "Esper": ["w","u","b"],
    "Grixis": ["u","b","r"],
    "Jund": ["b","r","g"],
    "Naya": ["r","g","w"],
    "Abzan": ["w","b","g"],
    "Jeskai": ["u","r","w"],
    "Mardu": ["r","w","b"],
    "Temur": ["g","u","r"],
}

function tally(decks) {
    let colors = {
        "w": 0,
        "u": 0,
        "b": 0,
        "r": 0,
        "g": 0,
    }

    for (const d of decks) {
        for (const c of ShardToGuild[d]) {
            colors[c]++;
        }
    }

    return colors
}

//{c}: {colors[c]}

function RenderColors(props) {
    const colors = props.colors
    const listItems = Object.keys(colors).map((c,i) => {
        return (
            <li key={i} >
                {c}: {colors[c]}
            </li>
        );
    });
    return (
        <ul>{listItems}</ul>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('main_container')
);
root.render(<Something />)