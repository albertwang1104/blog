---
title: Martingale Convergence Theorem
order: 2
date: 2025-12-13
category:
  - Probability
tag:
  - Study Note
---
<!-- # Martingale Convergence Theorem -->


**Martingale Convergence Theorem（鞅收斂定理）** 是現代機率論中最重要的工具之一。直覺來說，它回答了一個非常基本但又不容易的問題：**如果我們有一個「沒有整體趨勢」的隨機過程，它會不會在長時間之後收斂到某個極限？**  

在離散時間的設定裡，一個隨機過程 $(X_t)_{t \ge 0}$ 若滿足
$$
\mathbb{E}[X_{t+1} \mid \mathcal{F}_t] = X_t,
$$
我們稱它為一個鞅（martingale，或稱為平賭）。這個條件常被解讀為「在知道目前所有資訊 $\mathcal{F}_t$ 的情況下，對於下一步的最佳預測就是現在的值」，也就是說，這個過程在條件期望意義下是沒有系統性上漲或下跌趨勢的——它是一個形式化的「公平賭局」模型。

然而，「沒有趨勢」並不代表「會收斂」。一個過程可以沒有期望上的偏移，卻依然在上下之間來回震盪、不斷穿越不同區間，而永遠不穩定在某個極限值上。Martingale Convergence Theorem 的內容，正是告訴我們：**只要這個鞅在某種適當的意義下「不會爆炸」、不會把太多機率質量丟到無窮遠的地方，那麼它必定 almost surely 收斂**。  

<!-- more -->

更具體一點，常見的條件包括：
- 鞅在 $L^1$ 意義下有統一界（即 $\sup_t \mathbb{E}[|X_t|] < \infty$），或
- 鞅在 $L^2$ 中有統一界（即 $\sup_t \mathbb{E}[X_t^2] < \infty$），或
- 鞅本身在樣本路徑上被某個常數有界（即 $|X_t| \le M$）。

在這些條件下，定理保證存在一個隨機變數 $X_\infty$，使得
$$
X_t \xrightarrow{a.s.} X_\infty \quad (t \to \infty).
$$
也就是說，**在幾乎所有的樣本路徑上，鞅都會收斂到一個極限值**。在更強的條件（例如 $L^2$ 有界）下，我們甚至可以得到 $L^2$ 或 $L^1$ 的收斂。

這個收斂定理之所以重要，是因為在許多應用裡，我們的目標並不是只看某個固定時間點的分佈，而是關心「長時間極限行為」：  
- 在 **隨機過程與 Markov 鏈** 中，我們想知道某些正規化後的量是否會收斂，並以此研究穩態分佈或長期頻率。  
- 在 **隨機逼近（stochastic approximation, SA）與隨機梯度方法** 中，我們常常將誤差的平方、或某種 Lyapunov 函數構造成一個「接近鞅」或「超鞅」的過程，然後利用鞅收斂定理與其推廣（例如 Robbins–Siegmund 定理）來證明參數迭代會收斂到某個目標值。  
- 在 **金融數學** 中，折現後的資產價格過程在風險中立測度下是一個鞅。鞅收斂定理提供了對這些價格在長期極限行為的控制，並常配合其他工具推導出公平價格或無套利條件。  
- 在 **統計物理與隨機演化系統** 中，許多量可以被寫成鞅或次鞅，鞅收斂定理提供了一種自然的方法來說明系統如何漸進地「穩定」下來。

更深一層來看，Martingale Convergence Theorem 也反映了機率論的一個核心哲學：  
> 當我們對一個隨機系統施加「公平性」與「有界性」這樣的結構限制時，系統的長期行為不再是完全混亂，而會展現出某種穩定的極限模式。

接下來，我們會先回顧概率空間、收斂方式、濾子（filtration）與鞅的嚴謹定義，再介紹 Doob 的 Upcrossing Inequality，最後給出 Martingale Convergence Theorem 的精確敘述及其直觀意義與應用。



## Probability

一個機率空間由三個部分構成：

$$
(\Omega, \mathcal{F}, \mathbb{P})
$$

- **Sample Space**：$\Omega$ 是一個收集所有可能結果的集合。
- **Event Space, $\sigma$-algebra**：$\mathcal F$ 是一個收集事件的集合，事件是一個 $\Omega$ 的子集合。$\mathcal F$ 也是一個 $\sigma$-algebra，要滿足下列三個條件：
  - $\varnothing \in \mathcal F$.
  - 對補集封閉：If $A \in \mathcal F$, then $A^c \in \mathcal F$.
  - 可數聯集封閉性：If $\{A_n\}_{n\in \mathbb N}$ is the sequence of set in $\mathcal F$, then $\cup_{n\in \mathbb N} A_n \in \mathcal F$.
