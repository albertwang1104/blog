---
title: Estimation of Parameters
order: 2
category:
  - Statistics
tag:
  - Study Note
---
<!-- # 點估計（Estimation of Parameters） -->

## 點估計的性質

### 一致性（Consistency）
一致性指的是當樣本數 $n$ 趨於無限大時，估計量 $\hat \theta$ 會以機率收斂於真實的參數值 $\theta$。即：
$$
\hat \theta \overset P \to \theta \text{ as } n \to \infty
$$
或
$$
P(|\hat \theta_n - \theta| \leq \epsilon) \underset {n \to \infty} \longrightarrow 1
$$
這意味著隨著樣本數量增加，估計量變得越來越精確，並且越來越接近於真實值 $\theta$。

### 無偏性（Unbiasedness）
無偏性指的是估計量的期望值等於真實的參數值 $\theta$。即：
$$
E[\hat{\theta}] = \theta
$$
這意味著在多次抽樣中，估計量的平均值應該等於被估計的參數值 $\theta$。

**Bias**
$$
E[\hat{\theta}] = \theta + B(\hat{\theta})
$$
**Mean Square Error (MSE)**

$$
\text{MSE}(\hat{\theta}) = E[(\hat{\theta} - \theta)^2] = \text{Var}(\hat{\theta}) + B(\hat{\theta})^2
$$

### 有效性（Efficiency）

有效性指的是在所有無偏估計量中，具有最小變異數的估計量。換句話說，如果 $\hat{\theta}_1$ 和 $\hat{\theta}_2$ 都是 $\theta$ 的無偏估計量，且 $\text{Var}(\hat{\theta}_1) < \text{Var}(\hat{\theta}_2)$，那麼 $\hat{\theta}_1$ 被認為比 $\hat{\theta}_2$ 更有效，表示 $\hat{\theta}_1$ 更能準確地估計 $\theta$。

### 充分性（Sufficiency）

充分性指的是一個統計量包含了關於母體參數 $\theta$ 的所有信息。如果統計量 $\hat{\theta}$ 是充分的，那麼給定 $\hat{\theta}$ 之後，樣本數據 $(X_1, X_2, \ldots, X_n)$ 與參數 $\theta$ 是獨立的。

對於統計量 $\hat{\theta} = T(X)$，若數據 $X$ 在已知 $\hat{\theta} = T(X)$ 時的條件分布不依賴於母數 $\theta$，則稱其是關於母數 $\theta$ 的充分統計量。

這意味著統計量 $\hat{\theta}$ 已經捕獲了樣本中關於 $\theta$ 的所有信息，沒有任何額外的信息可以從樣本數據中提取。

## 定理

### Fisher-Neyman factorization theorem
A statistic $T(\underline{X})$ is a sufficient statistic for $\theta$, if and only if there exists function $g(t|θ)$ and $h(x)$ such that, for all sample points x, and for all parameter points θ, $f_X(X|\theta) = g(T(X)|\theta)h(x).$


### Law of Large Number

#### Weak Law of Large Number


#### Strong Law of Large Number



### 中心極限定理 (Central Limit Theorem, CLT)

#### 定理內容
假設 $X_1, X_2, ..., X_n$ 是獨立且同分佈的隨機變量，其期望值為 $\mu$，方差為 $\sigma^2$。那麼，當 $n$ 趨於無窮大時，樣本均值的分佈近似於正態分佈，具體表現為：

$$
\frac{\bar{X} - \mu}{\sigma / \sqrt{n}} \xrightarrow{D} N(0, 1)
$$

其中 $\bar{X}$ 是樣本均值，$\xrightarrow{d}$ 表示收斂到分佈。

#### 證明
中心極限定理的證明過程相當複雜，一般需要使用特徵函數的方法。以下是其基本思路：

1. **標準化樣本均值**：
   將樣本均值標準化，即考慮 $Z_n = \frac{\bar{X} - \mu}{\sigma / \sqrt{n}}$。

2. **求取特徵函數**：
   考慮 $Z_n$ 的特徵函數 $\phi_{Z_n}(t) = E[e^{itZ_n}]$，其中 $i$ 是虛數單位。

3. **利用獨立性和同分佈性質**：
   由於 $X_i$ 是獨立同分佈的，可以將特徵函數分解為：

$$
\phi_{Z_n}(t) = \left( E\left[ e^{it \frac{X_1 - \mu}{\sigma / \sqrt{n}}} \right] \right)^n
$$

4. **使用 Taylor 展開**：
   對特徵函數進行 Taylor 展開，並考慮 $n$ 趨於無窮大時的行為。由於每個獨立項都趨近於標準正態分佈的特徵函數 $e^{-\frac{t^2}{2}}$。

5. **結論**：
   得到標準正態分佈的特徵函數 $e^{-\frac{t^2}{2}}$，根據 Levy 連續性定理，得出 $Z_n \xrightarrow{d} N(0, 1)$。
   
### Fisher Information
$$
I(\theta) = E\left[ \left( \frac{\partial}{\partial \theta} \ln f(X; \theta) \right)^2 \right]
$$

Under approximate smoothness condition, 

$$
I(\theta) = -E\left[ \frac{\partial^2}{\partial \theta^2} \ln f(X; \theta)\right]
$$

### Cramer-Rao 不等式 (Cramer-Rao Inequality)

#### 定理內容
給定參數 $\theta$ 的無偏估計量 $T$，其方差的下界由 Fisher 信息量 $I(\theta)$ 確定。具體表現為：
$$
\text{Var}(T) \geq \frac{1}{I(\theta)}
$$

