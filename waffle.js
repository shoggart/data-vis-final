function Waffle(x, y, width, height, boxes_across, boxes_down, table, columnHeading, possibleValues) {
    var x = x;
    var y = y;
    var width = width;
    var height = height;
    var boxes_across = boxes_across;
    var boxes_down = boxes_down;

    var column = table.getColumn(columnHeading);
    var possibleValues = possibleValues;

    var colors = ["red", "green", "blue", "purple", "yellow", "orange"];

    var categories = [];
    var boxes = [];

    function addCategories() {
        for (var i = 0; i < possibleValues.length; i++) {
            if (i != 5) {
                categories.push({
                    "ethnicity": possibleValues[i],
                    "percent": round(column[i]),
                    "color": colors[i % colors.length]
                });
            }
        }

        var totalPercents = 0;
        for (var i = 0; i < categories.length; i++) {
            totalPercents += categories[i].percent;
        }

        for (var i = 0; i < categories.length; i++) {
            categories[i].boxes = round((categories[i].percent / totalPercents) * (boxes_across * boxes_down));
        }
    }

    function addBoxes() {
        var currentCategory = 0;
        var currentCategoryBox = 0;

        var boxWidth = width / boxes_across;
        var boxHeight = height / boxes_down;

        for (var i = 0; i < boxes_down; i++) {
            boxes.push([])
            for (var j = 0; j < boxes_across; j++) {
                if (currentCategoryBox == categories[currentCategory].boxes) {
                    currentCategoryBox = 0;
                    currentCategory++;
                }
                boxes[i].push(new Box(x + (j * boxWidth), y + (i * boxHeight), boxWidth, boxHeight, categories[currentCategory]));
                currentCategoryBox++;

            }
        }
        console.log(boxes);
    }

    addCategories();
    addBoxes();

    this.draw = function () {
        for (var i = 0; i < boxes.length; i++) {
            for (var j = 0; j < boxes[i].length; j++) {
                if (boxes[i][j].category != undefined) {
                    boxes[i][j].draw();
                }
            }
        }
        //fill(0);
        //textSize(20);
        //var tWidth = textWidth(columnHeading);
        //rect((x + width) / 2, y + height + 20, tWidth + 20, 40);
        //fill(255);
        //text(columnHeading, (x + width) / 2, y + height + 30);

    }

    this.checkMouse = function (mouseX, mouseY) {
        for (var i = 0; i < boxes.length; i++) {
            for (var j = 0; j < boxes[i].length; j++) {
                if (boxes[i][j].category != undefined) {
                    var mouseOver = boxes[i][j].mouseOver(mouseX, mouseY);
                    if (mouseOver != false) {
                        push();
                        fill(0);
                        textSize(20);
                        var tWidth = textWidth(mouseOver);
                        textAlign(LEFT, TOP);
                        rect(mouseX, mouseY, tWidth + 20, 40);
                        fill(255);
                        text(mouseOver, mouseX + 10, mouseY + 10);
                        pop();
                        break;
                    }
                }
            }
        }
    }
}
