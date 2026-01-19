---
title: Chapter 1. The Wave Function
order: 1
date: 2026-01-19
category:
  - Quantum
tag:
  - Study Note
---

## 薛丁格方程式 (The Schrödinger Equation)

在古典力學中，目標是透過牛頓第二定律（$F=ma$）配合初始條件來確定粒子的位置 $x(t)$。量子力學則採取完全不同的方法，尋找粒子的**波函數（Wave function）** $\Psi(x, t)$，並透過解**薛丁格方程式**來獲得：
$$i\hbar \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2} + V\Psi$$
其中 $i$ 是虛數單位，$\hbar$ 是約化普朗克常數（$h/2\pi \approx 1.05 \times 10^{-34} \text{ J s}$）。薛丁格方程式在邏輯上類比於牛頓第二定律，只要給定初始條件 $\Psi(x, 0)$，它就能決定未來任何時間的波函數 $\Psi(x, t)$。

<!-- more -->

## 統計詮釋 (The Statistical Interpretation)
波函數 $\Psi$ 本身是擴散在空間中的函數，但粒子在本質上是點狀的。根據波恩（Born）的**統計詮釋**，波函數絕對值的平方 $|\Psi(x, t)|^2$ 代表**機率密度**。具體而言，在時間 $t$ 於 $x$ 到 $x+dx$ 之間找到粒子的機率為：
$$|\Psi(x, t)|^2 dx$$
這引入了量子力學的**不確定性（Indeterminacy）**。對於測量前的粒子狀態，物理學界主要有三種觀點：
1.  **實在論（Realist）**：認為粒子原本就在某處，量子力學是不完備的，需要「隱變量」來描述。
2.  **正統觀點（Orthodox）**：又稱哥本哈根詮釋，認為測量前粒子**不在任何地方**，是測量行為強迫粒子「表態」。
3.  **不可知論（Agnostic）**：拒絕回答測量前的狀態。
貝爾定理（Bell's theorem）之後的實驗已證實**正統觀點是正確的**。此外，測量行為會導致**波函數塌縮（Collapse of the wave function）**，使波函數瞬間變為一個尖峰。

## 機率 (Probability)
量子力學廣泛應用機率理論。以下是核心概念：
*   **期望值（Expectation Value）**：標記為 $\langle j \rangle$，代表對大量完全相同的系統進行測量所得結果的平均值，而非單次測量最可能的結果。
*   **標準差（Standard Deviation）**：標記為 $\sigma$，用來衡量機率分布的「擴散」程度。其計算公式為 $\sigma^2 = \langle j^2 \rangle - \langle j \rangle^2$。
*   **連續分布**：引入機率密度 $\rho(x)$，在區間 $a$ 到 $b$ 找到粒子的機率為 $P_{ab} = \int_a^b \rho(x) dx$。

## 歸一化 (Normalization)
由於粒子在空間中一定存在於某處，因此在全空間找到粒子的總機率必須等於 1，這稱為**歸一化條件**：
$$\int_{-\infty}^{+\infty} |\Psi(x, t)|^2 dx = 1$$


假設我在時間 $t = 0$ 時將波函數歸一化了。我該如何知道隨著時間流逝和 $\Psi$ 的演化，它會保持歸一化狀態？幸運的是，薛丁格方程式具有一個性質，即它會自動保留波函數的歸一化——如果沒有這個關鍵特徵，薛丁格方程式將與統計詮釋不相容，整個理論也會瓦解。 所以我們接下來仔細證明這一點：
<!-- （你不能一直對波函數重新歸一化，因為那樣 $A$ 就會變成 $t$ 的函數，你就不再擁有薛丁格方程式的解了。）  -->

