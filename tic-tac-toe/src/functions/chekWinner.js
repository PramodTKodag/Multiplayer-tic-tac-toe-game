import _ from 'lodash'
export const checkWinner = (possibleWin, grids, uuid) => {
    let player1 = [];
    let player2 = [];
    let wins = [];
    let isWinner = false;
    console.log("Possible win");
    possibleWin.map(item => {
        // console.log("Wins");
        // console.log(item);
        wins.push(item)
        item.map(item2 => {
            // console.log(item2);
        })
    })
    grids.map(ggd => {
        // console.log("grids");
        // console.log(ggd);
        if(ggd.owner === uuid){
            // console.log("match");
            player1.push(ggd.name)
        }
    })

    wins.map(winss => {
        const winner = compare(winss, player1);
        console.log(winner);
        if(winner === true){
            isWinner = true;
        }
    })

    return isWinner;
}

const compare = (array1, array2) => {
   return _.isEqual(array1, array2) 
}