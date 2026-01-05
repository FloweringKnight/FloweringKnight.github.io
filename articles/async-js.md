# JavaScript 异步编程

**日期**: 2025-01-10

JavaScript 是一门单线程语言，但它支持异步编程，这使得它能够处理 I/O 操作而不阻塞主线程。

## 异步编程的发展

### 回调函数 (Callback)

最早的异步处理方式，但容易导致回调地狱。

```javascript
getData(function(data) {
    processData(data, function(processed) {
        saveData(processed, function(saved) {
            console.log('Done!');
        });
    });
});
```

### Promise

Promise 提供了更优雅的异步处理方式。

```javascript
getData()
    .then(data => processData(data))
    .then(processed => saveData(processed))
    .then(() => console.log('Done!'))
    .catch(error => console.error(error));
```

### Async/Await

Async/Await 是基于 Promise 的语法糖，让异步代码看起来像同步代码。

```javascript
async function handleData() {
    try {
        const data = await getData();
        const processed = await processData(data);
        await saveData(processed);
        console.log('Done!');
    } catch (error) {
        console.error(error);
    }
}
```

## 事件循环 (Event Loop)

JavaScript 的异步机制依赖于事件循环：

1. 执行同步代码
2. 处理微任务队列（Microtask Queue）
3. 处理宏任务队列（Macrotask Queue）
4. 重复以上步骤

## 常见的异步操作

- `setTimeout` / `setInterval`
- `fetch` API
- Promise
- Async/Await
- DOM 事件

## 最佳实践

1. 优先使用 async/await 而不是回调函数
2. 始终处理错误（使用 try/catch 或 .catch()）
3. 避免在循环中使用 await（除非需要串行执行）
4. 合理使用 Promise.all 和 Promise.race

## 总结

异步编程是 JavaScript 的核心特性之一。掌握 Promise 和 async/await 对于编写高效的 JavaScript 代码至关重要。