- **Probability Measure**：
  $$
  \mathbb{P}: \mathcal F \to [0,1]
  $$
  滿足可數可加性與 $\mathbb P(\Omega)=1$。
  - $\mathbb P(\emptyset) = 0$.
  - 可數可加性：If $\{A_n\}_{n\in \mathbb N}$ is the sequence of set in $\mathcal F$, and $A_i \cap A_j = \emptyset$ for all $i\neq j$, then $\mathbb{P}(\cup_{n\in \mathbb N} A_n) = \sum_n \mathbb P (A_n)$.

**隨機變數**：$X:\Omega\to\mathbb R$ 若 $X^{-1}((-\infty, x])\in\mathcal F$ 則稱為可測。



## Convergence

在隨機變數序列的分析中，我們會使用多種不同的收斂概念。雖然這些收斂方式彼此相關，但它們的強弱關係並不相同，且在不同的應用中扮演不同角色。以下給出三種最常使用的收斂定義：機率收斂、幾乎處處收斂與 $L^p$ 收斂。


### 1. Convergence in Probability

對隨機變數序列 $\{X_n\}$ 與隨機變數 $X$，若滿足

$$
X_n \xrightarrow{P} X,
$$

即稱 $X_n$ **收斂到 $X$（以機率收斂）**，其定義為：

$$
\forall \varepsilon > 0,\quad 
\mathbb{P}\!\left( |X_n - X| > \varepsilon \right) \xrightarrow[n\to\infty]{} 0.
$$

換言之，對任何固定的容許誤差 $\varepsilon > 0$，$X_n$ 與 $X$ 相差大於 $\varepsilon$ 的機率在 $n \to \infty$ 時趨近於零。



### 2. Almost Sure Convergence

稱 $X_n$ **幾乎處處收斂（almost surely, a.s.）到 $X$**，若：

$$
X_n \xrightarrow{a.s.} X
\quad\Longleftrightarrow\quad
\mathbb{P}\!\left( \lim_{n\to\infty} X_n = X \right) = 1.
$$

這表示：在樣本空間 $\Omega$ 中，除了一個機率零的集合外，所有樣本路徑 $\omega$ 都滿足

$$
\lim_{n\to\infty} X_n(\omega) = X(\omega).
$$

almost sure 收斂是一種非常強的收斂概念，它要求幾乎所有路徑點wise 收斂。



### 3. Convergence in $L^p$

對 $p \ge 1$，若

$$
X_n \xrightarrow{L^p} X,
$$

稱 $X_n$ 在 $L^p$ 意義下收斂到 $X$，其定義為：

$$
\mathbb{E}\!\left[\, |X_n - X|^p \,\right]
\xrightarrow[n\to\infty]{} 0.
$$

這種收斂方式要求 $X_n$ 與 $X$ 的 $L^p$ 距離（即 $p$ 次方誤差的期望值）趨近於零，因此比起機率收斂更具限制性。



### 收斂強弱關係

對所有 $p \ge 1$，有：

$$
X_n \xrightarrow{L^p} X
\quad\Longrightarrow\quad
X_n \xrightarrow{P} X.
$$

然而反向不一定成立；機率收斂並不保證 $L^p$ 收斂。

此外：almost sure convergence ⇒ convergence in probability  

## Filtration

在討論隨機過程的時間演化時，我們需要形式化地描述「隨著時間推進，可取得的資訊逐漸增加」這件事。這個概念由 **濾子（filtration）** 提供。


### 定義（Filtration）

在一個固定的機率空間 $(\Omega, \mathcal{F}, \mathbb{P})$ 上，一組遞增的 $\sigma$-代數族

$$
\mathcal{F}_0 \subseteq \mathcal{F}_1 \subseteq \mathcal{F}_2 \subseteq \cdots
$$

稱為一個 **濾子（filtration）**，記為 $\{\mathcal{F}_t\}_{t \ge 0}$。  

對於每個時間 $t$，$\mathcal{F}_t$ 代表「截至時間 $t$ 所能觀察到的全部隨機資訊」。遞增性  
$$
\mathcal{F}_s \subseteq \mathcal{F}_t \quad \text{for } s < t
$$
反映了資訊量只能增加、不會隨時間減少。
所以在一個給定的機率空間上，搭配一組 filtration，則稱之為 **filtered probability space**，記為 $(\Omega, \mathcal{F}, \{\mathcal{F}_t\}_{t \ge 0}, \mathbb{P})$。


