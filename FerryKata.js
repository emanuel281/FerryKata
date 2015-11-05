var Car = function(color, passengers){
	this.color = color;
	this.passengers = passengers;
}

var Ferry = function(maxCars, maxPassengers){
	
	this.maxCars = maxCars;
	this.maxPassengers = maxPassengers;

	this.people_count = 0;
	this.car_count = 0;

	this.car_colors = {};
	this.discount = [];

	this.discount_fun = function(car_in_trip){
		var trip_count = 0;
		for (var i = 0; i < this.discount.length; i++) {
			if(this.discount[i] === car_in_trip){
				trip_count++
			}
		};
		if (trip_count % 3 === 0) {
			return 'half price!'
		}
		else{
			return 'accepted'
		}
	}

	this.board = function(car){
		if(this.maxCars - this.car_count > 0 && this.maxCars - this.people_count > 0){
			if (this.car_colors[car.color] === undefined) {
				this.car_colors[car.color] = 0;
			}
			this.car_colors[car.color]++;

			this.car_count++;
			this.people_count += car.passengers;
			this.discount.push(car);



			return this.discount_fun();
		}
		else {
			return 'rejected';
		}
	}

	this.unboard = function(car){
		if(this.car_count > 0 && this.people_count > 0){
			this.car_colors[car.color] --;
			this.car_count--;
			this.people_count -= car.passengers;

			return 'accepted';
		}
		else {
			return 'empty';
		}
	}
}


//FerryKata Part 1 start...
test("Test Car class", function () {

	var lamborghini = new Car('red', 2);

	var expected = {
					color : 'red',
					passengers : 2
					}

    equal(lamborghini.color, expected.color, "We expect colors to be red");
    equal(lamborghini.passengers, expected.passengers, "We expect passengers to be 2");
});

test("Test Ferry class", function () {

	var chang = new Ferry(10, 40);

	var lamborghini = new Car('purple', 4);
	var lotus = new Car('blue', 2);

	var board_status = chang.board(lamborghini);
		board_status = chang.board(lotus);

	var expected = {
					people_count : 6,
					car_count : 2,
					board_status : 'accepted'
					}

    //Test Ferry
    equal(chang.people_count, expected.people_count, "We expect people_count to be 6");
    equal(chang.car_count, expected.car_count, "We expect car_count to be 2");
    equal(board_status, expected.board_status, "We expect board_status to be accepted");
});

//FerryKata Part 1 ending...


//FerryKata Part 2 start...
test("Car leaves the Ferry", function () {

	var chang = new Ferry(10, 40);

	var lamborghini = new Car('purple', 4);
	var lotus = new Car('blue', 2);

	var board_status = chang.board(lamborghini);
		board_status = chang.board(lotus);
		board_status = chang.board(lotus);

	var unboard_status = chang.unboard(lamborghini);

	var expected = {
					people_count : 4,
					car_count : 2,
					unboard_status : 'accepted',
					car_colors : {
							purple : 0,
							blue : 2
						}
					}

    //Test Ferry
    equal(unboard_status, expected.unboard_status, "We expect unboard_status to be accepted");
});

test("How many cars of a certain color are on the Ferry", function () {

	var chang = new Ferry(10, 40);

	var lamborghini = new Car('purple', 4);
	var lotus = new Car('blue', 2);

	var board_status = chang.board(lamborghini);
		board_status = chang.board(lotus);
		board_status = chang.board(lotus);

		board_status = chang.unboard(lamborghini);

	var expected = {
					people_count : 4,
					car_count : 2,
					unboard_status : 'accepted',
					car_colors : {
							purple : 0,
							blue : 2
						}
					}

    //Test Ferry
    deepEqual(chang.car_colors, expected.car_colors, "We expect car_colors to be {purple : 0, blue : 2}");
});

test("Give discount to car on 3rd trip", function () {

	var chang = new Ferry(10, 40);

	var lamborghini = new Car('purple', 4);
	var lotus = new Car('blue', 2);

	var board_status = chang.board(lamborghini);
		board_status = chang.board(lotus);
		board_status = chang.board(lotus);
		board_status = chang.board(lotus);

	var unboard_status = chang.unboard(lamborghini);

	var expected = {
					board_status : "half price!"
					}

    //Test Ferry
    deepEqual(board_status, expected.board_status, "We expect board_status to be 'half price!'");
});
//FerryKata Part 2 ending...