$$\frac{d}{dt} \int_{-\infty}^{+\infty} |\Psi(x, t)|^2 dx = \int_{-\infty}^{+\infty} \frac{\partial}{\partial t} |\Psi(x, t)|^2 dx$$
> 注意，積分僅是 $t$ 的函數，所以在第一項使用全導數 ($d/dt$)，但被積函數同時是 $x$ 與 $t$ 的函數，所以在第二項使用偏導數 ($\partial/\partial t$)。

根據乘積法則：

$$\frac{\partial}{\partial t} |\Psi|^2 = \frac{\partial}{\partial t} (\Psi^* \Psi) = \Psi^* \frac{\partial \Psi}{\partial t} + \frac{\partial \Psi^*}{\partial t} \Psi$$

現在薛丁格方程式說明：

$$\frac{\partial \Psi}{\partial t} = \frac{i\hbar}{2m} \frac{\partial^2 \Psi}{\partial x^2} - \frac{i}{\hbar} V\Psi$$
以及其共軛複數：

$$\frac{\partial \Psi^*}{\partial t} = -\frac{i\hbar}{2m} \frac{\partial^2 \Psi^*}{\partial x^2} + \frac{i}{\hbar} V\Psi^*$$

因此：

$$\frac{\partial}{\partial t} |\Psi|^2 = \frac{i\hbar}{2m} \left( \Psi^* \frac{\partial^2 \Psi}{\partial x^2} - \frac{\partial^2 \Psi^*}{\partial x^2} \Psi \right) = \frac{\partial}{\partial x} \left[ \frac{i\hbar}{2m} \left( \Psi^* \frac{\partial \Psi}{\partial x} - \frac{\partial \Psi^*}{\partial x} \Psi \right) \right]$$
積分現在可以顯式計算：


$$\frac{d}{dt} \int_{-\infty}^{+\infty} |\Psi(x, t)|^2 dx = \frac{i\hbar}{2m} \left( \Psi^* \frac{\partial \Psi}{\partial x} - \frac{\partial \Psi^*}{\partial x} \Psi \right) \bigg|_{-\infty}^{+\infty}$$
但當 $x$ 趨於 ($\pm$) 無窮大時，$\Psi(x, t)$ 必須趨於零——否則波函數將無法歸一化。 由此可知：


$$\frac{d}{dt} \int_{-\infty}^{+\infty} |\Psi(x, t)|^2 dx = 0 $$

:::info
因此可知薛丁格方程式具有一項關鍵特性：如果波函數在 $t=0$ 時已歸一化，則方程式演化會自動保持歸一化狀態隨時間不變。數學上可滿足的狀態必須是 **平方可積（Square-integrable）** 的函數。
:::

## Momentum
<!-- 在量子力學中，物理量由 **算符（Operators）** 代表，透過將算符夾在 $\Psi^*$ 與 $\Psi$ 之間並積分來計算期望值：
*   **位置期望值**：$\langle x \rangle = \int x |\Psi|^2 dx$。
*   **動量期望值**：$\langle p \rangle = m \frac{d\langle x \rangle}{dt} = \int \Psi^* \left( \frac{\hbar}{i} \frac{\partial}{\partial x} \right) \Psi dx$。
由此可知，**位置算符**為 $\hat{x} = x$，而**動量算符**為 $\hat{p} = \frac{\hbar}{i} \frac{\partial}{\partial x}$。任何物理量 $Q(x, p)$ 的期望值皆可寫為 $\langle Q(x, p) \rangle = \int \Psi^* \hat{Q} \Psi dx$。 -->

在量子力學中，位置期望值 $\langle x \rangle$ 的物理意義**並非**對「單一粒子」進行重複測量的平均值。在測量後將會使波函數塌縮（collapse）到實際測得的那個數值上的一個尖峰，第一次測量會使波函數塌縮到某個確定的數值，隨後的重複測量只會得到相同的結果。實際上，$\langle x \rangle$ 對一整套系綜（Ensemble）——即無數個處於相同狀態 $\Psi$ 的獨立系統——同時進行測量所得結果的統計平均值。

