// Generic Array ----------------------------------------------------
const myArr: MyArray<number> = [1,2,3];

// Generic - это как аргументы у функций
// MyArray принимает тип T и устанавливает ее в индекс-сигнатуру
interface MyArray<T> {
  [N: number]: T

  map<U>(fn: (el: T, index: number, arr: T[]) => U): U[]
}

let variable = myArr[1];

myArr.map((f, index, arr) => f + 1);       // [2,3,4]
myArr.map((f) => `f +${f}`);   // ['f+1','f+2'..]

[1,2,3].map((f, index, arr) => f + 1);     // [2,3,4]
[1,2,3].map((f) => `f +${f}`); // ['f+1','f+2'..]


// Generic Function -------------------------------------------------
function identity(arg: any): any {
  return arg
}
let result = identity(12); // с обнулением типизации результат всегда any

function identity1(arg) {
  return arg
}
let result1 = identity1(12); // без указания типизации результат также any

// чтобы определять тип автоматически, вводим generic <T>
function identity2<T>(arg: T): T {
  return arg
}
let result2 = identity2(123); // number
let result3 = identity2('1'); // string


// Generic extends Function -----------------------------------------
function getLen<T extends Array<any>>(arr: T): number {
  return arr.length;
}
// function getLen<T>(arr: T): number {
//   return arr.length; // property lenght doesn't exist for any type
// }
let arrLength = getLen([1,2,3]);

// интерфейс всегда начинается с I (венгерская нотация)
interface IValueWithType<T> {
  type: string;
  value: T
}
function withType<U>(arg: U): IValueWithType<U> {
  return {
    type: typeof arg,
    value: arg
  }
}
const result10 = withType(123);


// Встроенные generics ----------------------------------------------
// 1. Array

interface IExample<T> {
  type: string;
  value: T;
  isEmpty?: boolean;
}

// 2. Omit (удаляет ключи из интерфейса)
const omittedObject1: Omit<IExample<string>, 'isEmpty'> = {
  type: 'asd',
  value: '123'
}
const omittedObject2: Omit<IExample<string>, 'isEmpty' |'value' > = {
  type: 'asd'
}

// 3. Pick (выбирает ключи из интерфейса)
const pickedObject1: Pick<IExample<number>, 'isEmpty'> = {
  isEmpty: true,
}
const pickedObject2: Pick<IExample<number>, 'isEmpty' |'value'> = {
  isEmpty: true,
  value: 123
}

// 4. Partial (делает все ключи из интерфейса необязательными)
// опасный тип, который может породить большое количество if-ов
const partialObject: Partial<IExample<object>> = {
  
}
