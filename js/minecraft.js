//Creating the Minecraft Namespace
var Minecraft = {};
//The different counters used to maintain
Minecraft.dirtCounter = 0;
Minecraft.grassCounter = 0;
Minecraft.treeCounter = 0;
Minecraft.leafCounter = 0;
Minecraft.rockCounter = 0;
Minecraft.marioCounter = 5;

//When loading the game
Minecraft.startGame = function () {
    $("#intro").css("display", "none");
};

//Updates the temp element with the picked element
Minecraft.tempElement = function (tempPicked) {
    $('#inventory')
        .css({"border": "1px solid white"})
        .addClass(tempPicked);
};

//When a box is clicked
Minecraft.boxClicked = function () {
    var line = $(this).data("line");
    var col = $(this).data("column");

    console.log("  line:" + line + "  column:" + col);
//When using the Axe
    if (Minecraft.selectedTool == "axeTool") {
        if (Minecraft.matrix[line][col] == "tree" || Minecraft.matrix[line][col] == "leaf" || Minecraft.matrix[line][col] == "mario") {
            console.log(Minecraft.matrix[line][col]);
            Minecraft.tempElement(Minecraft.matrix[line][col]);
            Minecraft.updateCounter(Minecraft.matrix[line][col]);
            Minecraft.matrix[line][col] = "";

        }
//If something doesn't work with the axe
        else {
            $("#axeTool").css("background-color", "red");

            setTimeout(function () {
                $("#axeTool").css("background-color", "blue");
            }, 200);
        }
    }
//When using the Pickaxe
    else if (Minecraft.selectedTool == "pickAxeTool") {
        if (Minecraft.matrix[line][col] == "rock" || Minecraft.matrix[line][col] == "mario") {
            Minecraft.tempElement(Minecraft.matrix[line][col]);
            Minecraft.updateCounter(Minecraft.matrix[line][col]);
            Minecraft.matrix[line][col] = "";

        }
//If something doesn't work with the pickaxe
        else {
            $("#pickAxeTool").css("background-color", "red");
            setTimeout(function () {
                $("#pickAxeTool").css("background-color", "blue");
            }, 200);
        }
    }
//When using the shovel
    else if (Minecraft.selectedTool == "shovelTool") {
        if (Minecraft.matrix[line][col] == "dirt" || Minecraft.matrix[line][col] == "grass" || Minecraft.matrix[line][col] == "mario") {
            Minecraft.tempElement(Minecraft.matrix[line][col]);
            Minecraft.updateCounter(Minecraft.matrix[line][col]);
            Minecraft.matrix[line][col] = "";
            console.log("ITS: " +   Minecraft.matrix[line][col]);
        }
//If something doesn't work with the shovel
        else {
            $("#shovelTool").css("background-color", "red");
            setTimeout(function () {
                $("#shovelTool").css("background-color", "blue");
            }, 200);
        }
    }

//If you want to place dirt
    else if(Minecraft.selectedTool == "dirt" && Minecraft.dirtCounter>0 ){
        if(Minecraft.matrix[line][col] == ""){
            Minecraft.matrix[line][col] = "dirt";
            Minecraft.dirtCounter--;
            $("#dirtCount").text(Minecraft.dirtCounter);
        }
    }
//If you want to place grass
    else if(Minecraft.selectedTool == "grass" && Minecraft.grassCounter>0){
        if(Minecraft.matrix[line][col] == ""){
            Minecraft.matrix[line][col] = "grass";
            Minecraft.grassCounter--;
            $("#grassCount").text(Minecraft.grassCounter);
        }
    }
//If you want to put down a rock
    else if(Minecraft.selectedTool == "rock" && Minecraft.rockCounter>0){
        if(Minecraft.matrix[line][col] == ""){
            Minecraft.matrix[line][col] = "rock";
            Minecraft.rockCounter--;
            $("#rockCount").text(Minecraft.rockCounter);
        }
    }
//If you want to put down a leaf
    else if(Minecraft.selectedTool == "leaf" && Minecraft.leafCounter>0){
        if(Minecraft.matrix[line][col] == ""){
            Minecraft.matrix[line][col] = "leaf";
            Minecraft.leafCounter--;
            $("#leafCount").text(Minecraft.leafCounter);
        }
    }
//If you want to put down a tree trunk
    else if(Minecraft.selectedTool == "tree" && Minecraft.treeCounter>0){
        if(Minecraft.matrix[line][col] == ""){
            Minecraft.matrix[line][col] = "tree";
            Minecraft.treeCounter--;
            $("#treeCount").text(Minecraft.treeCounter);
        }

    }
//If you want to put down Mario
    else if(Minecraft.selectedTool == "mario" && Minecraft.marioCounter>0){
        if(Minecraft.matrix[line][col] == ""){
            Minecraft.matrix[line][col] = "mario";
            Minecraft.marioCounter--;
            $("#marioCount").text(Minecraft.marioCounter);
        }

    }
//Updates the board with changes
    Minecraft.updateBoard();
};