### 適應性（Adapted process）

給定濾子 $\{\mathcal{F}_t\}$ ，一個隨機過程 $\{X_t\}$ 若對每個 $t$ 滿足：

$$
X_t \text{ is } \mathcal{F}_t\text{-measurable},
$$

則稱 $\{X_t\}$ **對濾子是適應的（adapted）**。

這代表 $X_t$ 在時間 $t$ 時可以由可觀察資訊決定，沒有使用未來資訊。  所有 martingale、submartingale、supermartingale 都要求必須是 adapted process。



## Martingale

鞅（martingale）是機率論中描述「公平遊戲」或「零趨勢」隨機過程的核心模型。在數學上，它以條件期望保持不變來形式化「沒有系統性偏移」這件事。



### 定義（Martingale）

給定濾子 $\{\mathcal{F}_t\}$，一個隨機過程 $\{X_t\}$ 稱為 **martingale**，若滿足以下條件：

1. **適應性（adapted）**：  
   $$
   X_t \quad \text{is } \mathcal{F}_t\text{-measurable}.
   $$

2. **可積性（integrability）**：  
   $$
   \mathbb{E}[|X_t|] < \infty \quad \text{for all } t.
   $$

3. **公平性條件（martingale property）**：  
   $$
   \mathbb{E}\!\left[X_{t+1} \mid \mathcal{F}_t \right] = X_t
   \quad\text{a.s.}
   $$

條件 (3) 表示：在知道目前所有資訊 $\mathcal{F}_t$ 的情況下，$X_{t+1}$ 的條件期望值正好等於現在的值 $X_t$，因此 $X_t$ 在條件期望意義下不會上升或下降。


### Submartingale 與 Supermartingale

若將公平性條件放寬為不等號，可得到二種廣義形式：

- **Submartingale**：  
  $$
  \mathbb{E}[X_{t+1} \mid \mathcal{F}_t] \ge X_t.
  $$

- **Supermartingale**：  
  $$
  \mathbb{E}[X_{t+1} \mid \mathcal{F}_t] \le X_t.
  $$

直觀上：
- submartingale 平均而言會「上升」  
- supermartingale 平均而言會「下降」  

而 martingale 則處在兩者正中間，沒有任何趨勢。


### 直觀解釋

可以將 $X_t$ 想成一個隨機過程的「資金」：

- 若 $\mathbb{E}[X_{t+1} \mid \mathcal{F}_t] = X_t$，表示遊戲是完全公平的（martingale）。  
- 若 下一步的期望比現在更大（submartingale），表示遊戲在平均上有利可圖。  
- 若 下一步的期望比現在小（supermartingale），則表示系統有遞減趨勢。

在使用 martingale 技巧時，我們通常會利用其公平性與條件期望的線性結構，來推導長期行為，如收斂性、界估計或不等式。



<!-- ### 例子

#### 1. **簡單對稱隨機漫步**  
   若 $\{\xi_t\}$ 是 i.i.d. 且 $\mathbb{E}[\xi_t] = 0$，  
   $$
   S_t = \sum_{i=1}^{t} \xi_i
   $$
   則 $\{S_t\}$ 為 martingale。

#### 2. **折現股票價格**（金融數學）  
   $$
   \tilde{S}_t = e^{-rt} S_t
   $$
   在風險中立測度下是 martingale。

#### 3. **條件期望 Doob martingale**  
   對任意 $X \in L^1$，  
   $$
   M_t = \mathbb{E}[X \mid \mathcal{F}_t]
   $$
   為一個典型且重要的 martingale。 -->


## Doob Upcrossing Inequality

在討論鞅或次鞅的收斂性之前，我們需要一個關鍵的技術工具：**Doob 的 Upcrossing Inequality**。它的核心想法是：如果一個過程在某個區間 $\,[a,b]\,$ 之間無限次地上下震盪，那它就不可能收斂；反過來說，只要能控制這種「上穿次數」，就能控制序列是否會收斂。

### Upcrossing 的定義

令 $\{X_n\}_{n \ge 0}$ 是一個實值隨機過程，$a < b$ 為兩個固定實數。我們想要數出 $X_n$ 在區間 $(a,b)$ 上「從下到上穿越」的次數。

嚴謹地說，定義一組（可能依賴於樣本點 $\omega$ 的）停止時間序列：
- 令
  $$
  \tau_1(\omega)
  :=
  \inf\{ n \ge 0 : X_n(\omega) \le a \},
  $$
