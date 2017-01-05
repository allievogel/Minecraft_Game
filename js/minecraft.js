var Minecraft = {};

Minecraft.startGame = function(){
    $("#intro").css("display", "none");
};

//update the temp picked element
Minecraft.tempElement = function(tempPicked){
    $('#emptyBoxtool').removeClass()
                    .css({"display" : "block"})
                    .addClass(tempPicked);
}

// box is clicked
Minecraft.boxClicked = function(){
    var line = $(this).data("line");
    var col = $(this).data("column");
    console.log("  line:" + line + "  column:" +col );

    if(Minecraft.selectedTool=="axetool"){
        if(Minecraft.matrix[line][col] =="tree" || Minecraft.matrix[line][col] =="leaf"){
            Minecraft.tempElement(Minecraft.matrix[line][col]);
            Minecraft.matrix[line][col] = "";
        }
    }
    else if(Minecraft.selectedTool=="pickAxeTool"){
        if(Minecraft.matrix[line][col] =="rock"){
            Minecraft.tempElement(Minecraft.matrix[line][col]);
            Minecraft.matrix[line][col] = "";
        }
    }
    else if(Minecraft.selectedTool=="shovelTool"){
        if(Minecraft.matrix[line][col] =="dirt" || Minecraft.matrix[line][col] =="grass" ){
            Minecraft.tempElement(Minecraft.matrix[line][col]);
            Minecraft.matrix[line][col] = "";
        }
    }


    Minecraft.updateBoard();
};


Minecraft.createBoard = function () {
    
    //creates matrix array
    Minecraft.matrix = new Array(20);
    for(var l=0; l<Minecraft.matrix.length; l++){
        Minecraft.matrix[l] = new Array(20);
    }
    for(var x=0; x<Minecraft.matrix.length; x++){
        for(var y=0; y<Minecraft.matrix.length; y++){
            Minecraft.matrix[x][y] = "";
        }
    }


/// create board
    for(var i=0; i<Minecraft.matrix.length; i++){
        for (var j = 0; j < Minecraft.matrix[i].length; j++) {
            var box = $("<div/>")
                .addClass("box")
                .data("line", i)
                .data("column", j)
                .on("click", Minecraft.boxClicked);
            $("#board").append(box);
        }
    }
};

Minecraft.createBoard();

Minecraft.updateBoard = function(){
    Minecraft.boxes
        .removeClass("grass")
        .removeClass("dirt")
        .removeClass("tree")
        .removeClass("rock");

    for(var i=0; i<Minecraft.matrix.length; i++){
        for (var j = 0; j < Minecraft.matrix[i].length; j++) {
            Minecraft.boxes.eq(i*20 + j).addClass(Minecraft.matrix[i][j]);
        }
    }
}

Minecraft.boxes = $(".box");

Minecraft.createTree = function(line, column){
    Minecraft.matrix[line][column] = "tree";
    Minecraft.matrix[line-1][column] = "tree";
    Minecraft.matrix[line-2][column] = "tree";


    Minecraft.matrix[line-3][column] = "leaf";
    Minecraft.matrix[line-4][column] = "leaf";
    Minecraft.matrix[line-5][column] = "leaf";

    Minecraft.matrix[line-3][column+1] = "leaf";
    Minecraft.matrix[line-4][column+1] = "leaf";
    Minecraft.matrix[line-5][column+1] = "leaf";

    Minecraft.matrix[line-3][column-1] = "leaf";
    Minecraft.matrix[line-4][column-1] = "leaf";
    Minecraft.matrix[line-5][column-1] = "leaf";


};
Minecraft.createRock = function(line, column){
    Minecraft.matrix[line][column] = "rock";
};
Minecraft.createCloud = function(line, column) {
    Minecraft.matrix[line][column] = "cloud";

};
Minecraft.createBush = function(line, column) {
    Minecraft.matrix[line][column] = "leaf";
    Minecraft.matrix[line-1][column] = "leaf";
    Minecraft.matrix[line][column+1] = "leaf";
    Minecraft.matrix[line][column-1] = "leaf";

};

Minecraft.drawBoard = function(){

    // Draw Dirt and Grass
    for(var i=15; i<Minecraft.matrix.length; i++){
        for (var j = 0; j < Minecraft.matrix[i].length; j++) {
            if(i === 15){
                Minecraft.matrix[i][j] = "grass";
            }
            else{
                Minecraft.matrix[i][j] = "dirt";
            }
        }
    }

    //Draw Tree
    Minecraft.createTree(14, 16);
    Minecraft.createRock(14, 14);
    Minecraft.createRock(14, 13);
    Minecraft.createRock(14, 19);

    //Draw Bush
    Minecraft.createBush(14, 4);

    //Draw Cloud
    Minecraft.createCloud(7, 3);
    Minecraft.createCloud(7, 4);
    Minecraft.createCloud(7, 5);
    Minecraft.createCloud(7, 6);
    Minecraft.createCloud(7, 7);
    Minecraft.createCloud(7, 8);
    Minecraft.createCloud(7, 9);
    Minecraft.createCloud(6, 4);
    Minecraft.createCloud(6, 5);
    Minecraft.createCloud(6, 6);
    Minecraft.createCloud(6, 8);
    Minecraft.createCloud(6, 9);
    Minecraft.createCloud(5, 5);
    Minecraft.createCloud(8, 6);
    Minecraft.createCloud(8, 7);


    Minecraft.updateBoard();
};
Minecraft.drawBoard();




Minecraft.sideBar = function () {
    var mainMenu = $("<div/>");
    $(mainMenu).addClass("menuClass");
    
    var pickAxe = $("<div/>")
            .addClass("tool")
            .attr("id", "pickAxeTool");
    var pickTitle = $("<p/>")
            .text("PickAxe")
            .addClass("textClass");
    $(pickAxe).append(pickTitle);
    $(mainMenu).append(pickAxe);

    var shovel = $("<div/>")
            .addClass("tool")
            .attr("id", "shovelTool");
    var shovelTitle = $("<p/>")
            .text("Shovel")
            .addClass("textClass");
    $(shovel).append(shovelTitle);
    $(mainMenu).append(shovel);

    var axe = $("<div/>")
            .addClass ("tool")
            .attr("id", "axetool");
    var axeTitle = $("<p/>")
            .text("Axe")
            .addClass("textClass");
    $(axe).append(axeTitle);
    $(mainMenu).append(axe); 

    var emptyBox = $("<div/>")
            .addClass("emptyBoxClass")
            .attr("id", "emptyBoxtool");
    $(mainMenu).append(emptyBox);

    $("body").append(mainMenu);
};

Minecraft.sideBar();


Minecraft.toolSelect = function(){
    if($(this).hasClass("tool")){
        Minecraft.selectedTool = $(this).attr('id');
        console.log("Current tool: " + Minecraft.selectedTool);
    }
    else{
        Minecraft.selectedTool = 'tempTool';
    }
};

$(".tool").on("click",Minecraft.toolSelect);