//Creates the board
Minecraft.createBoard = function () {

    //creates matrix array
    Minecraft.matrix = new Array(20);
    for (var l = 0; l < Minecraft.matrix.length; l++) {
        Minecraft.matrix[l] = new Array(20);
    }
    for (var x = 0; x < Minecraft.matrix.length; x++) {
        for (var y = 0; y < Minecraft.matrix.length; y++) {
            Minecraft.matrix[x][y] = "";
        }
    }


// create board
    for (var i = 0; i < Minecraft.matrix.length; i++) {
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
//Function for updating the board
Minecraft.updateBoard = function () {
    Minecraft.boxes
        .removeClass("grass")
        .removeClass("dirt")
        .removeClass("tree")
        .removeClass("leaf")
        .removeClass("mario")
        .removeClass("rock");

    for (var i = 0; i < Minecraft.matrix.length; i++) {
        for (var j = 0; j < Minecraft.matrix[i].length; j++) {
            Minecraft.boxes.eq(i * 20 + j).addClass(Minecraft.matrix[i][j]);
        }
    }
};

Minecraft.boxes = $(".box");
//Creates the trees and leaves upon generating the map
Minecraft.createTree = function (line, column) {
    Minecraft.matrix[line][column] = "tree";
    Minecraft.matrix[line - 1][column] = "tree";
    Minecraft.matrix[line - 2][column] = "tree";


    Minecraft.matrix[line - 3][column] = "leaf";
    Minecraft.matrix[line - 4][column] = "leaf";
    Minecraft.matrix[line - 5][column] = "leaf";

    Minecraft.matrix[line - 3][column + 1] = "leaf";
    Minecraft.matrix[line - 4][column + 1] = "leaf";
    Minecraft.matrix[line - 5][column + 1] = "leaf";

    Minecraft.matrix[line - 3][column - 1] = "leaf";
    Minecraft.matrix[line - 4][column - 1] = "leaf";
    Minecraft.matrix[line - 5][column - 1] = "leaf";


};
//Creates the rocks upon map generation
Minecraft.createRock = function (line, column) {
    Minecraft.matrix[line][column] = "rock";
};
//Creates the clouds on map generation
Minecraft.createCloud = function (line, column) {
    Minecraft.matrix[line][column] = "cloud";

};
//Creates the bush on map generation
Minecraft.createBush = function (line, column) {
    Minecraft.matrix[line][column] = "leaf";
    Minecraft.matrix[line - 1][column] = "leaf";
    Minecraft.matrix[line][column + 1] = "leaf";
    Minecraft.matrix[line][column - 1] = "leaf";

};

Minecraft.drawBoard = function () {

    // Draw Dirt and Grass
    for (var i = 15; i < Minecraft.matrix.length; i++) {
        for (var j = 0; j < Minecraft.matrix[i].length; j++) {
            if (i === 15) {
                Minecraft.matrix[i][j] = "grass";
            }
            else {
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
//If you want to reset the board, reverts to original settings.
Minecraft.resetBoard = function(){
    for (var x = 0; x < Minecraft.matrix.length; x++) {
        for (var y = 0; y < Minecraft.matrix.length; y++) {
            Minecraft.matrix[x][y] = "";
        }
    }
    Minecraft.dirtCounter = 0;
    Minecraft.grassCounter = 0;
    Minecraft.treeCounter = 0;
    Minecraft.leafCounter = 0;
    Minecraft.rockCounter = 0;
    Minecraft.marioCounter = 5;
    Minecraft.updateCounter();
    //Removes selected background on icons
    $(".tool").css("background-color", "black");
    $(".inventory").css("border","1px solid white");
    Minecraft.drawBoard();
};
//Creates the sidebar
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
        .addClass("tool")
        .attr("id", "axeTool");
    var axeTitle = $("<p/>")
        .text("Axe")
        .addClass("textClass");
    $(axe).append(axeTitle);
    $(mainMenu).append(axe);

    var tempDirt = $("<div/>")
        .addClass("inventory")
        .attr("id", "dirt");
    var dirtCount = $("<p/>")
        .text(Minecraft.dirtCounter)
        .attr("id", "dirtCount")
        .addClass("counters");
    $(tempDirt).append(dirtCount);
    $(mainMenu).append(tempDirt);

    var tempGrass = $("<div/>")
        .addClass("inventory")
        .attr("id", "grass");
    var grassCount = $("<p/>")
        .text(Minecraft.grassCounter)
        .attr("id", "grassCount")
        .addClass("counters");
    $(tempGrass).append(grassCount);
    $(mainMenu).append(tempGrass);

    var tempTree = $("<div/>")
        .addClass("inventory")
        .attr("id", "tree");
    var treeCount = $("<p/>")
        .text(Minecraft.treeCounter)
        .attr("id", "treeCount")
        .addClass("counters");
    $(tempTree).append(treeCount);
    $(mainMenu).append(tempTree);

    var tempLeaf = $("<div/>")
        .addClass("inventory")
        .attr("id", "leaf");
    var leafCount = $("<p/>")
        .text(Minecraft.leafCounter)
        .attr("id", "leafCount")
        .addClass("counters");
    $(tempLeaf).append(leafCount);
    $(mainMenu).append(tempLeaf);

    var tempRock = $("<div/>")
        .addClass("inventory")
        .attr("id", "rock");
    var rockCount = $("<p/>")
        .text(Minecraft.rockCounter)
        .attr("id", "rockCount")
        .addClass("counters");
    $(tempRock).append(rockCount);
    $(mainMenu).append(tempRock);

    var mario = $("<div/>")
        .addClass("inventory")
        .attr("id", "mario");
    var marioCount = $("<p/>")
        .text(Minecraft.marioCounter)
        .attr("id", "marioCount")
        .addClass("counters");
    $(mario).append(marioCount);
    $(mainMenu).append(mario);

    var resetBoard = $("<div/>")
        .addClass("reset");
    var resetTitle = $("<p/>")
        .text("RESET"  + "BOARD")
        .attr("id", "resetTitle");
    $(resetBoard).append(resetTitle);
    $(mainMenu).append(resetBoard);

    resetBoard.on("click",Minecraft.resetBoard );

    $("body").append(mainMenu);
};

Minecraft.sideBar();
//For selecting tools
Minecraft.toolSelect = function () {

    if ($(this).hasClass("tool")) {
        $(".tool").css("background-color", "black");
        $(".inventory").css("border","1px solid white");
        $(this).css("background-color", "blue");
        Minecraft.selectedTool = $(this).attr('id');
        console.log("Current selected tool is: " + Minecraft.selectedTool);
    }
    else if ($(this).hasClass("inventory")) {
        $(".tool").css("background-color", "black");
        $(".inventory").css("border","1px solid white");
        $(this).css("border","1px solid blue");
        Minecraft.selectedTool = $(this).attr('id');
        console.log("Current item selected is: " + Minecraft.selectedTool);
    }
};
//Event listeners for the objects in the sidebar
$(".tool").on("click", Minecraft.toolSelect);

$(".inventory").on("click", Minecraft.toolSelect);
//Updates the counter when a change is made
Minecraft.updateCounter = function(tempElement){
    if(tempElement == "tree"){
        Minecraft.treeCounter++
    }
    else if(tempElement == "leaf"){
        Minecraft.leafCounter++
    }
    else if(tempElement == "rock"){
        Minecraft.rockCounter++
    }
    else if(tempElement == "grass"){
        Minecraft.grassCounter++
    }
    else if(tempElement == "dirt"){
        Minecraft.dirtCounter++
    }
    else if(tempElement == "mario"){
        Minecraft.marioCounter++
    }

    $("#treeCount").text(Minecraft.treeCounter);
    $("#leafCount").text(Minecraft.leafCounter);
    $("#rockCount").text(Minecraft.rockCounter);
    $("#grassCount").text(Minecraft.grassCounter);
    $("#dirtCount").text(Minecraft.dirtCounter);
    $("#marioCount").text(Minecraft.marioCounter);

};

Minecraft.tutorial = function(){
    $('#tutorialModal').modal({
        display: 'show',
        backdrop: 'static',
        keyboard: false  // to prevent closing with Esc button (if you want this too)
    });
};



