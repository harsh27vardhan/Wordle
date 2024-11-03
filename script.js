const table = document.getElementById("table");
function startGame(){
    table.innerHTML = "";
    const findingWord = fiveLetterWords[Math.floor(Math.random()*fiveLetterWords.length)]
    console.log(findingWord);
    const allData = [];
    function createTable(){
        for(let i=0;i<5;i++){
            const rowData = [];
            const row = document.createElement("tr");
            row.classList.add("row")
            for(let j=0;j<5;j++){
                const data = document.createElement("td");
                data.classList.add("data","empty");
                row.append(data);
                rowData.push(data);
            }
            table.append(row);
            allData.push(rowData);
        }
        
        return allData;
    }
    
    const elem = createTable();
    table.focus();
    
    let attempt = 0;
    const tryWord = (w)=>{
        for(let i=0;i<5;i++){
            let style = "miss";
            console.log(findingWord[i],w[i]);
            if(findingWord[i] == w[i])  style = "correct";
            else if(findingWord.indexOf(w[i]) >= 0) style = "exists";
            const e = allData[attempt][i];
            e.classList.add(style);
            e.classList.remove("empty");
        }
        attempt++;
        if(w == findingWord)    return "won";
        else if(attempt>=6) return "lost";
    }
    

    let current = "";
    document.addEventListener("keydown",(e)=>{
        const c = e.keyCode;
        const l = current.length;
        if(c==13 && l==5){
            const res = tryWord(current);
            if(res){
                gameOver(`Game Over! You ${res}! The word was ${findingWord}`);
            }
            current = "";
        }
        else if(c==8 && l>0){
            current = current.substr(0,l-1);
            elem[attempt][l-1].innerText = "";
        }
        else if(c>=65 && c<=90 && l<=5){
            if(current.length<5){
                const ch = String.fromCharCode(c);
                current = current + ch;
                elem[attempt][l].innerText = ch;
            }
        }
        if(attempt>=5){
            gameOver(`Game Over! You Lost! The word was ${findingWord}`);
        }
    })
    function gameOver(msg){
        setTimeout(()=>{
            alert(msg);
            window.location.reload();
        },50);
    }
}
startGame();
