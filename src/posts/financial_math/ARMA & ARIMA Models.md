---
icon: material-symbols:family-star
# cover: /assets/images/cover1.jpg
date: 2025-02-26
category:
   - financial math
tag: 
   - financial math
   - Study Note
---


# ARMA & ARIMA Models

時間序列分析（Time Series Analysis）主要研究隨時間變化的資料結構、性質及其預測方法。數學上，我們通常考慮一個定義在離散時間 $t \in \mathbb{Z}$ 上的隨機過程 $\{X_t\}$，並探討其統計性質、動態結構及模型建構。

<!-- more -->

## Definition

<!-- ### 隨機過程與平穩性 -->

### 時間序列（Time Series)

A stochastic process $\{X_t : t \in \mathbb{Z}\}$ consisting of random variables indexed by time index t is a time series.

### 隨機過程 (stochastic process)

考慮一列隨機變數 $\{X_t : t \in \mathbb{Z}\}$，每個 $X_t$ 都定義在某個機率空間 $(\Omega, \mathcal{F}, P)$ 上。此過程的聯合分布為  

$$
P\left(X_{t_1} \in A_1, \, X_{t_2} \in A_2, \, \dots, \, X_{t_k} \in A_k\right), \quad \forall\, t_1, t_2, \dots, t_k \in \mathbb{Z}.
$$

That is all finite-dimensional distributions of $\{X_t\}$.

### 強平穩（Strict Stationarity）

$\{X_t\}$ is Strictly Stationary if $\forall \tau \in \mathbb{Z}$, $\forall t_1, t_2, \dots, t_k$, $\forall k$
$$
P\left(X_{t_1+ \tau}, \, X_{t_2+ \tau} , \, \dots, \, X_{t_k+ \tau}\right) = P\left(X_{t_1}, \, X_{t_2} , \, \dots, \, X_{t_k} \right)
$$
or
$$
(X_{t_1}, X_{t_2}, \dots, X_{t_k}) \overset{d}{=} (X_{t_1+h}, X_{t_2+h}, \dots, X_{t_k+h}).
$$


### 弱平穩（Covariance Stationarity / Second-Order Stationarity）

A time series $\{X_t\}$ is **Covariance Stationary** if
- $\mathbb{E}[X_t] = \mu$ is constant for all time t.
- $\operatorname{Var}(X_t) = \sigma^2_X$
- $\operatorname{Cov}(X_t,X_{t+\tau})=\gamma(\tau)$, 表示 covariance 只跟時間差有關。
    The auto-correlation function of $\{X_t\}$ is defined by
    $$
    \rho (\tau) = \frac{\operatorname{Cov}(X_t,X_{t+\tau})}{\sqrt{\operatorname{Var}(X_t)\operatorname{Var}(X_{t+\tau})}} = \frac{\gamma(\tau)}{\gamma (0)}
    $$




## Wold Representation Theorem

Wold Representation Theorem 提供了任何零均值、平穩過程的一個重要分解形式。

### Wold Representation Theorem

Any zero-mean covariance stationary time series $\{X_t\}$ and $\sum_{h=-\infty}^{\infty} |\gamma(h)| < \infty$ can be decomposed as
$$
X_t = S_t + V_t = \sum_{j=0}^{\infty} \psi_j \epsilon_{t-j} + V_t, \quad \forall\, t,
$$

where
- $\{V_t\}$ is a linearly deterministic process, i.e., a linear combination of past values of $\{V_t\}$ with constant coeﬃcients.
- $S_t = \sum_{j=0}^{\infty} \psi_j \epsilon_{t-j}$ is an infinite moving average process of error terms, where
    - $\sum_{j=0}^{\infty} \psi_j^2 < \infty, \, \psi_0 = 1$
    - $\{\epsilon_t\}$ is linearly unpredictable white noise, i.e. $$\mathbb{E}[\epsilon_t] = 0,\quad  \operatorname{Var}(\epsilon_t) = \sigma^2_\epsilon, \quad \mathbb{E}[\epsilon_s\epsilon_t] = 0, \forall s \neq t$$
    - $\{\epsilon_t\}$ is uncorrelated with $\{V_t\}$ i.e. $\mathbb{E}[\epsilon_tV_t] = 0$.
    

> 這個定理表示任何平穩過程均可分解為一個移動平均項 $V_t$ 以及一個根據過去的值預測出來的部分 $S_t$。


<!-- 對於純隨機過程，則有  
$$
X_t = \sum_{j=0}^{\infty} \psi_j \epsilon_{t-j}.
$$
 -->


## Lag Operator

