---
title: Rust 数据类型
date: 2023-9-12
lang: zh-CN
tags: rust
categories: NOTES
duration: 10min
pid: 78324
---
<!--
<figure>
  <img src="https://antfu.me/images/oss-mental-iron-triangle-zh.svg" />
  <figcaption class="text-center">速度-规模-品质 铁三角</figcaption>
</figure> -->

> 创建于 2023-04-12 16:59
>
> 本笔记主要来自于 [Rust 程序设计语言 中文版](https://rustwiki.org/zh-CN/book/title-page.html#rust-程序设计语言) [3.2]，旨在记录个人学习过程中的重点和心得体会。在记录过程中，笔者会对文档中的某些内容进行摘抄或修改，并添加自己的注释或说明。如有不当之处，请指正。

Rust 的每个值都有数据类型，该类型告诉 Rust 数据是被指定成哪种类型从而让 Rust 知道如何使用该数据。

Rust 是一种**静态类型**语言，它必须在编译期就知道所有变量的类型。编译器通常可以根据使用值和使用方式推导出我们想要使用的类型。对于类型可能是多种的情况下，我们必须要注明它的确切类型，例如以下代码，我们允许时它会抛出一个错误：

```rust
let num = "42".trim().parse().expect("type conversion error");
```

它表明编译器需要我们提供更多信息来确定 `num` 到底是什么类型

```shell
$ cargo run
   Compiling datatype v0.1.0 (/Users/clover/dev/rust/learn/datatype)
error[E0282]: type annotations needed
 --> src/main.rs:3:9
  |
3 |     let num = "42".trim().parse().expect("type conversion error");
  |         ^^^
  |
help: consider giving `num` an explicit type
  |
3 |     let num: /* Type */ = "42".trim().parse().expect("type conversion error");
  |            ++++++++++++

For more information about this error, try `rustc --explain E0282`.
error: could not compile `datatype` due to previous error

```

正确做法应该是这样：

```rust
let num: i8 = "42".trim().parse().expect("type conversion error");
```

## 表量类型

表量(Scalar)类型表示单个值。Rust 中有四个基本的表量类型：整形、浮点、布尔和字符

### 整数类型

整数是没有小数部分的数字，例如 `u32` 。吃类型声明表明它的值应该是占 32 位空间的无符号整型（有符号整形以 `i` 开始，i 是英文单词 integer 的首字母。与之相反的是 `u` ，代表无符号 `unsigned` 类型）。我们可以使用这样定义形式中的任何一个来声明整数值的类型。

| 长度 | 有符号类型 | 无符号类型 |
| ---- | ---------- | ---------- |
| 8    | `i8`       | `u8`       |
| 16   | `i16`      | `u16`      |
| 32   | `i32`      | `u32`      |
| 64   | `i64`      | `u64`      |
| 128  | `i128`     | `u128`     |
| arch | `isize`    | `usize`    |

> 每个定义形式要么是有符号类型要么是无符号类型，且带有一个显式的大小。**有符号**和**无符号**表示数字能否取负数——也就是说，这个数是否可能是负数（有符号类型），或一直为正而不需要带上符号（无符号类型）。就像在纸上写数字一样：当要强调符号时，数字前面可以带上正号或负号；然而，当很明显确定数字为正数时，就不需要加上正号了。有符号数字以[二进制补码](https://en.wikipedia.org/wiki/Two's_complement)（译者补充：[“补码”百度百科](https://baike.baidu.com/item/补码/6854613)）形式存储。
>
> 每个有符号类型规定的数字范围是 -(2n - 1) ~ 2n - 1 - 1，其中 `n` 是该定义形式的位长度。所以 `i8` 可存储数字范围是 -(27) ~ 27 - 1，即 -128 ~ 127。无符号类型可以存储的数字范围是 0 ~ 2n - 1，所以 `u8` 能够存储的数字为 0 ~ 28 - 1，即 0 ~ 255。
>
> 此外，`isize` 和 `usize` 类型取决于程序运行的计算机体系结构，在表中表示为“arch”：若使用 64 位架构系统则为 64 位，若使用 32 位架构系统则为 32 位。
>
> 你可按表 3-2 中所示的任意形式来编写整型的字面量。注意，可能属于多种数字类型的数字字面量允许使用类型后缀来指定类型，例如 `57u8`。数字字面量还可以使用 `_` 作为可视分隔符以方便读数，如 `1_000`，此值和 `1000` 相同。

(我目前对这个不太懂，我就直接摘过来了)

| 数字字面量         | 实例        |
| ------------------ | ----------- |
| 十进制             | 98_222      |
| 十六进制           | 0xff        |
| 八进制             | 0o77        |
| 二进制             | 0b1111_0000 |
| 字节（仅限于`u8`） | b'A'        |

如果我们不确定自己需要使用哪一种类型的整形，那么就使用 `i32` ，同时这也是 Rust 默认的类型。`isize` 和 `usize` 一般用作某些集合的索引。

> #### 整型溢出
>
> 比方说有一个 `u8` ，它可以存放从 0 到 255 的值。那么当你将其修改为范围之外的值，比如 256，则会发生**整型溢出**（_integer overflow_），这会导致两种行为的其中一种。当在调试（debug）模式编译时，Rust 会检查整型溢出，若存在这些问题则使程序在编译时 _panic_。Rust 使用 panic 这个术语来表明程序因错误而退出。第 9 章 [“`panic!` 与不可恢复的错误”](https://rustwiki.org/zh-CN/book/ch09-01-unrecoverable-errors-with-panic.html)会详细介绍 panic。
>
> 在当使用 `--release` 参数进行发布（release）模式构建时，Rust **不**检测会导致 panic 的整型溢出。相反当检测到整型溢出时，Rust 会进行一种被称为二进制补码包裹（_two’s complement wrapping_）的操作。简而言之，大于该类型最大值的数值会被“包裹”成该类型能够支持的对应数字的最小值。比如在 `u8` 的情况下，256 变成 0，257 变成 1，依此类推。程序不会 panic，但是该变量的值可能不是你期望的值。依赖整型溢出包裹的行为不是一种正确的做法。
>
> 要显式处理溢出的可能性，可以使用标准库针对原始数字类型提供的以下一系列方法：
>
> - 使用 `wrapping_*` 方法在所有模式下进行包裹，例如 `wrapping_add`
> - 如果使用 `checked_*` 方法时发生溢出，则返回 `None` 值
> - 使用 `overflowing_*` 方法返回该值和一个指示是否存在溢出的布尔值
> - 使用 `saturating_*` 方法使值达到最小值或最大值

### 浮点数

浮点数是带有小数点的数字，在 Rust 中，浮点类型数字有两种基本类型。Rust 的浮点型是 `f32` 和 `f64` ，它们的大小分别为 32 位和 64 位。默认的浮点类型是 `f64` ，因为在现代 CPU 中它的速度与 `f32` 几乎相同，但精度更高。所有的浮点类型都是有符号的。

```rust
// 浮点数
let a = 1.0; // f64

let b: f32 = 2.0; // f32
```

> 浮点数按照 IEEE-754 标准表示。`f32` 类型是单精度浮点型，`f64` 为双精度浮点型。

### 布尔类型

布尔类型只有两种值：`true` 和 `false` 。通常用在 `if` 条件判断上，布尔值的大小为 1 个字节

```rust
let _true: bool = true;
let _false: bool = false;
```

### 字符类型

Rust 的 `char` （字符）类型是最基本的字母类型

```rust
let _char: char = 'A';
let _char: char = '嗨';
let _char: char = '👋';
```

字符和字符串不同的是，字符字面量需要使用但引号括起来，而字符串是双引号。Rust 的字符类型大小为 4 个字节，表示的是一个 Unicode 标量值。这意味着它可以表示的远远不止是 ASCII。标音字母，中文/日文/韩文的文字，emoji，还有零宽空格(zero width space)在 Rust 中都是合法的字符类型。

Unicode 值的范围为 `U+0000~U+D7FF` 和 `U+E000`~`U+10FFFF` 。字符并不是 Unicode 中的一个概念，所以人在直觉上对字符的理解和 Rust 的概念不一致。

## 复合类型

组合类型可以将多个值组合成一个类型。Rust 有两种基本的复合类型：元组（tuple）、数组（Array）

### 元组类型

元组是将多个不同类型的值组合到一个复合类型中的一种基本方式，元组的长度是固定的，无法再重新增加或缩小。

在 Rust 中通过在小括号内写入以逗号分隔的值列表来创建一个元组。元组中的每一个位置都有一个类型，并且元组中不同值的类型不要求是相同的（文档这句话有些绕不好理解，说白就是一个元组中每一个值的类型都不要求相同。只需要和当前索引在元组类型定义中的类型相同即可，例如 2 号位是 `i32` 那么实际值的 2 号位只能是 `i32`）

```rust
let tuple: (i32, &str, bool) = (1, "hi", false);
```

如果实际值的类型与定义的类型不同，那么编译器会抛出错误。

```rust
let tuple: (i32, &str, bool) = (true, "hi", false);
```

在类型定义中是 `i32` ，但实际得到一个布尔：

```shell
$ cargo build
   Compiling datatype v0.1.0 (/Users/clover/dev/rust/learn/datatype)
error[E0308]: mismatched types
  --> src/main.rs:44:37
   |
44 |     let tuple: (i32, &str, bool) = (true, "hi", false);
   |                                     ^^^^ expected `i32`, found `bool`

For more information about this error, try `rustc --explain E0308`.
error: could not compile `datatype` due to previous error
```

如果我们需要提取元组的值，我们可以通过模式匹配来解构元组的值：

```rust
let tuple: (i32, &str, bool) = (1, "hi", false);
let (num, halo, boolean) = tuple;
println!("num {} halo {} bool {}", num, halo, boolean)
```

```shell
$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/datatype`
num 1 halo hi bool false
```

除了使用解构来获取元组的值外，还可以使用 `.` 连上需要访问的值的索引来直接访问元组元素，这种方式比较灵活：

```rust
let tuple: (i32, &str, bool) = (1, "hi", false);
println!("num {} halo {} bool {}", tuple.0, tuple.1, tuple.2);
```

和大多数编程语言一样，元组中的第一个元素索引为 0

```shell
$ cargo run
   Compiling datatype v0.1.0 (/Users/clover/dev/rust/learn/datatype)
    Finished dev [unoptimized + debuginfo] target(s) in 0.28s
     Running `target/debug/datatype`
num 1 halo hi bool false
```

> 没有任何值的元组 `()` 是一种特殊的类型，只有一个值，也写成 `()`。该类型被称为**单元类型**（_unit type_），该值被称为**单元值**（_unit value_）。如果表达式不返回任何其他值，就隐式地返回单元值。

### 数组类型

将多个值组合在一起的另外一种方式就是使用数组，与元组不同的是，数组的每一个元素都必须具有相同的类型。和其它语言不同的是，Rust 中的数组具有固定长度。

```rust
let arr = [1, 2, 3, 4, 5];
```

当你希望将数据分配到栈(stack)而不是堆(heap)时或者你希望始终保存最终具有固定数量的元素时就可以使用数组。但他们不想 vector(向量)那么灵活，vector 类似标准库提供的集合类型，它允许你增长或缩小大小。如果不确定需要使用数组还是 vector，那就应该使用 vector (这是因为你的长度是可变的才会纠结)

数组的类型使用中括号编写，其中需要包含数组的类型、分号、数量

```rust
let arr:[i32; 5] = [1, 2, 3, 4, 5];
```

以上代码 `i32` 是表示数组元素的类型，分号后面的 5 表示这个数组有 5 位。但是这种方式需要每一个元素中都有一个初始值，有些时候不太好用。咱们可以使用下面这种方式创建数组，它可以自动初始化。

```rust
let arr = [3; 5];
```

以上代码创建一个数组，数组中 3 表示这个数组的初始值是 3，然后有 5 个元素。在运行的时候会自动创建 `[3, 3, 3, 3, 3]` 。

数组是可以在栈内存上分配的已知固定大小的单个内存块。可以使用索引来访问数组的元素。

```rust
let arr = [1, 2, 3, 4, 5];
println!("first {} two {}", arr[0], arr[1]);
```

```shell
$ cargo run
$ cargo run
   Compiling datatype v0.1.0 (/Users/clover/dev/rust/learn/datatype)
    Finished dev [unoptimized + debuginfo] target(s) in 0.43s
     Running `target/debug/datatype`
first 1 two 2
```

尝试访问超出数组末尾的元素：

```rust
let mut inp = String::new();
io::stdin().read_line(&mut inp).expect("faild to read");

let index: usize = inp.trim().parse().expect("fiald to parse");
let target = arr[index];

println!("target {}", target);
```

```shell
$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.00s
     Running `target/debug/datatype`
6
thread 'main' panicked at 'index out of bounds: the len is 5 but the index is 6', src/main.rs:55:18
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

该程序在索引操作中使用无效值时导致**运行时**错误，程序退出并显示错误消息，未执行后面的代码。当你尝试使用索引访问元素的时候，Rust 将检查你指定的索引是否小于数组长度。如果索引大于或等于数组长度，Rust 会出现 `panic` 。这种检查必须在运行时进行，尤其是咋这种情况下，因为编译器可能无法知道用户之后运行代码时将输入什么值。

这是 Rust 在实践中安全原则的第一个例子。很多低级语言中，并不进行这种检查，而且在你使用不正确的索引时，可以访问无效的内存。Rust 通过立即退出的方式来防止这种错误，而不是允许访问并继续运行程序。
