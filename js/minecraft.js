var Minecraft = {};

var dirtCounter = 0;
var grassCounter = 0;
var treeCounter = 0;
var leafCounter = 0;
var rockCounter = 0;
var marioCounter = 5;

Minecraft.startGame = function () {
    $("#intro").css("display", "none");
};

//update the temp picked element
Minecraft.tempElement = function (tempPicked) {
    $('#inventory')
        .css({"border": "1px solid white"})
        .addClass(tempPicked);
}

// box is clicked
Minecraft.boxClicked = function () {
    var line = $(this).data("line");
    var col = $(this).data("column");

    console.log("  line:" + line + "  column:" + col);

    if (Minecraft.selectedTool == "axetool") {
        if (Minecraft.matrix[line][col] == "tree" || Minecraft.matrix[line][col] == "leaf" || Minecraft.matrix[line][col] == "mario") {
            console.log(Minecraft.matrix[line][col]);
            // Minecraft.tempElement(Minecraft.matrix[line][col]);
            Minecraft.updateCounter(Minecraft.matrix[line][col]);
            Minecraft.matrix[line][col] = "";

        }

        else {
            $("#axetool").css("background-color", "red");

            setTimeout(function () {
                $("#axetool").css("background-color", "blue");
            }, 200);
        }
    }
    else if (Minecraft.selectedTool == "pickAxeTool") {
        if (Minecraft.matrix[line][col] == "rock" || Minecraft.matrix[line][col] == "mario") {
            Minecraft.tempElement(Minecraft.matrix[line][col]);
            Minecraft.updateCounter(Minecraft.matrix[line][col]);
            Minecraft.matrix[line][col] = "";

        }
        else {
            $("#pickAxeTool").css("background-color", "red");
            setTimeout(function () {
                $("#pickAxeTool").css("background-color", "blue");
            }, 200);
        }
    }
    else if (Minecraft.selectedTool == "shovelTool") {
        if (Minecraft.matrix[line][col] == "dirt" || Minecraft.matrix[line][col] == "grass" || Minecraft.matrix[line][col] == "mario") {
            Minecraft.tempElement(Minecraft.matrix[line][col]);
            Minecraft.updateCounter(Minecraft.matrix[line][col]);
            Minecraft.matrix[line][col] = "";
            console.log("ITS: " +   Minecraft.matrix[line][col]);
        }
        else {
            $("#shovelTool").css("background-color", "red");
            setTimeout(function () {
                $("#shovelTool").css("background-color", "blue");
            }, 200);
        }
    }


    else if(Minecraft.selectedTool == "dirt" && dirtCounter>0 ){
        if(Minecraft.matrix[line][col] == ""){
            Minecraft.matrix[line][col] = "dirt";
            dirtCounter--;
            $("#dirtCount").text(dirtCounter);
        }
    }

    else if(Minecraft.selectedTool == "grass" && grassCounter>0){
        if(Minecraft.matrix[line][col] == ""){
            Minecraft.matrix[line][col] = "grass";
            grassCounter--;
            $("#grassCount").text(grassCounter);
        }

    }
    else if(Minecraft.selectedTool == "rock" && rockCounter>0){
        if(Minecraft.matrix[line][col] == ""){
            Minecraft.matrix[line][col] = "rock";
            rockCounter--;
            $("#rockCount").text(rockCounter);
        }

    }
    else if(Minecraft.selectedTool == "leaf" && leafCounter>0){
        if(Minecraft.matrix[line][col] == ""){
            Minecraft.matrix[line][col] = "leaf";
            leafCounter--;
            $("#leafCount").text(leafCounter);
        }

    }
    else if(Minecraft.selectedTool == "tree" && treeCounter>0){
        if(Minecraft.matrix[line][col] == ""){
            Minecraft.matrix[line][col] = "tree";
            treeCounter--;
            $("#treeCount").text(treeCounter);
        }

    }
    else if(Minecraft.selectedTool == "mario" && marioCounter>0){
        if(Minecraft.matrix[line][col] == ""){
            Minecraft.matrix[line][col] = "mario";
            marioCounter--;
            $("#marioCount").text(marioCounter);
        }

    }

    Minecraft.updateBoard();
};


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


/// create board
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
}