- 對 $k \ge 1$，定義
  $$
  \sigma_k(\omega)
  :=
  \inf\{ n > \tau_k(\omega) : X_n(\omega) \ge b \},
  $$
  若此集合為空，則令 $\sigma_k(\omega) = +\infty$。
- 再定義
  $$
  \tau_{k+1}(\omega)
  :=
  \inf\{ n > \sigma_k(\omega) : X_n(\omega) \le a \},
  $$
  若集合為空，則令 $\tau_{k+1}(\omega) = +\infty$。

在這樣的定義下，每一對 $(\tau_k, \sigma_k)$，若滿足 $\tau_k < \sigma_k < \infty$，就對應到一次從 $a$ 以下到 $b$ 以上的「完整上穿（upcrossing）」。



### Upcrossing Number

對給定樣本點 $\omega$，定義在前 $n$ 步之內的上穿次數為
$$
U_{a,b}(X; n)(\omega)
:=
\max\{ k \ge 0 : \sigma_k(\omega) \le n \},
$$
也就是說，在時間 $0,1,\dots,n$ 之間，$X_n(\omega)$ 從 $\le a$ 到 $\ge b$ 的完整穿越一共發生了幾次。

當 $n \to \infty$ 時，定義無窮時間內的上穿次數：
$$
U_{a,b}(X)(\omega)
:= 
\lim_{n\to\infty} U_{a,b}(X; n)(\omega)
\in \{0,1,2,\dots,\infty\}.
$$

若 $U_{a,b}(X)(\omega) = \infty$，表示在樣本路徑 $\omega$ 上，$X_n(\omega)$ 在區間 $(a,b)$ 之間無限次地來回震盪，因此不可能收斂（至少不可能收斂到位於區間 $[a,b]$ 之中的值）。


### Doob Upcrossing Inequality

接下來假設 $\{X_n\}$ 是一個 **submartingale**，相對於某濾子 $\{\mathcal{F}_n\}$，並令
$$
X_n^+ := \max(X_n, 0)
$$
表示 $X_n$ 的正部份。

#### **定理（Doob Upcrossing Inequality）**  

令 $\{X_n\}$ 為 submartingale，且 $a < b$。對任意整數 $N \ge 1$，有
$$
(b - a)\,
\mathbb{E}\big[ U_{a,b}(X; N) \big]
\;\le\;
\mathbb{E}\big[ (X_N - a)^+ \big]
-\mathbb{E}\big[ (X_0 - a)^+ \big].
$$

特別地，若
$$
\sup_{n} \mathbb{E}\big[(X_n - a)^+\big] < \infty,
$$
則
$$
\mathbb{E}\big[ U_{a,b}(X) \big]
= \lim_{N\to\infty} \mathbb{E}[U_{a,b}(X; N)] < \infty,
$$
因此 $U_{a,b}(X) < \infty$ 幾乎處處成立。



### 不等式的直觀意義

可以把 $(X_n - a)^+$ 想成是「高於水位 $a$ 的高度」。每完成一次從 $a$ 以下到 $b$ 以上的完整上穿，$X_n$ 至少要「爬升」一個高度 $b-a$。Upcrossing inequality 告訴我們：**期望高度的總增加量** 可以控制 **上穿次數的期望值**。如果期望高度不會無限增加，那麼上穿次數的期望就不可能無限大，從而上穿次數本身也無法無限多次出現。

這個結論非常關鍵，因為如果在任意有理數 $a < b$ 上，上穿次數都有限，那麼 $X_n$ 在不同水平之間就不會無限次振盪，進一步可以推導出 $X_n$ 幾乎處處收斂。這就是 Doob Upcrossing Inequality 在鞅收斂理論中的核心角色。



## Martingale Convergence Theorem

有了 Upcrossing Inequality，我們就能嚴謹地證明鞅（或次鞅、超鞅）在某些自然條件下必然收斂。以下給出幾個標準版本的 Martingale Convergence Theorem。



### Doob’s Martingale Convergence Theorem (Submartingale Version)


令 $\{X_n\}$ 為相對於濾子 $\{\mathcal{F}_n\}$ 的 submartingale，假設
$$
\sup_{n} \mathbb{E}[X_n^+] < \infty.
$$
則存在一個（可為擴展實值）隨機變數 $X_\infty$，使得
$$
X_n \xrightarrow{a.s.} X_\infty
\quad\text{當 } n \to \infty.
$$

