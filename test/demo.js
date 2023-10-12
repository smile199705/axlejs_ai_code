var currentDate = new Date()
var year = currentDate.getFullYear()
var month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
var day = currentDate.getDate().toString().padStart(2, '0')
var hours = currentDate.getHours().toString().padStart(2, '0')
var minutes = currentDate.getMinutes().toString().padStart(2, '0')
var seconds = currentDate.getSeconds().toString().padStart(2, '0')
var milliseconds = currentDate.getMilliseconds().toString().padStart(3, '0')
console.log(milliseconds, '====')
var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + milliseconds

console.log(formattedDate)