Minecraft.boxes = $(".box");

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
Minecraft.createRock = function (line, column) {
    Minecraft.matrix[line][column] = "rock";
};
Minecraft.createCloud = function (line, column) {
    Minecraft.matrix[line][column] = "cloud";

};
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
Minecraft.resetBoard = function(){
    for (var x = 0; x < Minecraft.matrix.length; x++) {
        for (var y = 0; y < Minecraft.matrix.length; y++) {
            Minecraft.matrix[x][y] = "";
        }
    }


    Minecraft.drawBoard();
};

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
        .attr("id", "axetool");
    var axeTitle = $("<p/>")
        .text("Axe")
        .addClass("textClass");
    $(axe).append(axeTitle);
    $(mainMenu).append(axe);




    var tempDirt = $("<div/>")
        .addClass("inventory")
        .attr("id", "dirt");
    var dirtCount = $("<p/>")
        .text(dirtCounter)
        .attr("id", "dirtCount")
        .addClass("counters");
    $(tempDirt).append(dirtCount);
    $(mainMenu).append(tempDirt);

    var tempGrass = $("<div/>")
        .addClass("inventory")
        .attr("id", "grass");
    var grassCount = $("<p/>")
        .text(grassCounter)
        .attr("id", "grassCount")
        .addClass("counters");
    $(tempGrass).append(grassCount);
    $(mainMenu).append(tempGrass);

    var tempTree = $("<div/>")
        .addClass("inventory")
        .attr("id", "tree");
    var treeCount = $("<p/>")
        .text(treeCounter)
        .attr("id", "treeCount")
        .addClass("counters");
    $(tempTree).append(treeCount);
    $(mainMenu).append(tempTree);

    var tempLeaf = $("<div/>")
        .addClass("inventory")
        .attr("id", "leaf");
    var leafCount = $("<p/>")
        .text(leafCounter)
        .attr("id", "leafCount")
        .addClass("counters");
    $(tempLeaf).append(leafCount);
    $(mainMenu).append(tempLeaf);

    var tempRock = $("<div/>")
        .addClass("inventory")
        .attr("id", "rock");
    var rockCount = $("<p/>")
        .text(rockCounter)
        .attr("id", "rockCount")
        .addClass("counters");
    $(tempRock).append(rockCount);
    $(mainMenu).append(tempRock);

    var mario = $("<div/>")
        .addClass("inventory")
        .attr("id", "mario");
    var marioCount = $("<p/>")
        .text(marioCounter)
        .attr("id", "marioCount")
        .addClass("counters");
    $(mario).append(marioCount);
    $(mainMenu).append(mario);

    var resetBoard = $("<div/>")
        .addClass("reset")
    var resetTitle = $("<p/>")
        .text("RESET"  + "BOARD")
        .attr("id", "resettitle");
    $(resetBoard).append(resetTitle);
    $(mainMenu).append(resetBoard);

    resetBoard.on("click",Minecraft.resetBoard );

    $("body").append(mainMenu);
};

Minecraft.sideBar();


Minecraft.toolSelect = function () {

    if ($(this).hasClass("tool")) {
        $(".tool").css("background-color", "black");
        $(this).css("background-color", "blue");
        Minecraft.selectedTool = $(this).attr('id');
        console.log("Current tool: " + Minecraft.selectedTool);
    }
    else if ($(this).hasClass("inventory")) {
        $(".tool").css("background-color", "black");
        $(".inventory").css("border", "none");
        $(this).css("border", "3px solid yellow");
        Minecraft.selectedTool = $(this).attr('id');
        console.log("Current temp selected: " + Minecraft.selectedTool);
    }
};

$(".tool").on("click", Minecraft.toolSelect);

$(".inventory").on("click", Minecraft.toolSelect);

Minecraft.updateCounter = function(tempElement){
    if(tempElement == "tree"){
        treeCounter++
    }
    else if(tempElement == "leaf"){
        leafCounter++
    }
    else if(tempElement == "rock"){
        rockCounter++
    }
    else if(tempElement == "grass"){
        grassCounter++
    }
    else if(tempElement == "dirt"){
        dirtCounter++
    }
    else if(tempElement == "mario"){
        marioCounter++
    }

    $("#treeCount").text(treeCounter);
    $("#leafCount").text(leafCounter);
    $("#rockCount").text(rockCounter);
    $("#grassCount").text(grassCounter);
    $("#dirtCount").text(dirtCounter);
    $("#marioCount").text(marioCounter);

};

Minecraft.tutorial = function(){
    $('#tutorialModal').modal({
        display: 'show',
        backdrop: 'static',
        keyboard: false  // to prevent closing with Esc button (if you want this too)
    });
}



