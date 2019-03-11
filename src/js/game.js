
export default class Game {
    constructor(cell){
        this.$startButton = document.querySelector('#start-button');
        this.$table = document.querySelector('table');
        this.$cell = cell;
        this.move = {
            up: -4,
            left: -1,
            down: 4,
            right: 1
        };
        this.hole = 15;
        this.currentShuffleBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ' '];
        this.matrix = this.$cell.cell();
        window.addEventListener("keydown", this.handlePut.bind(this));
        this.$table.addEventListener('click', this.handleClick.bind(this));
        this.$startButton.addEventListener('click', this.handleStart.bind(this))
    }
    start(){
        this.matrix.forEach(i => this.$table.appendChild(i));

        this.createCell();
    }
    handleStart(){
        this.$table.style.backgroundColor = 'transparent';
        this.currentShuffleBoard = this.randomGenerate();
        this.start()
    }
    swap(i1, i2) {
        let t =   this.currentShuffleBoard[i1];
        this.currentShuffleBoard[i1] = this.currentShuffleBoard[i2];

        this.currentShuffleBoard[i2] = t;

    }
    isCompleted(){
        return !this.currentShuffleBoard.some(function(item, i) { return item > 0 && item-1 !== i; });
    }
    completeMessage(callback){
        if (callback) {
            this.$table.style.backgroundColor = "gold";
            window.removeEventListener('keydown', this.handlePut.bind(this));
            this.$table.removeEventListener('click', this.handleClick.bind(this));
        }
    }
    moving(move) {
        const index = this.hole + move;
        // console.log(this.currentShuffleBoard)
        // console.log(this.currentShuffleBoard[index])
        if (!this.currentShuffleBoard[index]) return false;
        // не всякое движение вправо-влево допустимо
        if (move === this.move.left || move === this.move.right){
            if (Math.floor(this.hole/4) !== Math.floor(index/4)) return false;
        }
        console.log('sdf');
        this.swap(index, this.hole);
        this.hole = index;
        return true;
        }
    randomGenerate(){
        let res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        let shuffleArray = [];
    while (res.length) {
        const randomIndex = Math.round(Math.random() * (res.length - 1));
        const tile = res.splice(randomIndex, 1)[0];

        shuffleArray.push(tile);
    }

    this.currentShuffleBoard = shuffleArray.concat(' ');
    return shuffleArray.concat(' ');
    }

    handlePut(e){
        if (this.moving(this.move[
            {39: 'left', 37: 'right', 40: 'up', 38: 'down'}[e.keyCode]
            ]))
        {
            this.createCell();
            this.completeMessage(this.isCompleted());
        }
    }
    checkForClick(x, y){
        if((x+1) < 4 && !this.$table.rows[x+1].cells[y].innerText){
            this.moving(this.move.up);
            this.createCell();
            this.completeMessage(this.isCompleted());

        }
        if((x-1) >= 0 && !this.$table.rows[x-1].cells[y].innerText ){
            this.moving(this.move.down);
            this.createCell();
            this.completeMessage(this.isCompleted());
        }
        if((y+1) < 4 && !this.$table.rows[x].cells[y+1].innerText){
            this.moving(this.move.left);
            this.createCell();
            this.completeMessage(this.isCompleted());
        }
        if((y-1) >= 0 && !this.$table.rows[x].cells[y-1].innerText){
            this.moving(this.move.right);
            this.createCell();
            this.completeMessage(this.isCompleted());
        }
    }
    handleClick(e){

        let y = e.target.cellIndex;
        let x = e.target.parentNode.rowIndex;
        console.log(this.$table.rows[x].cells[y].innerText);
        console.log(x + ' ' + y);
        console.log(this.$table.rows[x].cells[y]);

        this.checkForClick(x, y);

    }
    createCell(){
        for (let i = 0; i < 4; i += 1) {
            for (let j = 0; j < 4; j += 1) {
                this.matrix[i][j].innerText = this.currentShuffleBoard.map((_, i, a) => a.slice(i * 4, i * 4 + 4)).filter((el) => el.length)[i][j]
            }
        }
    }

}