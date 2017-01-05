var Minecraft = {};

Minecraft.startGame = function(){
    $("#intro").css("display", "none");
};


// Minecraft.init = function () {
//     Minecraft.boxes = $(".box");
//     Minecraft.matrix = [
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//         ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
//
//     ];
//     for (var i = 0; i < Minecraft.matrix.length; i++) {
//         for (var j = 0; j < Minecraft.matrix[i].length; j++) {
//             Minecraft.boxes.eq(i * 20 + j)
//                 .data("i", i)
//                 .data("j", j);
//             // cellType = Minecraft.matrix[i][j]; //dirt
//             // DOMcell = $('.' + i + '-' + j);
//             // if (cellType == 'dirt') {
//             // }
//             // DOMcell.addClass(cellType);
//         }
//     }
//     //     }
//     // }
// };

Minecraft.createBoard = function () {
    //create matrx array
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
                // add on.click
                .on("click", boxClicked);
            $("#board").append(box);
        }
    }
};

Minecraft.createBoard();
Minecraft.boxes = $(".box");
function createDirt() {
    for (var i = 300; i < 400; i++) {
        Minecraft.boxes.eq(i).css("background-image", "url(./images/dirt.png)");
    }
}
function createGrass() {
    for (var i = 280; i < 300; i++) {
        Minecraft.boxes.eq(i).css("background-image", "url(./images/grass.png)");
    }
}
function createRocks() {
    Minecraft.boxes.eq(273).css("background-image", "url(./images/rock.png)");
    Minecraft.boxes.eq(274).css("background-image", "url(./images/rock.png)");
    Minecraft.boxes.eq(279).css("background-image", "url(./images/rock.png)");
}
function createTree() {
    Minecraft.boxes.eq(276).css("background-image", "url(./images/tree.png)");
    Minecraft.boxes.eq(256).css("background-image", "url(./images/tree.png)");
    Minecraft.boxes.eq(236).css("background-image", "url(./images/tree.png)");
    Minecraft.boxes.eq(215).css("background-image", "url(./images/leaf.png)");
    Minecraft.boxes.eq(216).css("background-image", "url(./images/leaf.png)");
    Minecraft.boxes.eq(217).css("background-image", "url(./images/leaf.png)");
    Minecraft.boxes.eq(195).css("background-image", "url(./images/leaf.png)");
    Minecraft.boxes.eq(196).css("background-image", "url(./images/leaf.png)");
    Minecraft.boxes.eq(197).css("background-image", "url(./images/leaf.png)");
    Minecraft.boxes.eq(175).css("background-image", "url(./images/leaf.png)");
    Minecraft.boxes.eq(176).css("background-image", "url(./images/leaf.png)");
    Minecraft.boxes.eq(177).css("background-image", "url(./images/leaf.png)");

    Minecraft.boxes.eq(263).css("background-image", "url(./images/leaf.png)");
    Minecraft.boxes.eq(264).css("background-image", "url(./images/leaf.png)");
    Minecraft.boxes.eq(265).css("background-image", "url(./images/leaf.png)");
    Minecraft.boxes.eq(244).css("background-image", "url(./images/leaf.png)");
}
function createCloud() {
    Minecraft.boxes.eq(166).css("background-color", "white");
    Minecraft.boxes.eq(167).css("background-color", "white");

    Minecraft.boxes.eq(143).css("background-color", "white");
    Minecraft.boxes.eq(144).css("background-color", "white");
    Minecraft.boxes.eq(145).css("background-color", "white");
    Minecraft.boxes.eq(146).css("background-color", "white");
    Minecraft.boxes.eq(147).css("background-color", "white");
    Minecraft.boxes.eq(148).css("background-color", "white");
    Minecraft.boxes.eq(149).css("background-color", "white");

    Minecraft.boxes.eq(124).css("background-color", "white");
    Minecraft.boxes.eq(125).css("background-color", "white");
    Minecraft.boxes.eq(126).css("background-color", "white");
    Minecraft.boxes.eq(128).css("background-color", "white");
    Minecraft.boxes.eq(129).css("background-color", "white");

    Minecraft.boxes.eq(105).css("background-color", "white");
}

function createFullDraw() {
    createDirt();
    createGrass();
    createRocks();
    createTree();
    createCloud();
}
createFullDraw();

function boxClicked(){
    var li = $(this).data("line");
    var col = $(this).data("column");

    Minecraft.matrix[li][col] = "clicked!";
    console.log(Minecraft.matrix[li][col] + "  line:" + li + "  column:" +col );
}