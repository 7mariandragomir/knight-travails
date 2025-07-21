class KnightTravails {
    constructor(start, finish) {
        this.start = start;
        this.finish = finish; 
        this.offsets = [ [-2, -1], [-1, -2], [-2, 1], [1, -2], [-1, 2], [2, -1], [1, 2], [2, 1]];
    }


    getMoves(path) {
        if (path.length !== 2) throw new Error('Path must have exactly two coordinates');

        if (Array.isArray(path[0])) {
            path = path.at(-1);
            console.log(`When including a list of paths, last path in list will be used: ${path}`);
        };

        if (typeof(path[0]) !== 'number' || typeof(path[0]) !== 'number') throw new Error('Path must contain only numbers');

        let x = path[0];
        let y = path[1];
        let possibleMoves = [];
        for (let pos of this.offsets) {
            let newX = x + pos[0]; 
            let newY = y + pos[1];

            if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
                possibleMoves.push([newX, newY])
            }
        };

        return possibleMoves;
    }

    findPath(start, finish) {
        if (start[0] === finish[0] && start[1] === finish[1]) return start;

        let queue = [];
        let visited = [];

        queue.push([start]);

        while (queue.length !== 0) {
            let currentPath = queue.shift();
            let currentPosition = currentPath.at(-1);

            if (visited.some(v => v[0] === currentPosition[0] && v[1] === currentPosition[1])) continue;

            visited.push(currentPosition);

            let moves = this.getMoves(currentPosition);

            for (let move of moves) {
                let newPath = [...currentPath, move];

                if (move[0] === finish[0] && move[1] === finish[1]) return newPath;

                queue.push(newPath);
            };
        }

    }

    getKey([x, y]) {
        return x + y;
    }
}

let t = new KnightTravails;

// TEST ONE
console.log(t.findPath([0,0], [7,7])); 

//      0  1  2  3  4  5  6  7
//    ------------------------
// 0 |  S  .  .  .  .  .  .  .
// 1 |  .  .  1  .  .  .  .  .
// 2 |  2  .  .  .  .  .  .  .
// 3 |  .  .  3  .  .  .  .  .
// 4 |  .  .  .  .  4  .  .  .
// 5 |  .  .  .  .  .  .  5  .
// 6 |  .  .  .  .  .  .  .  .
// 7 |  .  .  .  .  .  .  .  F

// TEST TWO
console.log(t.findPath([3,3], [6,7])); 

//      0  1  2  3  4  5  6  7
//    ------------------------
// 0 |  .  .  .  .  .  .  .  .
// 1 |  .  .  .  .  .  .  .  .
// 2 |  .  .  .  .  .  1  .  .
// 3 |  .  .  .  S  .  .  .  .
// 4 |  .  .  .  .  .  .  2  .
// 5 |  .  .  .  .  .  .  .  .
// 6 |  .  .  .  .  .  .  .  F
// 7 |  .  .  .  .  .  .  .  .

// TEST THREE
console.log(t.findPath([1,7], [4,0])); 

//      0  1  2  3  4  5  6  7
//    ------------------------
// 0 |  .  .  .  .  .  1  .  .
// 1 |  .  .  .  2  .  .  .  S
// 2 |  .  3  .  .  .  .  .  .
// 3 |  .  .  .  .  .  .  .  .
// 4 |  F  .  .  .  .  .  .  .
// 5 |  .  .  .  .  .  .  .  .
// 6 |  .  .  .  .  .  .  .  .
// 7 |  .  .  .  .  .  .  .  .

