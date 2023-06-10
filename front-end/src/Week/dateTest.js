const format = require("date-fns").format;

let today = new Date()
console.log(today.toLocaleTimeString());
console.log(today.toLocaleString());

console.log(today.getTimezoneOffset() / 60);

let toStartOfWeek = today.getDay() - 1; // 0-6, sunday -> satuerday
let startOfWeekDate = new Date();
startOfWeekDate.setDate(today.getDate() - toStartOfWeek);
console.log("startOfWeekDate: " + startOfWeekDate);

let mon = '2023-05-16';
let theday = new Date(
    mon.slice(0, 4),
    mon.slice(5, 7) - 1,
    mon.slice(8, 10)
);
console.log("mon.slice(5, 7):\t" + mon.slice(5, 7));
console.log("the day: " + theday);