**Lag Operator (延遲算子)** 是時間序列分析中的一個重要工具，用於簡化滯後項的表示。

### 定義

Lag Operator $L$ 是一種線性算子，其作用是將時間序列的索引延遲（或滯後）一個單位時間。對於一個時間序列 $\{X_t\}$，滯後算子的作用定義為：
$$
L(X_t) = X_{t-1}.
$$


### 性質

1. **高階滯後**：
   滯後算子可以疊加使用，表達多步滯後。對於任意正整數 $k$，
   $$
   L^k(X_t) = X_{t-k}.
   $$
   Inverses of these operators are well defined as:
   $$
   L^{-k}(X_t) = X_{t+k}.
   $$
2. **恆等性**：
   $$
   L^0(X_t) = X_t.
   $$
3. **線性性**：
   滯後算子對於常數加權和具有線性性質。對於兩個時間序列 $\{X_t\}$ 和 $\{Y_t\}$，以及常數 $a$ 和 $b$，有：
   $$
   L(aX_t + bY_t) = aL(X_t) + bL(Y_t).
   $$



## ARMA Models

自回歸移動平均（Autoregressive Moving Average, ARMA）模型是時序分析中常用來刻畫平穩過程動態行為的模型。一般的 ARMA $(p,q)$ 模型定義為：

$$
X_t = \phi_1 X_{t-1} + \phi_2 X_{t-2} + \cdots + \phi_p X_{t-p} + \epsilon_t + \theta_1 \epsilon_{t-1} + \theta_2 \epsilon_{t-2} + \cdots + \theta_q \epsilon_{t-q},
$$
或用 lag operator 表示：
$$
\phi(L) X_t = \theta(L) \epsilon_t,
$$
其中：
- $\phi(L) = 1 - \phi_1 L - \phi_2 L^2 - \cdots - \phi_p L^p$ 為自回歸（AR）部分；
- $\theta(L) = 1 + \theta_1 L + \theta_2 L^2 + \cdots + \theta_q L^q$ 為移動平均（MA）部分；
- $\{\epsilon_t\}$ 為白雜訊序列，$\epsilon_t \sim WN(0, \sigma^2)$。

**條件與性質**：
- **平穩性條件**：對 AR 部分，要求多項式 $\phi(z)=0$ 的根均在單位圓外（即 $|z|>1$）。
- **可逆性條件**：對 MA 部分，要求多項式 $\theta(z)=0$ 的根均在單位圓外。

在符合上述條件下，ARMA 模型可以看作是 Wold 表示定理的有限參數化特例。



## ARIMA Model

ARIMA 模型（Autoregressive Integrated Moving Average）是 ARMA 模型的推廣，適用於非平穩時序資料。其基本想法是透過差分運算將非平穩序列轉換為平穩序列，再建立 ARMA 模型。

設原始序列為 $\{Y_t\}$，若經過 $d$ 次差分後得到平穩序列 $\{X_t\}$：
$$
X_t = \Delta^d Y_t,
$$
其中差分算子定義為

$$
\Delta Y_t = Y_t - Y_{t-1} = Y_t - L(Y_t) = (1-L)(Y_t) = \Delta Y_t, \quad \Delta^d = (1-L)^d.
$$

則 ARIMA $(p,d,q)$ 模型可表示為：
$$
\phi(L) \Delta^d Y_t = \theta(L) \epsilon_t,
$$

其中：
- $\phi(L)$ 與 $\theta(L)$ 定義同 ARMA 模型；
- $d$ 為整數，表示差分的次數，使得 $\Delta^d Y_t$ 為平穩序列。



## Testing for Stationarity/Non-Stationarity

在實際應用中，判斷資料是否平穩是建模的前提之一。常用的檢驗方法包括：

1. **單位根檢定（Unit Root Test）**：
   
   - **Augmented Dickey-Fuller (ADF) 檢定**：  
     ADF 檢定檢驗虛無假設 $H_0$ 為序列存在單位根（即非平穩），其基本迴歸式為
     $$
     \Delta X_t = \alpha + \beta t + \gamma X_{t-1} + \sum_{i=1}^{k} \delta_i \Delta X_{t-i} + \epsilon_t.
     $$
     此處，若 $\gamma = 0$ 則表示單位根存在。檢驗統計量為 $\hat{\gamma}/\operatorname{SE}(\hat{\gamma})$，並與相應的臨界值比較。
   
   - **Phillips-Perron (PP) 檢定**：  
     類似於 ADF，但對序列的自相關與異方差做出不同修正，使用非參數方法修正檢定統計量。

