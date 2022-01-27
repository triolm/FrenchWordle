var resWord = "aaaaa";

(async () => {
    resWord = await axios.get("./getword")
    resWord = resWord.data
})()

const Square = ({ letter, correctness }) => {
    return <div className={"c" + correctness}><span>{letter}</span></div>
}

const Row = ({ letters, word }) => {
    let correctness;
    return (
        <div className="row">
            {
                letters.map((item, i) => (
                    correctness = item && word.includes(item.normalize("NFD").replace(/\p{Diacritic}/gu, "")) ? 1 : 0,
                    correctness = word[i] == letters[i].normalize("NFD").replace(/\p{Diacritic}/gu, "") ? 2 : correctness,
                    <Square word={word} key={i} letter={item} correctness={correctness} />
                ))
            }
        </div>
    )
}

const Guess = ({ count, grid, setCount }) => {
    return (
        <form>
            <input id="input"></input>
            <button onClick={(e) => {
                e.preventDefault()
                if (document.getElementById('input').value.length == 5 && count < grid.length) {
                    grid[count] = document.getElementById('input').value.split('')
                    document.getElementById('input').value = ""
                    setCount(count + 1)
                }
            }} >Guess</button>
        </form>
    )
}

const Grid = () => {
    const word = resWord.normalize("NFD").replace(/\p{Diacritic}/gu, "").split('')
    const letters = 5;
    const rows = 6;
    const letterGrid = [];
    for (var i = 0; i < rows; i++) {
        letterGrid.push([])
        for (var j = 0; j < letters; j++) {
            letterGrid[i].push("")
        }
    }
    const [count, setCount] = React.useState(0);
    const [grid, setGrid] = React.useState(letterGrid);
    console.log(grid, count, word);

    if (count && JSON.stringify(word) == JSON.stringify(grid[count - 1]).normalize("NFD").replace(/\p{Diacritic}/gu, "")) {
        alert("correct")
        grid[count - 1] = resWord.split("");
    }
    else
        if (grid[rows - 1][0]) {
            alert('the word was ' + resWord);
            grid.push(resWord.split(''));
        }
    return (
        <div className="grid">
            {
                grid.map((item, i) => (
                    <Row key={i} letters={item} word={word} />
                ))
            }
            <Guess count={count} grid={grid} setCount={setCount} />
        </div>
    )
}

function App() {
    return (
        <div>
            <Grid />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));

