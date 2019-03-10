import Cell from "./cell";

export default class Game {
    constructor(cell){
        this.$table = document.querySelector('table');
        this.$cell = cell;;
        this.move = {
            up: -4,
            left: -1,
            down: 4,
            right: 1
        };
        this.hole = 15;
        this.currentShuffleBoard;
        window.addEventListener("keydown", this.handlePut)
    }
    start(){
        this.randomGenerate();
        this.createCell();
        // this.clickEvents();
    }
    swap(i1, i2) {
        let t =   this.currentShuffleBoard[i1];
        this.currentShuffleBoard[i1] = this.currentShuffleBoard[i2];

        this.currentShuffleBoard[i2] = t;

    }
    isCompleted(){
        return !this.currentShuffleBoard.some(function(item, i) { return item > 0 && item-1 !== i; });
    }
    go(move) {
        const index = this.hole + move;
        if (!this.currentShuffleBoard[index]) return false;
        // не всякое движение вправо-влево допустимо
        if (move === this.move.left || move === this.move.right)
            if (Math.floor(this.hole/4) !== Math.floor(index/4)) return false;
        this.swap(index, this.hole);
        this.hole = index;
        return true;
        }
    randomGenerate(){
        let res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        let shuffleArray = [];
    while (res.length) {
        // console.log(res)
        const randomIndex = Math.round(Math.random() * (res.length - 1));
        const tile = res.splice(randomIndex, 1)[0];

        shuffleArray.push(tile);
    }

    this.currentShuffleBoard = shuffleArray.concat(' ').map((_, i, a) => a.slice(i * 4, i * 4 + 4)).filter((el) => el.length);
    }

    handlePut(e){
        if (this.go(this.move[
            {39: 'left', 37: 'right', 40: 'up', 38: 'down'}[e.keyCode]
            ]))
        {
            this.createCell(); if (this.isCompleted()) {
                this.$table.style.backgroundColor = "gold";
                window.removeEventListener('keydown', arguments.callee); }
        }
    }

    createCell(){

        this.$cell.cell(this.currentShuffleBoard, this.$table);

    }
}