2. **平穩性檢定**：
   
   - **KPSS 檢定（Kwiatkowski-Phillips-Schmidt-Shin）**：  
     與單位根檢定相反，KPSS 檢定的虛無假設 $H_0$ 為序列平穩。檢定基於序列殘差的累積和與長期變異數的比值，檢驗統計量通常形式為
     $$
     \eta = \frac{1}{T^2} \sum_{t=1}^{T} S_t^2 \bigg/ \hat{\sigma}^2,
     $$
     其中 $S_t = \sum_{i=1}^{t} \hat{\epsilon}_i$ 為累積和，$\hat{\sigma}^2$ 為長期變異數的估計。

3. **其他圖形與自相關分析**：
   
   - **ACF/PACF 分析**：自相關函數（ACF）與偏自相關函數（PACF）的圖形檢查，可提供是否存在趨勢或週期性結構的直觀證據。
   - **結構變化檢定**：例如 Chow 檢定，可用來檢查時序資料中是否存在結構性轉變，這也是非平穩性的可能來源之一。

綜上，通過上述檢定方法，可以確定時序資料是否平穩，從而指導後續模型的建立（例如是否需要差分轉換）。

## Estimation of the parameters of an ARMA model

有了 ARMA model 和 ARIMA model 後，接下來利用數據來估計模型參數 $\theta, \phi, \sigma^2$。因為 ARIMA 和 ARMA 相似，所以下面考慮的是 ARMA(p, q)。

ARMA(p, q) 的一般形式為：
$$
x_t = \sum_{i=1}^{p} \phi_i x_{t-i} + \epsilon_t + \sum_{j=1}^{q} \theta_j \epsilon_{t-j}
$$
其中：
- $\phi_i$ 是自回歸 (AR) 參數
- $\theta_j$ 是移動平均 (MA) 參數
- $\epsilon_t \sim WN(0, \sigma^2)$ 是白噪聲

### 1. Two-Step Regression Estimation

#### Step 1：估計殘差 $\epsilon_t$

使用滯後變數 $x_{t-j}$ 進行回歸：
$$
x_t = \sum_{j=1}^{m} \pi_j x_{t-j} + \epsilon_t
$$
利用最小二乘法（OLS）估計 $\pi_j$：
$$
\hat{\pi} = (X^T X)^{-1} X^T y
$$
其中：
- $X$ 是設計矩陣，包含 $x_{t-j}$ 的值
- $y$ 是當前的 $x_t$
- $\hat{\pi}$ 是回歸係數的估計值
- $\epsilon_t$ 是殘差

估計出 $\hat{\pi}$ 後可以得到殘差
$$
\hat{\epsilon_t} = x_t - \sum_{j=1}^{m} \hat{\pi_j} x_{t-j}
$$

> $m$ 的大小沒有一定要多少，可以用像是 p+q，主要是必須讓 $\epsilon_t$ 沒有自相關，符合模型的假設。

#### Step 2：估計 ARMA 參數
對 ARMA 模型：
$$
x_t = \sum_{j=1}^{p} \phi_j x_{t-j} + \sum_{j=1}^{q} \theta_j u_{t-j} + u_t
$$
用步驟 1 的殘差 $\hat{\epsilon}_t$ 代替 $\epsilon_t$，建立新的回歸：
$$
x_t = \sum_{j=1}^{p} \phi_j x_{t-j} + \sum_{j=1}^{q} \theta_j \hat{\epsilon}_{t-j} + \epsilon_t
$$
同樣使用 OLS：
$$
\begin{bmatrix} \hat{\phi} \\ \hat{\theta} \end{bmatrix}
= \left( Z^T Z \right)^{-1} Z^T y
$$
其中：
- $Z$ 是包含 $x_{t-j}$ 和 $\hat{\epsilon}_{t-j}$ 的設計矩陣
- $y$ 是 $x_t$ 值

最後，估計 $\sigma^2$：
$$
\hat{\sigma}^2 = \frac{1}{T - (p+q)} \sum_{t=1}^{T} \hat{e}_t^2
$$


### 2. Yule-Walker Estimation

