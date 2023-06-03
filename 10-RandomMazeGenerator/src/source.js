//////////////////////////////////
// Parameter Definition

// Dom Parameter
let MazeArea = document.querySelector("#maze-canvas");

// Game Parameter
const ctx_maze = MazeArea.getContext('2d'); // Maze Draw Context

// Maze Order
const Width = 500;
const Height = 500;

MazeArea.width = Width;
MazeArea.height = Height;

// Maze Color
ctx_maze.strokeStyle = "#08b3d1";

// Maze Generate Button 
const mazeGenerateBtn = document.querySelector("#mazeGenerateBtn");

// Row and Col Input
let Size = document.querySelector("#Size");

// Parameter Definition
//////////////////////////////////



//////////////////////////////////
// Class Definition

class Maze_Cell_C{

       constructor(row_number,col_number,delta_x,delta_y,ctx){
       
        this.row_number = row_number;
        this.col_number = col_number;
        this.delta_x = delta_x;
        this.delta_y = delta_y;

        // Context Settings
        this.ctx = ctx;
        this.ctx.reset();
        this.ctx.strokeStyle = "#08b3d1";

        this.totalCell = this.row_number * this.col_number;
        this.direction = [[1,0],[0,1],[-1,0],[0,-1]];
 
        this.#assign_inner_walls();
        this.#asisgn_cells();

        while(this.totalCell != this.#create_maze_walls());

        this.#draw_walls();

        
       
    }


    // Global Functions
    draw_outer_wall(){

        this.Outer_Wall = {x0:0,
                           y0:0,
                           x1:this.row_number*this.delta_x,
                           y1:this.col_number*this.delta_y}
                   
        this.#draw_rectangle(this.Outer_Wall.x0,this.Outer_Wall.y0,this.Outer_Wall.x1,this.Outer_Wall.y1)


       
    }
    

    //////////////////////////////////
    // Private Functions

    // Draw line
    #draw(x0,y0,x1,y1){

        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();

    }

    // Draw Rectangle
    #draw_rectangle(x0,y0,x1,y1){

        this.#draw(x0, y0, x1,y0);
        this.#draw(x0,y0,x0,y1);

