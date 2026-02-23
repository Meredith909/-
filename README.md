# QQ 不漏

> 重要的，不漏。
> 该做的，不拖。

QQ 不漏 是一个基于 AI 的学习执行保障系统，
面向 **学习能力一般 + 有拖延倾向的大学生**，
帮助用户在信息过载的群聊环境中：

* 自动识别重要资料
* 转化为可执行任务
* 在合适时间提醒
* 提供月度学习反馈报告

它不是资料整理工具，而是执行兜底系统。

---

# ✨ 产品功能结构

## 1️⃣ 不漏 · CatchUp（卡片速览）

Tinder 风格滑卡交互：

* 右滑：收藏 → 加入任务栏
* 左滑：稍后 → 未来再次出现
* 上滑：已完成 → 进入已完成区

AI 会提前判断重要性：

* 高置信度 → 自动加入任务栏
* 中置信度 → 进入滑卡流
* 低置信度 → 忽略

---

## 2️⃣ 不漏 · 晚间提醒

执行兜底机制：

* DDL 前一天 21:30 提醒
* 根据 AI 预估耗时倒推提醒时间
* 收藏后 24 小时未处理提醒
* 连续拖延提醒（温和语气）

提醒原则：

* 每天最多 1 次主动提醒
* DDL 情况例外

---

## 3️⃣ 不漏 · 月度报告

基于行为数据生成：

* 本月捕获资料数量
* 任务完成率
* 临时完成比例
* 压力指数
* 学习节奏分析

目标：

帮助用户理解自己的拖延模式，而不是增加焦虑。

---

# 🧠 AI 核心能力

本项目采用分层模型设计：

## Relevance Scoring

判断内容是否为学习高价值信息。

## Summarization

生成 ≤50 字结构化摘要。

## Task Generation

将信息转化为可执行任务。

## Time Estimation

估算完成任务所需时间。

## Reminder Scheduling

根据 DDL 与耗时倒推提醒时间。

---

# 🏗 技术架构

Frontend:

* Vite
* React
* TypeScript
* Tailwind CSS
* shadcn-ui

Backend:

* Node.js / FastAPI（可扩展）
* OpenAI API（摘要 / 任务生成）
* PostgreSQL / Firebase（存储）

AI 架构：

* Orchestrator Agent
* Relevance Agent
* Task Agent
* Reminder Agent

---

# 📦 数据结构（核心模型）

## Card

```json
{
  "card_id": "uuid",
  "summary": "string",
  "relevance_score": 0.92,
  "status": "new|saved|postponed|done",
  "task_id": "optional"
}
```

## Task

```json
{
  "task_id": "uuid",
  "title": "阅读第5章课件",
  "due_date": "timestamp",
  "estimated_minutes": 30,
  "status": "pending|completed"
}
```

---

# 🚀 本地运行

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

---

# 🎯 产品目标

QQ 不漏 希望达到：

* 90% 重要资料自动进入任务栏
* 80% DDL 提前完成
* 用户形成晚间查看习惯
* 减少拖延带来的焦虑感

---

# 📌 核心理念

不优秀也没关系，
重要的不会漏。