我們從位置期望值隨時間的變化率 $d\langle x \rangle / dt$ 開始推導動量算符的表現形式。

首先，位置期望值為

$$\langle x \rangle = \int_{-\infty}^{+\infty} x |\Psi|^2 \, dx$$

根據定義，位置隨時間的變化率為

$$\frac{d\langle x \rangle}{dt} = \frac{d}{dt} \int x |\Psi|^2 \, dx = \int x \frac{\partial}{\partial t} |\Psi|^2 \, dx \quad \text{}$$

根據前面歸一化中的[證明]()可得
<!-- 利用機率流連續方程式 $\frac{\partial |\Psi|^2}{\partial t} = -\frac{\partial J}{\partial x}$，其中 $J$ 為機率流密度： -->

$$\frac{d\langle x \rangle}{dt} = \frac{i\hbar}{2m} \int x \frac{\partial}{\partial x} \left( \Psi^* \frac{\partial \Psi}{\partial x} - \frac{\partial \Psi^*}{\partial x} \Psi \right) dx \quad \text{}$$

<!-- 第二步：第一次分部積分 -->
利用分部積分法 $\int u \, dv = uv - \int v \, du$，令 $u = x$，$dv = \frac{\partial}{\partial x} (\dots) dx$。由於 $\Psi$ 在無窮遠處趨近於 0，邊界項消失：

$$\frac{d\langle x \rangle}{dt} = -\frac{i\hbar}{2m} \int \left( \Psi^* \frac{\partial \Psi}{\partial x} - \frac{\partial \Psi^*}{\partial x} \Psi \right) dx \quad \text{}$$

<!-- 第三步：第二次分部積分（簡化第二項） -->
針對被積函數中的第二項 $-\int \frac{\partial \Psi^*}{\partial x} \Psi \, dx$，再次使用分部積分（將導數從 $\Psi^*$ 轉移到 $\Psi$）：


$$-\int \frac{\partial \Psi^*}{\partial x} \Psi \, dx = \int \Psi^* \frac{\partial \Psi}{\partial x} \, dx \quad \text{}$$

將此結果代回原式，括號內的兩項變為相同：


$$\frac{d\langle x \rangle}{dt} = -\frac{i\hbar}{2m} \left( 2 \int \Psi^* \frac{\partial \Psi}{\partial x} dx \right) = \frac{\hbar}{im} \int \Psi^* \frac{\partial \Psi}{\partial x} dx \quad \text{}$$
### 定義動量期望值
假定速度期望值 $\langle v \rangle = \frac{d\langle x \rangle}{dt}$，則動量期望值 $\langle p \rangle = m\langle v \rangle$：


$$\langle p \rangle = m \left( \frac{\hbar}{im} \int \Psi^* \frac{\partial \Psi}{\partial x} dx \right) = \int \Psi^* \left( \frac{\hbar}{i} \frac{\partial}{\partial x} \right) \Psi \, dx \quad \text{}$$

### 算符化（Operator Formulation）
透過上述推導，我們可以提取出物理量的算符概念。

| 物理量 | 符號 | 算符 (Operator) |
|---|---|---|
| 位置 | $x$ | $\hat{x} = x$ |
| 動量 | $p$ | $\hat{p} = \frac{\hbar}{i}\frac{\partial}{\partial x}$|
| 動能 | $T$ | $\hat{T} = \frac{\hat{p}^2}{2m} = -\frac{\hbar^2}{2m} \frac{\partial^2}{\partial x^2}$|

### 一般物理量的期望值
對於任何依賴於位置與動量的動力學量 $Q(x, p)$，其期望值的計算方法為將算符夾在波函數與其共軛複數之間：


$$\langle Q(x, p) \rangle = \int \Psi^* Q\left(x, \frac{\hbar}{i} \frac{\partial}{\partial x}\right) \Psi \, dx \quad \text{}$$
這個公式在量子力學中被視為一項公理或基本配方，是後續所有物理計算的基石。


