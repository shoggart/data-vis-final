function Box(x, y, width, height, category) {

    var x = x;
    var y = y;
    var width = width;
    var height = height;
    this.category = category;

    this.mouseOver = function (mouseX, mouseY) {
        if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
            return this.category.ethnicity;
        }
        return false;
    }
    this.draw = function () {
        fill(category.color);
        rect(x, y, width, height);
    }
}
