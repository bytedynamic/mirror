---
name: "em-fund-valuation"
description: "Query real-time fund valuation from East Money by fund code(s). Invoke when user asks to check fund valuation, e.g., '我要查一下110022现在的估值', '查询基金估值', or mentions fund codes with valuation/估值/净值 intent."
---

# 天天基金实时估值查询

## 触发条件

当用户表达以下意图时，必须调用本 skill：
- 查询某只或多只基金的实时估值/净值/涨跌幅
- 用户语句中包含基金代码（6 位数字）和“估值”“净值”“涨跌幅”等关键词
- 示例：
  - "我要查一下110022现在的估值"
  - "看看000001和000002的估值"
  - "查询基金估值"

## 工作流程

### 1. 提取基金代码

从用户输入中提取所有 6 位数字基金代码。如果用户没有提供基金代码，询问用户要查询的基金代码。

### 2. 构造请求 URL

对每只基金，构造 URL：

```
https://fundgz.1234567.com.cn/js/{fund_code}.js?rt={timestamp_ms}
```

其中 `timestamp_ms` 为当前 Unix 时间戳（毫秒级），例如 `round(time.time() * 1000)`。

### 3. 发送 HTTP 请求获取数据

使用 `Invoke-WebRequest` (PowerShell) 或 `requests` (Python) 访问上述 URL。

返回内容为 JSONP 格式，例如：

```javascript
jsonpgz({"fundcode":"110022","name":"易方达消费行业股票","jzrq":"2026-06-02","dwjz":"2.8930","gsz":"2.8498","gszzl":"-1.49","gztime":"2026-06-03 13:09"});
```

需要去掉前缀 `jsonpgz(` 和后缀 `);`，提取中间的 JSON 字符串并解析。

### 4. 解析并提取字段

对每只基金，从 JSON 中提取以下字段：

| 字段名 | 含义 |
|--------|------|
| `fundcode` | 基金代码 |
| `name` | 基金名称 |
| `gszzl` | 估算涨跌幅（%） |
| `gztime` | 估值时间 |

### 5. 以表格形式返回结果

将多只基金的结果汇总为 Markdown 表格，列名为：**基金代码、基金名称、估算涨跌幅、估值时间**。

示例输出：

| 基金代码 | 基金名称 | 估算涨跌幅 | 估值时间 |
| :--- | :--- | :--- | :--- |
| 110022 | 易方达消费行业股票 | -1.49% | 2026-06-03 13:09 |
| 000001 | 华夏成长混合 | 0.32% | 2026-06-03 15:00 |

## 注意事项

- 支持同时查询多只基金，每只基金独立发送请求。
- 如果某只基金请求失败或返回异常，在表格中标注为“查询失败”。
- 估值时间以接口返回的 `gztime` 为准。
- 估算涨跌幅 `gszzl` 直接显示为百分比，例如 `-1.49%`。