若再額外假設 $\{X_n\}$ 在 $L^1$ 中有界（例如 $\sup_n \mathbb{E}[|X_n|] < \infty$），則 $X_\infty$ 是可積的，且
$$
X_n \xrightarrow{L^1} X_\infty,
$$
也就是說，
$$
\mathbb{E}[|X_n - X_\infty|] \to 0.
$$



### 特別情況：鞅與非負次鞅

從上述定理可以推得幾個特別重要的情形：

1. **$L^1$ 有界的鞅**  
   若 $\{X_n\}$ 是 martingale，且
   $$
   \sup_n \mathbb{E}[|X_n|] < \infty,
   $$
   則存在可積隨機變數 $X_\infty$，使得
   $$
   X_n \xrightarrow{a.s.} X_\infty
   \quad\text{且}\quad
   X_n \xrightarrow{L^1} X_\infty.
   $$

2. **非負的次鞅**  
   若 $\{X_n\}$ 是非負 submartingale（即 $X_n \ge 0$ a.s. 且為 submartingale），則自動保證 $\{X_n\}$ 在 $L^1$ 有界，從而存在隨機變數 $X_\infty \ge 0$，使得
   $$
   X_n \xrightarrow{a.s.} X_\infty
   \quad\text{且}\quad
   X_n \xrightarrow{L^1} X_\infty.
   $$

換句話說，**非負 submartingale 必然收斂（在 a.s. 與 $L^1$ 意義上）**。



### $L^2$ 有界鞅版本

在許多應用中，我們特別關心平方可積的鞅。此時可以得到更強的收斂結果。

**定理（$L^2$-bounded martingale）**  
若 $\{X_n\}$ 為 martingale，且
$$
\sup_{n} \mathbb{E}[X_n^2] < \infty,
$$
則存在某個 $X_\infty \in L^2$，使得
$$
X_n \xrightarrow{a.s.} X_\infty
\quad\text{且}\quad
X_n \xrightarrow{L^2} X_\infty.
$$

也就是說，
$$
\mathbb{E}[|X_n - X_\infty|^2] \to 0.
$$



### 有界鞅版本（最直觀的形式）

最後是一個非常常用、也最直觀的版本：

#### **定理（Bounded martingale）**  
若 $\{X_n\}$ 為 martingale，且存在常數 $M > 0$ 使得
$$
|X_n| \le M \quad\text{a.s. for all } n,
$$
則存在隨機變數 $X_\infty$，使得
$$
X_n \xrightarrow{a.s.} X_\infty.
$$

由於有界性也保證了 $L^p$ 有界（對所有 $p \ge 1$），在進一步條件下還可以得到 $L^p$ 收斂。


### 收斂定理的直觀意義

Martingale Convergence Theorem 可以視為「公平但不會爆炸的隨機系統，最終會穩定下來」的一種數學化描述：

- 鞅（或次鞅）代表「沒有系統性偏移」或「平均朝某方向變化」的過程。
- $L^1$ 或 $L^2$ 的有界性保證過程不會將太多機率質量丟到無窮遠處，也就是「不會爆炸」。
- Doob Upcrossing Inequality 保證過程不會在任何區間之間無限次震盪。
- 因此，樣本路徑在幾乎處處的意義下必須收斂到某個極限值。

這個收斂定理在應用上極其重要：在隨機逼近、隨機梯度下降、金融定價、Markov 鏈極限行為分析中，只要能將某個量構造成適當的鞅或次鞅，並檢查其有界性，就可以利用 Martingale Convergence Theorem 直接得到「長期收斂」的結論。


## Doob’s Inequality, Convergence in $L^p$ ($p > 1$)

在理解 martingale 的收斂行為時，我們需要控制整條樣本路徑的變動情況，特別是對過程最大值
$$
X_n^* := \max_{1 \le k \le n} |X_k|
$$
的控制。Doob 的最大不等式（Doob's Maximal Inequality）提供了這種控制方式，並由此導出 $L^p$ 收斂的重要結果。

本節主要討論：

1. **Doob’s $L^p$ maximal inequality**  
2. **$L^p$ bounded martingales 的收斂定理**  
3. **$L^p$ 收斂 $\Rightarrow$ almost sure 收斂**


### Doob’s $L^p$ Maximal Inequality

令 $\{X_n\}$ 是一個 **submartingale**（特別地，對 martingale 更可用），且 $p > 1$。定義最大值過程：

$$
X_n^* := \max_{1 \le k \le n} |X_k|.
$$

#### **Doob’s $L^p$ Maximal Inequality：**

對所有 $n \ge 1$ 以及所有 $p > 1$，都有：

$$
\| X_n^* \|_p 
\;\le\; 
\frac{p}{p - 1}\, \| X_n \|_p .
$$