        this.#draw(x1,y0,x1,y1);
        this.#draw(x0,y1,x1,y1);

    }

    // Draw Walls
    #draw_walls(){


        for(let i = 0; i<this.row_number;i++){
            for(let j = 0; j<this.col_number-1;j++){
            
                if(!this.RowinnerWalls[i][j])
                {
                    continue;
                }
                let x = (j + 1) *                   this.delta_x;
                let y0 = i*this.delta_y;
                let y1 = y0 + this.delta_y;

                this.#draw(x,y0,x,y1);
            }
        }

        for(let i = 0; i<this.col_number;i++){
            for(let j = 0; j<this.row_number-1;j++){
                if(!this.ColinnerWalls[i][j])
                {
                    continue;
                }
                let y = (j + 1) *                       this.delta_y;
                let x0 = i*this.delta_x;
                let x1 = x0 + this.delta_x;

                this.#draw(x0,y,x1,y);
            }
        }

    }

    // Assign Inner Walls
    #assign_inner_walls(){
        this.#assign_inner_rows_walls();
        this.#assign_inner_cols_walls();
    }

     // Assign Inner Walls
    #assign_inner_rows_walls(){

        this.RowinnerWalls = new Array(this.row_number);
        for(let i = 0; i<this.row_number;i++){
            this.RowinnerWalls[i] = new Array(this.col_number-1);
            for(let j = 0; j<this.col_number-1;j++){
                this.RowinnerWalls[i][j] = true;
            }
        }

    }
 
    // Assign Cols Walls
    #assign_inner_cols_walls(){

        this.ColinnerWalls = new Array(this.col_number);

        for(let i = 0; i<this.col_number;i++){
            this.ColinnerWalls[i] = new Array(this.row_number-1);
            for(let j = 0; j<this.row_number-1;j++){
                this.ColinnerWalls[i][j] = true;
            }
        }
    }

    // Assign Cells
    #asisgn_cells(){


        this.cells = new Array(this.row_number);
        this.groupNumber = 0;
        for(let i = 0; i<this.row_number;i++){
            this.cells[i] = new Array(this.col_number);
            for(let j = 0; j<this.col_number;j++){

                let x_start = i*this.delta_x;
                let y_start = j*this.delta_y;
                let x_final = x_start + this.delta_x;
                let y_final = y_start + this.delta_y;

                this.cells[i][j] = {x0:x_start,
                                    y0:y_start,
                                    x1:x_final,
                                    y1:y_final,
                                    group: this.groupNumber++,
                                    groupElementCount:1};

            }
        }
    }

    // Select Random Cell
    #create_maze_walls(){

        // Select Random Cells
        let randomCellRow = Math.floor(Math.random() * this.row_number);
        let randomCellCol = Math.floor(Math.random() * this.col_number);

        // Select Random Direction
        let renadomNeighboor = Math.floor(Math.random() * this.direction.length);
        let direction = this.direction[renadomNeighboor];
       
        //  Determine Random Neighboor
        let randomNeighboorRow = randomCellRow - direction[1];
        let randomNeighboorCol = randomCellCol +
        direction[0];

        // Check Outer Wall
        if(randomNeighboorRow < 0                || 
           randomNeighboorRow >= this.row_number ||
           randomNeighboorCol < 0                ||
           randomNeighboorCol >= this.col_number){
            return 0;
        }

     
         // Check is Visitied
        if(this.cells[randomCellRow][randomCellCol].group == 
            this.cells[randomNeighboorRow][randomNeighboorCol].group){
            return 0;
        }

         // Remove the Wall
        if(direction[0] != 0){
            (direction[0] == 1) ? this.RowinnerWalls[randomCellRow][randomCellCol] = false : 
            this.RowinnerWalls[randomNeighboorRow][randomNeighboorCol] = false
        }

        else{       
            (direction[1] == -1) ? this.ColinnerWalls[randomCellCol][randomCellRow] = false : 
            this.ColinnerWalls[randomNeighboorCol][randomNeighboorRow] = false
        }

        // Assign New Group and Element Number to cell
        let selectedCellGroupElementCount =  this.cells[randomCellRow][randomCellCol].groupElementCount;
        let neighboorCellGroupElementCount =  this.cells[randomNeighboorRow][randomNeighboorCol].groupElementCount;

        let selectedGroup = this.cells[randomCellRow][randomCellCol].group;
        let neighboorGroup = this.cells[randomNeighboorRow][randomNeighboorCol].group;
        
        let newElementCount = selectedCellGroupElementCount + neighboorCellGroupElementCount;
        
        // Assign Element Count
        this.cells[randomCellRow][randomCellCol].groupElementCount = newElementCount;
        this.cells[randomNeighboorRow][randomNeighboorCol].groupElementCount = newElementCount;
        
        if(selectedCellGroupElementCount >= neighboorCellGroupElementCount){

            // Assign Group
            this.cells[randomNeighboorRow][randomNeighboorCol].group = selectedGroup;

          
                for(let i = 0; i<this.row_number; i++){
                    for(let j = 0; j<this.col_number; j++){
                        if(this.cells[i][j].group == neighboorGroup){

                            this.cells[i][j].group = selectedGroup;
                            this.cells[i][j].groupElementCount = newElementCount;

                        }

                        if(this.cells[i][j].group == selectedGroup){
                            this.cells[i][j].groupElementCount = newElementCount;
                        }

                    }
                }
        }


        else{

            // Assign Group
            this.cells[randomCellRow][randomCellCol].group = neighboorGroup;

               for(let i = 0; i<this.row_number; i++){
                    for(let j = 0; j<this.col_number; j++){
                        if(this.cells[i][j].group == selectedGroup){

                            this.cells[i][j].group = neighboorGroup;
                            this.cells[i][j].groupElementCount = newElementCount;

                        }

                        if(this.cells[i][j].group == neighboorGroup){
                            this.cells[i][j].groupElementCount = newElementCount;
                        }

                    }
                

            }



        }

        return  newElementCount;
       
     }


}

    
// Private Functions
//////////////////////////////////
    

// Class Definition
///////////////////////////////////

//////////////////////////////////
// Funtions



mazeGenerateBtn.addEventListener("click", () =>{

    // dafault Maze
    let size = 10;
    
    // Check Input 
    try {
        size = Number(Size.value)
        if(size <= 1){size = 10;}
        if(size >= 100) {size = 100;} 
      } catch (e) { 
         // Draw Default Maze
        drawMaze(10);  
        logMyErrors(e);
        return; 
      }
    
    // Draw maze
    
    drawMaze(size); 
});



function drawMaze(size){

let delta_x = Math.floor(Width / size);
let delta_y = Math.floor(Height / size);

let MAZE = new Maze_Cell_C(size,size,delta_x,delta_y,ctx_maze);
MAZE.draw_outer_wall()

}


      



// Funtions
//////////////////////////////////
