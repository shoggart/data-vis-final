function HigherEducation() {

    var data;
    var waffles = [];
    var waffle;

    this.name = "Higher Education Ethnicity Rates"
    this.id = 'higher-education-ethnicity-rates'
    this.loaded = false;

    this.preload = function () {
        var self = this;
        this.data = loadTable(
            './data/higher-education-rate-by-race/higher-education-ethnicity-table.csv', 'csv', 'header',
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;
            });
    };


    this.setup = function () {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }

        this.year = this.data.columns;
        //console.log(this.year);
        //console.log(this.year.length);
        console.log(this.year[5]);

        this.ethnicities = this.data.getColumn('time');

        //waffle = new Waffle(20, 20, 200, 200, 10, 10, this.data, "2006", this.ethnicities);
        //console.log(this.ethnicities);

        for (var i = 1; i < this.year.length; i++) {
            if (i <= 5) {
                waffles.push(new Waffle(20 + 220 * (i - 1), 20, 200, 200, 10, 10, this.data, this.year[i], this.ethnicities));
            } else if (i <= 10) {

                waffles.push(new Waffle(20 + 220 * (i - 6), 240, 200, 200, 10, 10, this.data, this.year[i], this.ethnicities));
            } else {
                waffles.push(new Waffle(20 + 220 * (i - 11), 460, 200, 200, 10, 10, this.data, this.year[i], this.ethnicities));
            }
        }
        console.log(waffles);
    }

    this.draw = function () {
        //waffle.draw();
        //waffle.checkMouse(mouseX, mouseY);
        for (var i = 0; i < waffles.length; i++) {
            waffles[i].draw();
        }

        for (var i = 0; i < waffles.length; i++) {
            waffles[i].checkMouse(mouseX, mouseY);
        }
    }
}
