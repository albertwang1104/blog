---
title: Large sample theory for MLEs
order: 3
category:
  - Statistics
tag:
  - Study Note
---

<!-- # Large sample theory for MLEs -->

大樣本理論（Large Sample Theory）主要討論當樣本量很大時，最大概似估計（Maximum Likelihood Estimators, MLEs）的性質。這些性質包括一致性（Consistency）和漸近正態性（Asymptotic Normality），這兩個性質對於估計參數的可靠性和精確性非常重要。

### 一致性（Consistency）

一致性是指當樣本量 $n$ 趨於無窮大時，MLE $\hat{\theta}$ 會收斂到真實參數 $\theta_0$。換句話說，隨著樣本量的增加，估計值會越來越接近於真實值。數學上，可以表示為：
$$
\hat{\theta}_n \xrightarrow{P} \theta_0
$$
這裡的 $\xrightarrow{P}$ 表示以概率收斂。

#### 一致性的證明要點
- 假設對數概似函數 $\log L(\theta; X)$ 在真實參數 $\theta_0$ 附近是光滑的。
- 通過極大化對數概似函數來找到MLE，當樣本量 $n$ 增加時，對數概似函數的極大值點會趨於真實參數。

### 漸近正態性（Asymptotic Normality）

漸近正態性指的是當樣本量 $n$ 很大時，MLE $\hat{\theta}$ 服從於某個正態分布。具體來說，MLE的分布可以近似為正態分布：
$$
\sqrt{nI(\theta_0)}(\hat{\theta} - \theta_0) \xrightarrow{d} N(0, 1)
$$
這裡的 $\xrightarrow{d}$ 表示分布收斂， $I(\theta_0)$ 是在真實參數 $\theta_0$處的Fisher信息量。

#### 漸近正態性的證明要點
- 使用中心極限定理和大數法則來證明MLE的對數概似函數的二階導數和一階導數的行為。
- Fisher信息量 $I(\theta)$ 是對數概似函數的二階導數的期望值，度量了樣本提供的信息量。
- 將對數概似函數的一階導數（稱為得分函數）標準化，得到近似正態分布。

#### 步驟
1. 用MLE對 $\theta_0$ 進行估計得到 $\hat \theta$
2. 計算 $\theta_0$ 的 Fisher信息量 $I(\theta_0)$
3. 利用 $\hat \theta$ 在 $n \rightarrow \infty$ 的一致性和漸近正態性計算 $\theta_0$ 的$(1-\alpha)\%$信賴區間
$$
\left[\hat{\theta}-\frac{Z_{\frac{\alpha}{2}}}{\sqrt{nI(\theta_0)}}, \hat{\theta}+\frac{Z_{\frac{\alpha}{2}}}{\sqrt{nI(\theta_0)}}\right]
$$


### 例子

#### 正態分布的MLE
假設我們有一組來自正態分布 \( N(\mu, \sigma^2) \) 的樣本 \( X_1, X_2, \ldots, X_n \)。

MLE的計算：
- 對於 \(\mu\)，MLE為樣本均值 \(\hat{\mu} = \frac{1}{n} \sum_{i=1}^n X_i\)。
- 對於 \(\sigma^2\)，MLE為樣本方差 \(\hat{\sigma}^2 = \frac{1}{n} \sum_{i=1}^n (X_i - \hat{\mu})^2\)。

當樣本量 \( n \) 很大時，我們有：
\[ \sqrt{n}(\hat{\mu} - \mu) \xrightarrow{d} N\left(0, \sigma^2\right) \]
\[ \sqrt{n}(\hat{\sigma}^2 - \sigma^2) \xrightarrow{d} N\left(0, 2\sigma^4\right) \]

這些結果表明，當樣本量足夠大時，\(\hat{\mu}\) 和 \(\hat{\sigma}^2\) 會分別服從於均值為0，方差為 \(\sigma^2\) 和 \(2\sigma^4\) 的正態分布。

### 總結

大樣本理論給我們提供了MLE的一些重要性質，這些性質在實際應用中非常有用：
1. **一致性** 保證了當樣本量增加時，我們的估計值會越來越準確。
2. **漸近正態性** 讓我們可以在大樣本的情況下使用正態分布來近似MLE的分布，這對於構建置信區間和進行假設檢定非常有幫助。

這些性質使得MLE在統計推斷中具有強大的應用價值，特別是在樣本量較大的情況下。
