export default class Cell{
    constructor(index){
        this._index = index;
    }
    cell(content, table){
        // const $container = document.createElement('div');
        // $container.classList.add('game-place');
        // $container.appendChild(table);
        const $tr = document.createElement('tr');
        const $td = document.createElement('td');
        const matrix = [];
        for (let i = 0; i < 4; i += 1) {
            const row = document.createElement('tr');
            matrix[i] = row;
            table.appendChild(row);

            for (let j = 0; j < 4; j += 1) {
                const col = document.createElement('td');
                matrix[i][j] = col;
                matrix[i][j].innerText = content[i][j];
                // content.forEach(i => console.log(i))
                row.appendChild(col);
            }
        }
        matrix.forEach(i => console.log(i))
        return matrix;
    }

}