## 海森堡不確定性原理 (The Uncertainty Principle)
粒子的位置與動量（透過波長 $\lambda$ 與德布羅意公式 $p = h/\lambda$ 聯繫）之間存在不可避免的權衡關係。這被量化為**海森堡不確定性原理**：
$$\sigma_x \sigma_p \ge \frac{\hbar}{2}$$
這代表越精確地確定粒子的位置，其動量就越不確定，反之亦然。這並非測量儀器的缺點，而是**波的本質屬性**。


## Exercise

:::info
A particle of mass $m$ is in the state

$$\Psi(x, t) = A e^{-a[(mx^2/\hbar) + it]}$$

where $A$ and $a$ are positive real constants.
(1) Find $A$.
(2) For what potential energy function $V(x)$ does $\Psi$ satisfy the Schrödinger equation?
(3) Calculate the expectation values of $x$, $x^2$, $p$, and $p^2$.
(4) Find $\sigma_x$ and $\sigma_p$. Is their product consistent with the uncertainty principle?
:::

<!-- ### Solution -->
首先，為了方便計算，我們將波函數的實部（空間部分）與虛部（時間部分）分開寫：


$$\Psi(x, t) = A e^{-\frac{amx^2}{\hbar}} e^{-iat}$$
### **1. 求歸一化常數 $A$**
根據歸一化條件，粒子在全空間出現的總機率為 1：

$$\int_{-\infty}^{\infty} |\Psi(x, t)|^2 \, dx = 1$$
計算機率密度函數 $|\Psi|^2$：


$$|\Psi|^2 = \Psi^* \Psi = \left( A e^{-\frac{amx^2}{\hbar}} e^{iat} \right) \left( A e^{-\frac{amx^2}{\hbar}} e^{-iat} \right) = A^2 e^{-\frac{2am}{\hbar}x^2}$$
利用高斯積分公式 $\int_{-\infty}^{\infty} e^{-\lambda x^2} dx = \sqrt{\frac{\pi}{\lambda}}$，其中 $\lambda = \frac{2am}{\hbar}$：


$$\int_{-\infty}^{\infty} |\Psi(x, t)|^2 \, dx = A^2 \sqrt{\frac{\pi}{\frac{2am}{\hbar}}} = 1 \implies A^2 \sqrt{\frac{\pi \hbar}{2am}} = 1$$
解出 $A$：


$$A = \left( \frac{2am}{\pi \hbar} \right)^{1/4}$$

### **2. 求位能函數 $V(x)$**
將波函數代入含時薛丁格方程式 (Time-Dependent Schrödinger Equation)：


$$i\hbar \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2} + V(x)\Psi$$
- 計算時間導數 (左式):


$$\frac{\partial \Psi}{\partial t} = -ia \Psi$$

$$\text{LHS} = i\hbar (-ia) \Psi = \hbar a \Psi$$
- 計算空間導數 (右式):


$$\frac{\partial \Psi}{\partial x} = \left( -\frac{2amx}{\hbar} \right) \Psi$$

$$\frac{\partial^2 \Psi}{\partial x^2} = \frac{\partial}{\partial x} \left[ \left( -\frac{2amx}{\hbar} \right) \Psi \right] = \left( -\frac{2am}{\hbar} \right) \Psi + \left( -\frac{2amx}{\hbar} \right)^2 \Psi$$

$$\frac{\partial^2 \Psi}{\partial x^2} = \left[ -\frac{2am}{\hbar} + \frac{4a^2m^2x^2}{\hbar^2} \right] \Psi$$
- 代回薛丁格方程式:


$$\hbar a \Psi = -\frac{\hbar^2}{2m} \left[ -\frac{2am}{\hbar} + \frac{4a^2m^2x^2}{\hbar^2} \right] \Psi + V(x)\Psi$$
消去 $\Psi$ 並化簡：


