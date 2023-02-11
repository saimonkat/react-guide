// Type casting (приведение к типу) -----------------------
const mistake = [] as Array<number>;
mistake.push(1);
// mistake.push('1'); // ошибка


// Быстрое приведение типов больших объектов --------------
let bigObject = {
  "commit": {
    "id": 12345,
    "title": "JS fix"
  },
  "commits": [
    {
      "id": "12345",
      "title": "JS fix"
    },
    {
      "id": "12345",
      "title": "JS fix"
    }
  ],
  "compare_timeout1": false,
  "compare_timeout2": true
}

// Быстрое получение типа объекта
type TMyBigObject = typeof bigObject;

// Глобальное Readonly ------------------------------------
bigObject.compare_timeout1 = true; // можем менять
const typedBigObject: Readonly<TMyBigObject> = bigObject;
// typedBigObject.compare_timeout1 = false;
typedBigObject.commit.id = 123;
// не можем менять внешние ключи, но можем менять внутренние


// Получаем типы внешних ключей объекта -------------------
type TObjKeys = keyof TMyBigObject;


// Получаем тип внутренних ключей объекта -----------------
type TCommitType = TMyBigObject['commit'];


// Собственный Readonly -----------------------------------
type MyReadonly<T> = {
  readonly [N in keyof T]: T[N];
}

// Собственный Partial ------------------------------------
type MyPartial<T> = {
  [N in keyof T]?: T[N];
}

// Собственный Pick ---------------------------------------
type MyPick<T, K extends keyof T> = {
  [N in K]: T[N];
}

// Рекурсивный Readonly -----------------------------------
type MyReadonlyDeep<T> = {
  readonly [N in keyof T]: T[N] extends object ?
    MyReadonlyDeep<T[N]> : T[N];
}
const typedBigObjectDeep: MyReadonlyDeep<TMyBigObject> = bigObject;
// typedBigObjectDeep.compare_timeout1 = false; // readonly error
// typedBigObjectDeep.commit.id = 123; // readonly error


// Убираем Readonly
type TSomeType = MyReadonlyDeep<TMyBigObject>;

// type inference
type RemoveReadonly<T> = T extends MyReadonlyDeep<infer E> ? E : T;

type TTest = RemoveReadonly<TSomeType>;
                         
function greaterThenZero(a:number) {
  return a > 0;
}

type FnReturnType<T> = T extends ((...args: any[]) => infer R) ? R : never;
type FnParameters<T> = T extends ((...args: infer R) => any) ? R : never;

type TReturnType = FnReturnType<typeof greaterThenZero>;
type TAgrsType = FnParameters<typeof greaterThenZero>;