等價地：

$$
\mathbb{E}\!\left[ \left( \max_{1\le k\le n} |X_k| \right)^p \right]
\;\le\;
\left( \frac{p}{p-1} \right)^p
\mathbb{E}[ |X_n|^p ] .
$$

這表示：只要 $X_n$ 的 $p$ 次方期望有界，整條路徑的最大值也能受到良好控制。



#### Doob’s Inequality 的簡單解釋

對 submartingale 而言，$X_n$ 平均來說不往下降，因此其最大值可能比 $X_n$ 本身大得多。但 Doob’s inequality 告訴我們：

> 若 $X_n$ 在 $L^p$ 意義下沒有變得太大，那麼它沿途的最大值也不會太大。

這個不等式在後續推 $L^p$ 收斂時扮演關鍵角色。



### $L^p$ Bounded Martingales 的收斂

如果 martingale $\{X_n\}$ 具有 uniform $L^p$ bound（即 $p>1$ 且下式有界）：

$$
\sup_n \mathbb{E}[|X_n|^p] < \infty,
$$

那麼 Doob’s inequality 保障最大值過程 $X_n^*$ 在 $L^p$ 中可控，並可用於推導：

1. **幾乎處處收斂（a.s. convergence）**  
2. **$L^p$ 收斂**

這是因為：

- $L^p$ boundedness implies uniform integrability  
- 且 $|X_n - X_\infty|$ 控制在一個可積的上界下  
- 可應用 dominated convergence theorem 或 Vitali theorem

以下呈現正式定理。



### $L^p$-bounded Martingale Convergence Theorem ($p>1$)


若 $\{X_n\}$ 是 martingale，且對某個 $p > 1$：

$$
\sup_n \mathbb{E}[|X_n|^p] < \infty,
$$

則存在 $X_\infty \in L^p$，使得：

1. **almost surely 收斂**  
   $$
   X_n \xrightarrow{a.s.} X_\infty;
   $$

2. **$L^p$ 收斂**  
   $$
   \mathbb{E}\!\left[ |X_n - X_\infty|^p \right] \to 0.
   $$

也就是說，$X_n$ 同時以 almost sure 與 $L^p$ 意義收斂到其極限 $X_\infty$。


#### 為何 $p>1$ 很重要？

在 $p>1$ 情況下，Doob’s maximal inequality 保證：

$$
\| X_n^* \|_p \le \frac{p}{p-1}\|X_n\|_p < \infty.
$$

有了這個界，就能：

1. 控制 sup-norm 行為（避免樣本路徑爆炸）
2. 控制 tail probability
3. 確保 uniform integrability（$p>1$ 自動保證 UI）
4. 使用 dominated convergence 推出 $L^p$ 收斂

因此 $p>1$ 是一個自然又強大的條件，使 martingale 理論更有力。


### 例子：$L^2$ bounded Martingale

令 $\{X_n\}$ 是 martingale 且

$$
\sup_n \mathbb{E}[X_n^2] < \infty.
$$

則：

- $p=2$，滿足定理假設  
- 所以存在 $X_\infty \in L^2$  
- 且

$$
X_n \to X_\infty \quad \text{a.s. and in } L^2 .
$$

這是實務上最常用的情形之一（例如：正規化的隨機漫步、branching process、濾波器估計等）。



### 例子：折現股票價格（金融數學）

在風險中立測度 $\mathbb{Q}$ 下，折現股票價格

$$
\tilde{S}_n = e^{-rn} S_n
$$

是 martingale。

如果（在很多模型下成立）

$$
\sup_n \mathbb{E}_{\mathbb{Q}}[|\tilde{S}_n|^p] < \infty,
$$

則立即得到：

- $\tilde{S}_n$ a.s. 收斂  
- 且 $\tilde{S}_n$ 在 $L^p$ 中收斂  

這是 Black–Scholes 類模型中推導長期資產行為的一個基礎。


### 小結

在這個章節中，我們看到：

- **Doob’s $L^p$ maximal inequality** 控制了 martingale/submartingale 的 sup 行為  
- 若 martingale 在某個 $p>1$ 空間中 bounded，則  
  - 它幾乎處處收斂  
  - 且在 $L^p$ 意義下收斂  
- 這讓 martingale 理論不只在路徑上穩定，也穩定於 $L^p$ 函數空間中

這些性質讓 martingale 成為研究隨機過程、隨機算法以及金融模型時不可或缺的工具。



## Optional Stopping Theorem（OST）

Optional Stopping Theorem 的核心精神是：