對於 AR( p ) 模型：
$$
x_t = \sum_{j=1}^{p} \phi_j x_{t-j} + \epsilon_t
$$
等式兩邊同乘 $x_{t-\tau}, \tau=1, ..., p$：
$$
x_{t-\tau}x_t = \sum_{j=1}^{p} \phi_j x_{t-\tau}x_{t-j} + x_{t-\tau}\epsilon_t
$$
對等式取期望值：
$$
\begin{align}
E[x_{t-\tau}x_t] &= \sum_{j=1}^{p} \phi_j E[x_{t-\tau}x_{t-j}] + E[x_{t-\tau}\epsilon_t] \\
\Leftrightarrow \gamma(\tau) &= \sum_{j=1}^{p} \phi_j \gamma(\tau-j) \\
\end{align}
$$
根據上面操作可以得到 p 個自相關的線性方程，滿足 Yule-Walker 方程：
$$
\Gamma \phi = \gamma
$$
$$
\begin{bmatrix}
\gamma_0 & \gamma_1 & \cdots & \gamma_{p-1} \\
\gamma_1 & \gamma_0 & \cdots & \gamma_{p-2} \\
\vdots & \vdots & \ddots & \vdots \\
\gamma_{p-1} & \gamma_{p-2} & \cdots & \gamma_0
\end{bmatrix}
\begin{bmatrix}
\phi_1 \\ \phi_2 \\ \vdots \\ \phi_p
\end{bmatrix}=
\begin{bmatrix}
\gamma_1 \\ \gamma_2 \\ \vdots \\ \gamma_p
\end{bmatrix}
$$

令樣本估計量：
$$
\hat{\Gamma} \hat{\phi} = \hat{\gamma}
$$
解得：
$$
\hat{\phi} = \hat{\Gamma}^{-1} \hat{\gamma}
$$

對於 ARMA(\(p, q\)) 模型，當 \( q > 0 \) 時，Yule-Walker 方程擴展為：
$$
\gamma_k - \sum_{j=1}^{p} \phi_j \gamma_{k-j} = \sigma^2 \sum_{j=k}^{q} \theta_j \psi_{j-k}, \quad 0 \leq k \leq p+q
$$
其中：
- $\psi_j = 0$ 當 $j < 0$
- $\theta_0 = 1$
- $\theta_j = 0$ 當 $j \notin \{0, 1, ..., q\}$

求解這組非線性方程組得到 $\hat{\phi}$ 和 $\hat{\theta}$。


### 3. Maximum Likelihood Estimation


給定樣本 $X = (x_1, ..., x_T)^T$，其聯合機率密度函數為：
$$
L(\theta | X) = f(x_T, x_{T-1}, ..., x_1 | \theta)
$$
對數似然函數：
$$
\log L(\theta | X) = l(\theta | X)
$$

最大化對數似然：
$$
\hat{\theta}_{MLE} = \arg \max_{\theta} l(\theta | X)
$$


#### Gaussian ARMA 模型

假設 $\epsilon_t \sim N(0, \sigma^2)$，則：
$$
L(\theta | X) = (2\pi)^{-T/2} |\Gamma(\theta)|^{-1/2} \exp \left( -\frac{1}{2} X^T \Gamma(\theta)^{-1} X \right)
$$
其中 $\Gamma(\theta)$ 是 $X$ 的 auto-covarience matrix。

對於 AR(1)：
$$
\Gamma(\theta) =
\frac{\sigma^2}{1 - \phi_1^2}
\begin{bmatrix}
1 & \phi_1 & \phi_1^2 & \dots & \phi_1^{T-1} \\
\phi_1 & 1 & \phi_1 & \dots & \phi_1^{T-2} \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
\phi_1^{T-1} & \phi_1^{T-2} & \dots & \phi_1 & 1
\end{bmatrix}
$$

最大化：
$$
\hat{\theta}_{MLE} = \arg \max_{\theta} -\frac{1}{2} \left[ T \log(2\pi) + \log | \Gamma(\theta) | + X^T \Gamma(\theta)^{-1} X \right]
$$

### 結論
- **Two-Step Regression Estimation**：基於 OLS，計算簡單但準確度較低。
- **Yule-Walker Estimation**：適用於 AR 模型，但對 MA 組件較弱。
- **MLE**：在樣本量足夠大時最有效，並具有最佳的統計性質，但計算量較大。

## Reference

- [Time Series Analysis](https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/1926c83ecd7ea700f7cb63914c6d7c0f_MIT18_S096F13_lecnote8.pdf)
- [Estimation of ARIMA models](https://math.univ-cotedazur.fr/~frapetti/CorsoP/Chapitre_4_IMEA_1.pdf)
- [Estimation of the parameters of an ARMA model](https://www.lem.sssup.it/phd/documents/Lesson12.pdf)
- [Wold Representation Theorem](https://faculty.wcas.northwestern.edu/lchrist/finc520/wold.pdf)
- [Introduction to Computational Finance and Financial Econometrics with R](https://bookdown.org/compfinezbook/introcompfinr/)
