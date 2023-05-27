let vertexIndex: number[][] = [];

export function addEdge(adj: number[][], u: number, v: number){
    adj[u].push(v);
}

//Check if a vertex is in the grid, if it is return its index in the vertexIndex array
//If it is not in the grid, return -1
export function findVertexIndex (vertexIndex: number[][], row: number, col: number){
    for (let i = 0; i < vertexIndex.length; i++){
        if (vertexIndex[i][0] === row && vertexIndex[i][1] === col){
            return i;
        }
    }
    return -1;
}
//# is wall, . is empty, A is start, B is destination
//every . and A or B are considered a vertex
export default function getAdjacencyList (graph: number[][]){
    //number of vertices
    let v: number = 0;

    //adjacency list
    let adj: number[][] = [];

    for (let i = 0; i < graph.length; i++){
        for (let j = 0; j < graph[i].length; j++){
            //If the current element is not a wall, add it to the vertexIndex array
            //and increment the number of vertices
            if (graph[i][j] != 2){
                vertexIndex[v] = [];
                vertexIndex[v].push(i);
                vertexIndex[v].push(j);
                adj[v] = [];
                v++;
            }
        }
    }

    //Check for each vertex if there is a path to another vertex
    //if there is, add an edge between them
    for (let i = 0; i < vertexIndex.length; i++){
        let row: number = vertexIndex[i][0];
        let col: number = vertexIndex[i][1];
        //check if there is a path to the vertex above
        if (findVertexIndex(vertexIndex, row - 1, col) !== -1){
            addEdge(adj, i, findVertexIndex(vertexIndex, row - 1, col));
        }
        //check if there is a path to the vertex below
        if (findVertexIndex(vertexIndex, row + 1, col) !== -1){
            addEdge(adj, i, findVertexIndex(vertexIndex, row + 1, col));
        }
        //check if there is a path to the vertex to the left
        if (findVertexIndex(vertexIndex, row, col - 1) !== -1){
            addEdge(adj, i, findVertexIndex(vertexIndex, row, col - 1));
        }
        //check if there is a path to the vertex to the right
        if (findVertexIndex(vertexIndex, row, col + 1) !== -1){
            addEdge(adj, i, findVertexIndex(vertexIndex, row, col + 1));
        }
    }
    return adj;
}
export function getSourceNode (graph: number[][]): number{
    let v: number = 0;
    for (let i = 0; i < graph.length; i++){
        for (let j = 0; j < graph[i].length; j++){
            if (graph[i][j] != 2){
                if (graph[i][j] == 1){
                    return v;
                }
                v++;
            }
        }
    }
    return -1;
}

export function getEndNode(graph: number[][]): number{
    let v: number = 0;
    for (let i = 0; i < graph.length; i++){
        for (let j = 0; j < graph[i].length; j++){
            if (graph[i][j] != 2){
                if (graph[i][j] == 3){
                    return v;
                }
                v++;
            }
        }
    }
    return -1;
}
export function getNodeXCoordinates(v: number): number{
    for (let i = 0; i < vertexIndex.length; i++){
        if (i === v){
            return vertexIndex[i][0];
        }
    }
    return -1;
}
export function getNodeYCoordinates(v: number): number{
    for (let i = 0; i < vertexIndex.length; i++){
        if (i === v){
            return vertexIndex[i][1];
        }
    }
    return -1;
}


// let graph: string[][] = [
//     ['#', '#', '#', '#', '#'],
//     ['#', 'A', '.', '.', '#'],
//     ['#', '#', '#', '.', '#'],
//     ['#', '.', '#', '.', '#'],
//     ['#', '.', '.', '.', '#'],
//     ['#', '#', 'B', '#', '#']
// ];
// let adj: number[][] = [];
//
// fromGridToList(graph, adj);