> 若一個過程本來就是「公平的」（martingale），那麼只要停的方式不太瘋狂，就算你自己選一個停的時間，這個遊戲依然保持公平。

這讓我們能計算許多 hitting probabilities、ruin probabilities 和預期停時，是分析隨機漫步的核心工具。



### Stopping Time

給定 filtration $\{\mathcal{F}_n\}$，隨機變數 $\tau$ 稱為 **stopping time**，若：

$$
\{\tau = n\} \in \mathcal{F}_n, \quad \forall n.
$$

也就是說：「是否在第 $n$ 步停下」只能依賴你目前看到的資訊，而不能偷看未來。

常見例子：
- first hitting time（第一次到達某個位置）
- gambler’s ruin time（破產時間）
- overshoot the boundary time（超過門檻的首次時間）

---

### Doob’s Optional Sampling Theorem

這是 OST 的基石，版本如下：

#### **定理（Doob's Optional Sampling Theorem）**
若 $\{X_n\}$ 是 supermartingale，且 $\sigma \le \tau$ 是 stopping times，並且滿足：

1. $\sigma, \tau < \infty$ a.s.  
2. $X_n$ 的負部有界：
   $$
   \sup_n \mathbb{E}[X_n^-] < \infty,
   $$

則：

$$
\mathbb{E}[X_\tau \mid \mathcal{F}_\sigma] \le X_\sigma.
$$

若 $\{X_n\}$ 是 martingale，則等號成立：

$$
\mathbb{E}[X_\tau \mid \mathcal{F}_\sigma] = X_\sigma.
$$

> **含意：** 在這些條件下，把 martingale 停兩次仍然是公平的。

---

### Optional Stopping Theorem

<!-- Durrett 書中列出 **三類最常見、最實用的條件**，只要其中一項成立，martingale 在停時仍然公平： -->

<!-- #### **定理（Optional Stopping Theorem）** -->
若 $\{X_n\}$ 是 martingale，$\tau$ 是 stopping time，且滿足任一條件：

1. **$\tau$ 有界：**  
   $$
   \tau \le N < \infty.
   $$
2. **$X_n$ 有 bounded increments，且 $\tau$ integrable：**  
   $$
   |X_{n+1} - X_n| \le K.
   $$
3. **martingale 在 $L^1$ 有界：**  
   $$
   \sup_n \mathbb{E}[|X_n|] < \infty.
   $$

則：

$$
\mathbb{E}[X_\tau] = \mathbb{E}[X_0].
$$

如果 $\{X_n\}$ 是 supermartingale，則：

$$
\mathbb{E}[X_\tau] \le \mathbb{E}[X_0].
$$

---



### 例子：Gambler’s Ruin

:::info
什麼是 **Gambler’s Ruin（賭徒破產問題）**？

一個賭徒玩一個公平的遊戲，每次贏或輸 1 元。
我們想知道：**他最終會破產的機率是多少？**

此模型是一個 simple symmetric random walk，
而「破產」或「贏到目標」的時刻正是一個 hitting time。
:::

考慮簡單對稱隨機漫步：

$$
S_n = \sum_{i=1}^n \xi_i,
\qquad
\xi_i = \pm 1 \text{ with probability } \tfrac{1}{2}.
$$

因為 $\mathbb{E}[\xi_i] = 0$，可知 ${S_n}$ 是 martingale。

假設賭徒初始資金為 0，
若跌到某個負數 a<0 則破產；
若上升到某個正數 b>0 則成功離場。

定義 hitting time（也是 stopping time）：

$$
\tau = \inf{ n \ge 0 : S_n = a \text{ or } S_n = b }.
$$

$\tau$ 是 bounded stopping time，因為隨機漫步必定在有限時間內到達區間端點，因此可套用 Optional Stopping Theorem（OST）。



#### 使用 Optional Stopping Theorem

因為 ${S_n}$ 是 martingale 且 $\tau$ 可接受 OST，因此：
$$
\mathbb{E}[S_\tau] = \mathbb{E}[S_0] = 0.
$$

而 $S_\tau$ 只可能是：

- b（成功到達上界）
- a（破產）

令
$$
p = \mathbb{P}(S_\tau = b),
\qquad
1 - p = \mathbb{P}(S_\tau = a).
$$

則：

$$
p\cdot b + (1-p)\cdot a = 0.
$$

解得 hitting probability：

$$
p = \frac{-a}{b - a}.
$$


#### 結果：Gambler’s Ruin hitting probabilities

* **最終到達 b 的機率**

