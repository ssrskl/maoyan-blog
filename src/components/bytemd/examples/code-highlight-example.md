# 代码高亮示例

## 使用元数据方式高亮

```js{1,3-5}
// 这一行将被高亮 (第1行)
const foo = 'bar';
// 这一行将被高亮 (第3行)
// 这一行将被高亮 (第4行) 
// 这一行将被高亮 (第5行)
console.log(foo);
```

## 使用魔法注释高亮

```js
// highlight-next-line
const foo = 'Hello World';

// highlight-start
function greet() {
  console.log(foo);
  return foo;
}
// highlight-end

greet();
```

## Python 代码示例

```python
# highlight-next-line
def hello_world():
    # highlight-start
    print("Hello, World!")
    return True
    # highlight-end
```

## JSX 代码示例

```jsx
function Component() {
  // highlight-next-line
  return (
    <div>
      {/* highlight-start */}
      <h1>Hello World</h1>
      <p>This is a JSX component</p>
      {/* highlight-end */}
    </div>
  );
}
``` 