其中 Fisher 信息量 $I(\theta)$ 定義為：
$$
I(\theta) = E\left[ \left( \frac{\partial}{\partial \theta} \ln f(X; \theta) \right)^2 \right]
$$

#### 證明
1. **Score 函數**：
   定義 Score 函數 $U(\theta) = \frac{\partial}{\partial \theta} \ln f(X; \theta)$，根據 Fisher 信息量的定義，有：

$$
I(\theta) = E[U(\theta)^2]
$$

2. **無偏性條件**：
   考慮無偏估計量 $T$，則 $E[T] = \theta$。根據無偏性的條件，可以得到：

$$
\frac{\partial}{\partial \theta} E[T] = 1
$$

3. **協方差表示**：
   將無偏估計量 $T$ 和 Score 函數 $U(\theta)$ 的協方差表示出來：

$$
\text{Cov}(T, U(\theta)) = E[TU(\theta)] - E[T]E[U(\theta)]
$$

4. **無偏估計量的特性**：
   由於 $E[U(\theta)] = 0$，則有：

$$
\text{Cov}(T, U(\theta)) = E[TU(\theta)]
$$

5. **Cauchy-Schwarz 不等式**：
   利用 Cauchy-Schwarz 不等式，有：

$$
\text{Var}(T) \geq \frac{(\text{Cov}(T, U(\theta)))^2}{\text{Var}(U(\theta))}
$$

6. **下界結論**：
   將 $\text{Var}(U(\theta)) = I(\theta)$ 代入，得到：

$$
\text{Var}(T) \geq \frac{1}{I(\theta)}
$$

### Rao-Blackwell Theorem

#### 定理內容

給定一個參數 $\theta$ 的估計量 $\hat{\theta}$ 和一個充分統計量 $T$，則 $\hat{\theta}$ 的條件期望 $E[\hat{\theta} | T]$ 是 $\theta$ 的新估計量，並且 $E[\hat{\theta} | T]$ 的方差不大於 $\hat{\theta}$ 的方差。即

$$
\text{Var}(\hat{\theta}) \geq \text{Var}(E[\hat{\theta} | T])
$$

#### 證明

1. **充分統計量**：
   設 $T$ 是 $\theta$ 的充分統計量，則 $\hat{\theta}$ 的條件期望 $E[\hat{\theta} | T]$ 也是 $\theta$ 的估計量。
2. **無偏性**：
   由於 $\hat{\theta}$ 是無偏估計量，則有 $E[\hat{\theta}] = \theta$。根據充分性，$E[\hat{\theta} | T]$ 也是無偏估計量，即：

$$
E[E[\hat{\theta} | T]] = E[\hat{\theta}] = \theta
$$
3. **變異比較**：
   使用變異分解公式：

$$
\text{Var}(\hat{\theta}) = E[\text{Var}(\hat{\theta} | T)] + \text{Var}(E[\hat{\theta} | T])
$$

4. **非負性**：
   因為 $E[\text{Var}(\hat{\theta} | T)] \geq 0$，所以：

$$
\text{Var}(\hat{\theta}) \geq \text{Var}(E[\hat{\theta} | T])
$$

5. **結論**：
   因此，條件期望 $E[\hat{\theta} | T]$ 的方差不大於 $\hat{\theta}$ 的方差，即：

$$
\text{Var}(E[\hat{\theta} | T]) \leq \text{Var}(\hat{\theta})
$$

# 點估計方法

## 動差法（Method of Moments, MME）

動差法的想法很簡單, 以 $𝑘$ 階的樣本動差 $m^k = \frac{1}{n} \sum_{i=1}^n X_i^k$ 估計 𝑘 階動差 $𝜇_𝑘(\theta)=𝐸(𝑋^𝑘)$, 得到動差方程式

$$
\begin{align*}
m_1 &= \frac{1}{n} \sum_{i=1}^n X_i \\
m_2 &= \frac{1}{n} \sum_{i=1}^n X_i^2 \\
 &\vdots \\
m_k &= \frac{1}{n} \sum_{i=1}^n X_i^k \\
\end{align*}
$$

由此方程式解出 $\theta$ 的解 $\hat\theta$ (以 $m_1, m_2, \cdots , m_k$ 的函數表示)當做 $\theta$ 的估計, 稱為動差法估計量.

## 最大似然估計法（Maximum Likelihood Estimation, MLE）

最大概似估計的想法是將隨機樣本的聯合分佈函數 $𝑓(𝑥|\theta)$ 視為未知參數 $\theta$ 的函數, 給定樣本實現值 $x$ 下, 以 $𝐿(\theta|𝑥)$ 表示此函數, 並稱為概似函數(Likelihood function), 欲找到一個適合的 $\hat\theta$ 使 $𝐿(\theta|𝑥)$ 達到最大值, 作為 $\theta$ 的估計。

若 $X_1, X_2, \cdots, X_n$ 獨立且同分佈, 概似函數就會是

$$
L(\theta) = f(X_1, X_2, \cdots, X_n|\theta) = \prod_{i=1}^n f(\theta|X_i) 
$$

而通常為了計算上的方便, 我們會將目標函數改為對數概似函數(Log-likelihood function)

$$
l(\theta) = \sum_{i = 1}^n \ln f(\theta|X_i)
$$

那 $\theta$ 的 MLE 即為：

$$
\hat\theta = \arg \max_{\theta} l(\theta)
$$