$$
\mathbb{P}(S_\tau = b) = \frac{-a}{b - a}
$$

* **最終到達 a 的機率（破產機率）**

$$
\mathbb{P}(S_\tau = a)
= 1 - \frac{-a}{b - a}
= \frac{b}{b - a}
$$

這結果顯示：
距離哪個端點越近，就越容易先 hit 到那個端點。



<!-- ### 例子：Gambler’s Ruin

:::info
什麼是 Gambler’s Ruin（賭徒破產問題）？

一個賭徒與庄家對賭，每次贏或輸 1 元，問：他最終會破產的機率是多少？

Gambler’s Ruin 是 simple random walk（簡單隨機漫步），而 hitting time = 破產時間
:::

考慮簡單對稱隨機漫步：

$$
S_n = \sum_{i=1}^n \xi_i, \quad \xi_i = \pm 1.
$$

顯然 $\{S_n\}$ 是 martingale。

假設你有一筆資金，破產點是 $a<0$，贏到 $b>0$ 時離場。  
定義 stopping time：

$$
\tau = \inf\{ n : S_n = a \text{ or } S_n = b \}.
$$

這是一個 bounded stopping time（因為走到 $a$ 與 $b$ 必然有限步內完成），因此 OST 可直接套用：

$$
\mathbb{E}[S_\tau] = \mathbb{E}[S_0] = 0.
$$

而 $S_\tau$ 只可能是 $a$ 或 $b$：

$$
\mathbb{P}(S_\tau = b)\cdot b + \mathbb{P}(S_\tau = a)\cdot a = 0.
$$

解得：

$$
\mathbb{P}(S_\tau = b) = \frac{-a}{b - a}.
$$

這就是 gambler’s ruin 條件下 **最常用的 hitting probability**。

> 透過 OST，你完全不需要解差分方程。

---

### 例子：計算 hitting time 的期望

在隨機過程中，hitting time（也叫 first hitting time、first passage time）指的是：

> 隨機過程第一次到達某個集合（或某個點）的時間。
> 可以把它想成：
>「我觀察這個過程，它什麼時候第一次碰到我要的地方？」
> 這就是 hitting time。

同一個隨機漫步，考慮平方 function：

$$
X_n = S_n^2 - n.
$$

因為 $(S_n)$ increments 為 $\pm1$，所以 $|S_{n+1} - S_n| \le 1$，計算可得 $\{X_n\}$ 是 martingale。

令 $\tau$ 為 hitting time（像前例一樣），bounded increments 成立，因此 OST 可用：

$$
\mathbb{E}[S_\tau^2 - \tau] = \mathbb{E}[X_0] = 0.
$$

所以：

$$
\mathbb{E}[\tau] = \mathbb{E}[S_\tau^2].
$$

而 $S_\tau$ 只可能是 $a$ 或 $b$：

$$
\mathbb{E}[\tau] = a^2 \cdot \mathbb{P}(S_\tau=a)+ b^2 \cdot \mathbb{P}(S_\tau=b).
$$

帶入上一節的 hitting probability 即可算出 $\mathbb{E}[\tau]$。
 -->
---

### OST 為什麼強大？

- **提供 hitting probability 的瞬間計算**  
  不用守恆律、不用 PDE、不用差分方程，直接得到結果。
- **處理 hitting time 期望**, 適用於 random walk, branching process 等。  
- **證明許多不動點／harmonic function 性質**  
- **連結到 Brownian motion 的 harmonic measure**  
- **在金融數學中用來算 stopping time payoff**

只要你能構造一個 martingale + 合理的 stopping time，就能直接用 OST 得到極強的結果。

---

### 小結

Optional Stopping Theorem（OST）告訴我們：

> 停止策略不能擊敗 martingale，  
> 公平遊戲在合理的停時下仍然是公平的。

最重要的是：OST 是所有 hitting / ruin / stopping problems 的核心機制。
理解 OST = 能處理 80% 的 random walk hitting problems。




## Reference

- [Probability: Theory and Examples - Rick Durrett](https://sites.math.duke.edu/~rtd/PTE/PTE5_011119.pdf)
- [Martingale Convergence Theorem by MIT](https://ocw.mit.edu/courses/15-070j-advanced-stochastic-processes-fall-2013/66b6c8fdb52304e3777ce8286beaaf7d_MIT15_070JF13_Lec11Add.pdf)
- [Martingale convergence theorems by Columbia](https://www.columbia.edu/~ks20/6712-14/6712-14-Notes-MGCT.pdf)
- [On a quantum martingale convergence theorem](https://arxiv.org/abs/1504.03829)

