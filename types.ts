// JS Types (7) -------------------------------------------
const bool = true;      // typeof bool  -> 'boolean'
const num = 2;          // typeof num   -> 'number'
const str = 'str';      // typeof str   -> 'string'
const nan = NaN;        // typeof nan   -> 'number'
const obj = {};         // typeof obj   -> 'object'
const arr = [];         // typeof arr   -> 'object'
const nul = null;       // typeof nul   -> 'object'
const sym = Symbol();   // typeof sym   -> 'symbol'
const und = undefined;  // typeof und   -> 'undefined'
const _void = void 0;   // typeof _void -> 'undefined'
const fn = () => {};    // typeof fn    -> 'function'

// TS Types (9+3) -----------------------------------------
type AllJsSimpleTypes = boolean | number | string | [] | object | undefined | null | void | symbol;

type StrangeTsTypes = any | unknown | never;

// Можно задавать переменную с определенным типом, или же ts определит тип автоматически как в js
let tsStr1: string = 'asd'; // equal
let tsStr2 = 'asd';         // equal

// Сложение всех чисел массива
function sumTS(arr: number[]) {
  return arr.reduce((a, v) => a + v);
}

// Сложение числа и строки
const a = 2;
const b = '2';

const results = a + b;

if (typeof b === 'number') {
  const result = a + b; 
}

// Union type ---------------------------------------------
let strOrNum: string | number = '2';
strOrNum = 2;

// Alias type (переменная для типов) ----------------------
type StrOrNum = string | number; 
const strOrNum1: StrOrNum = 1;
const strOrNum2: StrOrNum = '2';
const strOrNum3: StrOrNum = 3;
const strOrNum4: StrOrNum = '4';


// Array type ---------------------------------------------
const tsArr: number[] = [1,2,3];
const tsArrGeneric: Array<number> = [1,2,3];
const unionArr: (string | number)[] = [1,2,'3'];
const unionArrGeneric: Array<string | number> = [1,2,'3'];


// Tuple (массив фикс. длины) -----------------------------
const myTuple: [number, string] = [1, '2'];

// Деструкция таплов
const [val1, val2] = myTuple;


// Object type --------------------------------------------
const myObj                            =  { a: 1, b: '2' };
const myObj1 : { a: number, b: string } =  { a: 1, b: '2' };

type MyObjType = { a: number, b: string}
const myObj2 : MyObjType =  { a: 1, b: '2' };

// Interface ----------------------------------------------
interface MyInterface {
  readonly a: number; // нельзя переопределять
  b: string;
  c?: number[]; // optional type (необязательное)
}

const myObj3: MyInterface = {
  a: 2,
  b: '123',
}

// myObj3.a = 5; // readonly error
// myObj3.b = 5; // type error
myObj3.b = '5';

// для необязательных полей пишем проверку
if (myObj3.c) {
  const val = myObj3.c;
}

const ApiAnswer: IndexInterface = { key: 'asd' }

const val3 = ApiAnswer.randomkey;

// индекс-сигнатура
interface IndexInterface {
  [n: string]: string;
}


// Function -----------------------------------------------
function calculate(method: 'add' | 'sub', left: number, right: number): number {
  switch(method) {
    case 'add': return left + right;
    case 'sub': return left - right;
  }
}
const sum = calculate('add', 1, 2);


// Enum type ----------------------------------------------
// (способ ограничить количество методов для использования)
enum Methods {
  add = '+',
  sub = '-',
}

function calculateEnum(method: Methods, left: number, right: number): number {
  switch(method) {
    case Methods.add: return left + right;
    case Methods.sub: return left - right;
  }
}
const sumEnum = calculateEnum(Methods.add, 1, 2);


// Functions and alias ------------------------------------
const ArrowFn: TypeFn = () => 2;

type TypeFn = () => number;

interface FnInterface {
  (a: number): void;
}


// Any type -----------------------------------------------
// (уник. переменная TS, выключает типизацию)
const someAny: any = 2;
someAny.reduce();


// Unknown type -------------------------------------------
// (уник. переменная TS, не является ни одним из типов)
const un: unknown = '2';
// un.concat(); // not working

if (typeof un === 'string') {
  un.concat(); // working
}

// Void type ----------------------------------------------
// (тип функции, которая ничего не возвращает)
function voidFn(): void {
  
}
const someValue1 = voidFn();

// Never type ---------------------------------------------
// (тип функции, которая никогда не выполняется до конца)
function neverFn(): never {
  throw new Error('my exception');
}
const someValue2 = neverFn();