function CovidMap() {

    // Name for the visualisation to appear in the menu bar.
    this.name = 'COVID-19 Map';
    //downloaded map of UK
    var img;
    //array to hold unique days of the month
    this.days = [];

    this.singleDay = [];
    // Each visualisation must have a unique ID with no special
    // characters.
    this.id = 'covid-map';

    var resized = true;
    // Property to represent whether data has been loaded.
    this.loaded = false;

    var covidMonths = ["January", "February", "March", "April", "May", "June"];
    var type = ["Daily Cases", "Total Cases", "Rate"];

    var regions = [{
            name: "North East",
            x: 325,
            y: 100,
            size: 0
    },
        {
            name: "North West",
            x: 200,
            y: 200,
            size: 0
    },
        {
            name: "Yorkshire and The Humber",
            x: 350,
            y: 225,
            size: 0
    },
        {
            name: "West Midlands",
            x: 300,
            y: 400,
            size: 0
    },
        {
            name: "London",
            x: 550,
            y: 650,
            size: 0
    },
        {
            name: "East Midlands",
            x: 400,
            y: 350,
            size: 0
    },
        {
            name: "East of England",
            x: 500,
            y: 450,
            size: 0
    },
        {
            name: "South West",
            x: 200,
            y: 590,
            size: 0
    },
        {
            name: "South East",
            x: 400,
            y: 550,
            size: 0
    }];

    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function () {
        var self = this;
        this.data = loadTable(
            './data/covid-data/covid-cases.csv', 'csv', 'header',
            // Callback function to set the value
            // this.loaded to true.
            function (table) {
                self.loaded = true;

            });
        img = loadImage('data/covid-data/england-region.jpg');

    };

    this.setup = function () {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }

        //Create a month select DOM element
        this.createMonthSelect();

        //Create a data type select DOM element
        this.createDataSelect();

        // Create a select DOM element.
        this.createDaySelect();

        //Resize image appropriately
        if (resized) {
            img.resize(img.width * 1.2, img.height * 1.2);
            resized = false;
        }

        //Fill singleDay array with tabular data from initially selected date
        this.singleDay.push(this.data.findRows(this.select.value(), "Specimen date"));
    }

    this.draw = function () {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }
        image(img, 0, 0);
        this.select.changed(this.mySelectEvent.bind(this));
        this.months.changed(this.myMonthSelect.bind(this));
        this.dataText();
        fill(255, 0, 0, 120);
        noStroke();
        for (var i = 0; i < regions.length; i++) {
            ellipse(regions[i].x, regions[i].y, map(regions[i].size, 1, 43336, 1, 100));
        }
        stroke(0);
        line(435, 520, 550, 650);
        noStroke();
    }

    this.mySelectEvent = function () {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }
        this.updateInfo();
    }

    this.myMonthSelect = function () {
        if (!this.loaded) {
            console.log('Data not yet loaded');
            return;
        }
        this.select.remove();
        this.select = createSelect();
        this.select.position(450, 40);

        this.getUniqueDays(this.data.findRows(this.months.value(), "Month"));
        for (let i = 0; i < this.days.length; i++) {
            this.select.option(this.days[i]);
        }
        this.updateInfo();
    }

    this.updateInfo = function () {
        this.singleDay = [];
        this.singleDay.push(this.data.findRows(this.select.value(), "Specimen date"));

        for (var i = 0; i < regions.length; i++) {
            regions[i].size = 0;
        }
        var columnNum;
        /*if (this.dataType.value == type[0]) {
            columnNum = 3;
        } else if (this.dataType.value == type[1]) {
            columnNum = 4;
        } else {
            columnNum = 5;
        }*/
        for (var i = 0; i < regions.length; i++) {
            for (var j = 0; j < this.singleDay[0].length; j++) {
                if (regions[i].name == this.singleDay[0][j].getString(0, 0)) {
                    regions[i].size = this.singleDay[0][j].getNum(4, 0);
                }
            }
        }
    }

    this.dataText = function () {
        fill(0);
        textSize(12);
        textAlign(CENTER);
        textStyle(BOLD);
        text("Area Name:", 500, 80);
        text("Daily Cases:", 725, 80);
        text("Total Cases:", 850, 80);
        text("Rate:", 975, 80);
        textStyle(NORMAL);
        for (var i = 0; i < this.singleDay.length; i++) {
            for (var j = 0; j < this.singleDay[i].length; j++) {
                //var tWidth = textWidth("Area Name: " + this.singleDay[i][j].getString(i, 0));
                text(this.singleDay[i][j].getString(i, 0), 500, 100 + j * 20);
                text(this.singleDay[i][j].getString(i + 3, 0), 725, 100 + j * 20);
                text(this.singleDay[i][j].getString(i + 4, 0), 850, 100 + j * 20);
                text(this.singleDay[i][j].getString(i + 5, 0), 975, 100 + j * 20);

            }
        }
    }

    //code adapted from https://www.geeksforgeeks.org/how-to-get-all-unique-values-remove-duplicates-in-a-javascript-array/
    this.getUniqueDays = function (array) {
        this.days = [];
        // Count variable is used to add the 
        // new unique value only once in the 
        // days. 
        var count = 0;
        // Start variable is used to set true 
        // if a repeated duplicate value is  
        // encountered in the output array. 
        var start = false;

        for (var j = 0; j < array.length; j++) {
            for (var k = 0; k < this.days.length; k++) {
                if (array[j].get("Specimen date") == this.days[k]) {
                    start = true;
                }
            }
            count++;
            if (count == 1 && start == false) {
                this.days.push(array[j].get("Specimen date"));
            }
            start = false;
            count = 0;
        }
    }

    this.createDaySelect = function () {
        this.getUniqueDays(this.data.findRows(this.months.value(), "Month"));
        this.select = createSelect();
        this.select.position(450, 40);
        for (let i = 0; i < this.days.length; i++) {
            this.select.option(this.days[i]);
        }
    }

    this.createDataSelect = function () {
        this.dataType = createSelect();
        this.dataType.position(550, 40);
        for (let i = 0; i < type.length; i++) {
            this.dataType.option(type[i]);
        }
    }

    this.createMonthSelect = function () {
        this.months = createSelect();
        this.months.position(350, 40);
        for (let i = 0; i < covidMonths.length; i++) {
            this.months.option(covidMonths[i]);
        }
    }

    this.destroy = function () {
        this.select.remove();
        this.months.remove();
    }
}
