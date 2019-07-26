let b;
console.log(b);
if (!b) {
  console.log("b未定义");
}

console.log("10的0次方="+1e0);

if (0){
  console.log("0为true")
}
if (-0){
  console.log("-0为true")
}
if (+0){
  console.log("+0为true")
}

let longString = 'Long\
long\
long\
string';
console.log("longString="+longString);

let obj = {
  "name":"陈辉龙",
  age:20
};

console.log(obj.name);
console.log(obj["name"]);

try {
  throw new Error("抛出错误");
}catch (e) {
  console.log("捕获异常");
  console.log(e);
}

console.log("程序已经中断执行");

let a = ['a', 'b', 'c', 'd', 'e', 'f'];
console.log(a.splice(-4, 2));
console.log(a);

let arrB = [10111, 1101,12, 111].sort(function (a, b) {
  return a - b;
});
//上面代码中，sort的参数函数本身接受两个参数，表示进行比较的两个数组成员。
// 如果该函数的返回值大于0，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。
console.log(arrB);

let s1 = 'abc';
let s2 = new String(123);
console.log(s2);
console.log(typeof s1);
console.log(typeof s2);
console.log(s2.valueOf());
console.log(s2.toString());

let s3 = String(456);
console.log(s3);
console.log(typeof s3);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomInt(1, 2));

let d = new Date(2013, 0, 1);

console.log(d.toLocaleString());
// 中文版浏览器为"2013年1月1日 上午12:00:00"
// 英文版浏览器为"1/1/2013 12:00:00 AM"

console.log(d.toLocaleDateString());
// 中文版浏览器为"2013年1月1日"
// 英文版浏览器为"1/1/2013"

console.log(d.toLocaleTimeString());
// 中文版浏览器为"上午12:00:00"
// 英文版浏览器为"12:00:00 AM"

// test必须出现在开始位置
console.log(/^test/.test('test123')); // true
console.log(/^test/.test('atest123')); // true

// test必须出现在结束位置
console.log(/test$/.test('new test')); // true
console.log(/test$/.test('new testa')); // true

// 从开始位置到结束位置只有test
console.log(/^test$/.test('test')); // true
console.log(/^test$/.test('test test')); // false