$$\hbar a = \left( \frac{\hbar^2}{2m} \cdot \frac{2am}{\hbar} \right) - \left( \frac{\hbar^2}{2m} \cdot \frac{4a^2m^2x^2}{\hbar^2} \right) + V(x)$$

$$\hbar a = \hbar a - 2ma^2 x^2 + V(x)$$
移項求解 $V(x)$：


$$V(x) = 2ma^2 x^2$$
> 這是一個簡諧振子位能 ($V=\frac{1}{2}kx^2$)，其中 $k = 4ma^2$。

### **3. 計算期望值**
利用機率密度 $|\Psi|^2 = A^2 e^{-\frac{2am}{\hbar}x^2}$ (這是一個偶函數)。
- $\langle x \rangle$：由於積分區間對稱且被積函數 $x|\Psi|^2$ 為奇函數：

$$\langle x \rangle = \int_{-\infty}^{\infty} x |\Psi|^2 \, dx = 0$$
-  $\langle x^2 \rangle$：利用公式 $\int_{-\infty}^{\infty} x^2 e^{-\lambda x^2} dx = \frac{1}{2\lambda}\sqrt{\frac{\pi}{\lambda}}$，且已知 $A^2\sqrt{\frac{\pi}{\lambda}}=1$：


$$\langle x^2 \rangle = \int_{-\infty}^{\infty} x^2 |\Psi|^2 \, dx = \frac{1}{2\lambda} = \frac{1}{2(2am/\hbar)} = \frac{\hbar}{4am}$$
- $\langle p \rangle$

$$\langle p \rangle = m \frac{d\langle x \rangle}{dt}$$

因為 $\langle x \rangle = 0$ 為常數，故：


$$\langle p \rangle = 0$$
- $\langle p^2 \rangle$：利用 $p^2$ 的期望值定義：


$$\langle p^2 \rangle = \int \Psi^* \left( -\hbar^2 \frac{\partial^2}{\partial x^2} \right) \Psi \, dx$$

或者利用更簡便的關係，由於 $|\frac{\partial \Psi}{\partial x}|^2 = (\frac{2amx}{\hbar})^2 |\Psi|^2$：


$$\langle p^2 \rangle = \int | -i\hbar \frac{\partial \Psi}{\partial x} |^2 dx = \hbar^2 \int \frac{4a^2m^2x^2}{\hbar^2} |\Psi|^2 dx$$

$$\langle p^2 \rangle = 4a^2m^2 \langle x^2 \rangle = 4a^2m^2 \left( \frac{\hbar}{4am} \right) = am\hbar$$
總結:
- $\langle x \rangle = 0$
- $\langle x^2 \rangle = \frac{\hbar}{4am}$
- $\langle p \rangle = 0$
- $\langle p^2 \rangle = am\hbar$

### 4. 不確定性原理 (Uncertainty Principle)
計算標準差 $\sigma = \sqrt{\langle Q^2 \rangle - \langle Q \rangle^2}$。
- 計算 $\sigma_x$ 和 $\sigma_p$:


$$\sigma_x = \sqrt{\frac{\hbar}{4am} - 0^2} = \sqrt{\frac{\hbar}{4am}}$$

$$\sigma_p = \sqrt{am\hbar - 0^2} = \sqrt{am\hbar}$$
- 驗證乘積:


$$\sigma_x \sigma_p = \sqrt{\frac{\hbar}{4am}} \cdot \sqrt{am\hbar} = \sqrt{\frac{\hbar \cdot am\hbar}{4am}} = \sqrt{\frac{\hbar^2}{4}} = \frac{\hbar}{2}$$

結論：海森堡不確定性原理指出 $\sigma_x \sigma_p \geq \frac{\hbar}{2}$。
> 此波函數的乘積恰好等於 $\frac{\hbar}{2}$，符合不確定性原理（這是高斯波包的特性，即最小不確定性態）。
