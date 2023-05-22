export default class DateTime {
	constructor(date) {
		this.date = date;
	}

	_getString(number, length) {
		var str = String(number);
		if (length == null || str.length == length)
			return str;
		if (str.length > length)
			return str.substr(str.length - length, length);
		length = length - str.length;
		for (var i = 0; i < length; i++)
			str = "0" + str;
		return str;
	}

	format(fmt) {
		var year = this.date.getFullYear();
		var month = this.date.getMonth() + 1;
		var day = this.date.getDate();
		var hour = this.date.getHours();
		var minute = this.date.getMinutes();
		var second = this.date.getSeconds();
		var millisecond = this.date.getMilliseconds();
		fmt = fmt.replace(/yyyy/g, this._getString(year, 4));
		fmt = fmt.replace(/yy/g, this._getString(year, 2));
		fmt = fmt.replace(/MM/g, this._getString(month, 2));
		fmt = fmt.replace(/M/g, this._getString(month));
		fmt = fmt.replace(/dd/g, this._getString(day, 2));
		fmt = fmt.replace(/d/g, this._getString(day));
		fmt = fmt.replace(/hh/g, this._getString(hour, 2));
		fmt = fmt.replace(/h/g, this._getString(hour));
		fmt = fmt.replace(/mm/g, this._getString(minute, 2));
		fmt = fmt.replace(/m/g, this._getString(minute));
		fmt = fmt.replace(/ss/g, this._getString(second, 2));
		fmt = fmt.replace(/s/g, this._getString(second));
		fmt = fmt.replace(/S/g, this._getString(millisecond));
		return fmt;
	}

	setDate(year, month, day) {
		this.date.setFullYear(year);
		this.date.setMonth(month);
		this.date.setDate(day);
		return this;
	}

	setTime(hour, minute, second, millisecond) {
		this.date.setHours(hour);
		this.date.setMinutes(minute);
		this.date.setSeconds(second);
		this.date.setMilliseconds(millisecond);
		return this;
	}

	addDate(year, month, day) {
		year = this.date.getFullYear() + year;
		month = this.date.getMonth() + month;
		while (month < 0) {
			month += 12;
			year--;
		}
		while (month > 11) {
			month -= 12;
			year++;
		}
		day = Math.min(this.date.getDate(), DateTime.getMonthDays(year, month)) + day;
		var hour = this.date.getHours();
		var minute = this.date.getMinutes();
		var second = this.date.getSeconds();
		var millisecond = this.date.getMilliseconds();
		this.date = new Date(year, month, day, hour, minute, second, millisecond);
		return this;
	}

	addTime(hour, minute, second, millisecond) {
		var time = this.date.getTime();
		time += 60 * 60 * 1000 * hour;
		time += 60 * 1000 * minute;
		time += 1000 * second;
		time += millisecond;
		this.date.setTime(time);
		return this;
	}

	getValue() {
		return this.date.getTime();
	}

	toString () {
		return this.format("yyyy-MM-ddThh:mm:ss");
	}

	static isLeapYear(year) {
		if (year % 100 == 0)
			return (year % 400 == 0);
		return (year % 4 == 0);
	}

	static getMonthDays(year, month) {
		switch (month) {
			case 0:
			case 2:
			case 4:
			case 6:
			case 7:
			case 9:
			case 11:
				return 31;
			case 3:
			case 5:
			case 8:
			case 10:
				return 30;
			case 1:
				return DateTime.isLeapYear(year) ? 29 : 28;
		};
	}

	static now() {
		var date = new Date();
		return new DateTime(date);
	}

	static today() {
		var date = new Date();
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return new DateTime(date);
	}

	static thisMonth() {
		var date = new Date();
		date.setDate(1);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return new DateTime(date);
	}

	static parse(str) {
		var arr = str.split(/T| |\./);
		var arrDate = arr[0].split(/-|\//);
		var year = parseInt(arrDate[0]);
		var month = parseInt(arrDate[1]) - 1;
		var day = parseInt(arrDate[2]);
		var hour = 0;
		var minute = 0;
		var second = 0;
		var millisecond = 0;
		if (arr.length > 1) {
			var arrTime = arr[1].split(':');
			hour = parseInt(arrTime[0]);
			if (arrTime.length > 1)
				minute = parseInt(arrTime[1]);
			if (arrTime.length > 2)
				second = parseInt(arrTime[2]);
		}
		if (arr.length > 2)
			millisecond = parseInt(arr[2]);
		var date = new Date(year, month, day, hour, minute, second, millisecond);
		return new DateTime(date);
	}

	static fromValue(n) {
		var date = new Date(n);
		return new DateTime(date);
	}
}
