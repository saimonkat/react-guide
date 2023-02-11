// Классы вводит ES6, TS лишь добавляет типизацию

// ------------------ Уровни доступа --------------------------
// public - доступен вне класса, уровень доступа 100
// private - недоступен вне класса, уровень доступа 1
// protected - доступен только для наследых классов, уровень 0
// ------------------------------------------------------------

// Old constructor example
function OldConstructor(fieldVal) {
  this.field = fieldVal || 123;
}
OldConstructor.prototype.method = function() {
  return this.field;
}
const instance = new OldConstructor(1);
instance.method(); // -> 1

// New class example
// Типизация класса не отличается от интерфейса
class Constructor {       // можем также декларировать поля
  field1: number = 123;   // с предопределенным типов
  field2 = 123;           // или без
  [n: number]: number;    // использовать индекс-сигнатуру
  readonly fiel: number;  // использовать readonly
  someField ? = 123;      // использовать optional type
  public field = 123;     // использовать публичность переменных
  private privateField = 123;

  public constructor(arg: number) {
    this.field = arg;
  }

  // использовать публичность методов
  public publicMethod() {
    return this.field;
  }

  protected protecedMethod() {
    return this.field + this.privateMethod();
  }

  private privateMethod() {
    return this.field + this.protecedMethod();
  }
}

const myInstance = new Constructor(123);
// myInstance.privateField; // недоступно
// myInstance.privateMethod(); // недоступно

// Дочерний класс
class Child extends Constructor {
  public childMethod() {
    this.publicMethod();
    this.protecedMethod();
    // this.privateMethod(); // недоступен для дочерних классов
  }
  
  // Сохранение уровня доступа
  protected protecedMethod() {
    return super.protecedMethod();
  }

  // Можно повышать уровень доступа
  // protected privateMethod() {...} // 0->1
  // public protecedMethod() {...}   // 1->100
  // public privateMethod() {...}    // 0->100

  // Но нельзя понижать уровень доступа
  // protected publicMethod() {...}  // 100->1
  // private protecedMethod() {...}  // 1->0
  // private publicMethod() {...}    // 100->0
}


// Абстрактные классы -------------------------------------
// (нужны только для наследования)
abstract class AbstractClass {
  // абстрактные переменные и методы
  public abstract abstractField: number;
  public abstract abstractMethod(): number;

  // обычные переменные и методы
  protected protectedMethod() {
    return this.abstractField;
  }
}
// const instance2 = new AbstractClass(); // ошибка
class NewChild extends AbstractClass {
  // Implement inherited abstract classes - "Ctrl + ."
  public abstractField: number = 123;
  public abstractMethod(): number {
    return 0;
  }
}


// Implement interfaces -----------------------------------
// (работаем также как и с абстрактными классами, только без реализации)
interface MyInterface1 {
  field: string;
  method(): string;
}
class NewClass implements MyInterface1 {
  field: string;
  method(): string {
    throw new Error("Method not implemented.");
  }
}


// Generic interface & class ------------------------------
interface MyInterfaceG<T> {
  field: string;
  method(): string;
}
class NewClassG<T> implements MyInterfaceG<T> {
  field: string;
  public conf?: T;
  method(): string {
    throw new Error("Method not implemented.");
  }
}


// Class component ----------------------------------------
import * as React from "react";
class MyComponent extends React.Component<{prop1: number}, {state1: string}> {
  constructor(props) {
    super(props);
    this.state = {
      state1: '123'
    }
  }

  public render() {
    return (
      <div>{this.props.prop1}</div>
    )
  }
}