---
title: Dimension Reduction
order: 12
date: 2025-03-01
category:
  - Statistics
tag:
  - Study Note
---

降維是一種通過將高維數據嵌入到低維空間中的方法，用於減少特徵數量，進而簡化模型、提高解釋性並降低過擬合（overfitting）的風險。

<!-- more -->

## 常見的降維方法

1. **特徵選擇（Feature Selection）**：從原始特徵中挑選一部分子集。例子：前向選擇、後向剔除。
2. **特徵提取（Feature Extraction）**：通過構造新特徵來表示原始數據，通常使用線性或非線性方法。例子：主成分分析 (PCA)、偏最小二乘回歸 (PLS)。


## 主成分分析（PCA：Principal Component Analysis）

PCA 是最常用的降維方法之一，它通過線性變換將原始特徵轉換為若干個彼此正交的主成分，這些主成分按照對數據變異的貢獻大小排序。


### 想法

考慮有 $n$ 個樣本，每個樣本有 $p$ 個變數，構成數據矩陣 $X \in \mathbb{R}^{n \times p}$。

將數據平移使其平均為 0。
$$
X_{\text{centered}} = X - \bar{X}
$$
$\bar{X} = [\bar{x}_1, \bar{x}_2, \cdots, \bar{x}_p]$ 是數據的平均值。

Covarience Matrix

$$
\Sigma = \frac{1}{n} X_{\text{centered}}^\top X_{\text{centered}}
$$

主成份分析是在找投影向量讓投影後的資料變異量最大。

$$
v = \underset{u\in \mathbb{R}^k, \|u\|=1}{\arg \max} \{u^\top\Sigma u\}
$$

### Solution

PCA 變成一個 constrained optimization problem，所以我們用 Method of Lagrange Multiplier。

令 $f(v, \lambda) = v^\top \Sigma v - \lambda (\|v\| - 1)$


$$
\begin{align}
\frac{\partial }{\partial v} f(v, \lambda) = 2\Sigma v - 2\lambda v=0 &\Rightarrow \Sigma v = \lambda v \\
\frac{\partial }{\partial \lambda} f(v, \lambda) = \|v\|-1=0 &\Rightarrow \|v\| = 1
\end{align}
$$

得到 $v$ 的解為 $\Sigma$ 的 eigenvector，$\lambda$ 為 eigenvalue。
因此將 covarience matrix $\Sigma$ 進行特徵值分解（eigendecomposition）：
$$
\Sigma = V \Lambda V^\top
$$

其中：
   - $V = [v_1, v_2, \ldots, v_p]$ 是特徵向量矩陣。
   - $\Lambda = \text{diag}(\lambda_1, \lambda_2, \ldots, \lambda_p)$ 是對應的特徵值矩陣，且 $\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_p$。

#### 降維

選擇最大的 $k$ 個特徵值 $\{\lambda_1, \lambda_2, \ldots, \lambda_k\}$，並取其對應的特徵向量 $\{v_1, v_2, \ldots, v_k\}$。將數據投影到新的 $k$ 維空間：

$$
Z = X_{\text{centered}} V_k
$$
其中，$V_k$ 是前 $k$ 個特徵向量組成的矩陣。

### **PCA 的特性**
- 主成分是正交的（無相關性）。
- 按變異大小排序的主成分保留了數據中的最大變異性。
- 通常選擇前 $k$ 個主成分使得累積變異解釋率（Explained Variance Ratio $r_k = \frac{\lambda_1+ \lambda_2+ \ldots+ \lambda_k}{\lambda_1+ \lambda_2+ \ldots+ \lambda_p}$）達到某個閾值 r。
- These directions are identified in an unsupervised way, since the response Y is not used to help determine the principal component directions.

## 主成分回歸（PCR：Principle Component Regrassion）

PCR 非常直接，使用 PCA 降維後的 $k$ 個主成分進行線性迴歸。

### 數學意義

將 $p$ 個變數轉換為 $k$ 個主成分：
$$
Z_i = \sum_{j=1}^p \phi_{ij}X_j = v_i X_{\text{centered}}, \quad i=1, 2, ..., k
$$

其中 $v_i = [v_{i1}, v_{i2}, \cdots, v_{ip}]$ 是第 $i$ 個特徵向量，每個 elements 表示原始數據的權重。

使用 $Z_1, Z_2, \dots, Z_k$ 擬合回歸模型：
$$
Y_i = \theta_0 + \sum_{m=1}^M \theta_m Z_{im} + \epsilon_i
$$

## PLS（Partial Least Squares）

PLS 是另一種結合降維和回歸的技術，通過在投影到低維空間的同時最大化自變量與應變量的相關性。

PLS Regrassion 的核心思想是通過提取潛在因素，同時考慮自變數（X）和因變數（Y）的資訊，來建立迴歸模型。這些潛在因素既能解釋 X 的變異，又能最大化與 Y 的相關性。

PLS Regression 又可以細分成 PLS1 和 PLS2，兩個方法的差別在於，PLS1的輸入出資料Y為1維、PLS2的輸入出資料Y為1維以上，而背後的概念都一樣。

### 模型

$$
y = XB + B_0
$$

### PLS 演算法步驟

1. **初始化**：
給定 N 筆觀測資料，每筆包含 M 個特徵的自變數矩陣 $X \in \mathbb{R}^{N \times M}$ 和對應的因變數向量 $y \in \mathbb{R}^N$。設定所需的潛在因素數量 $K$。
下面考慮平均為 0 的數據 $\tilde{X} = X-\bar{X}, \tilde{y} = y-\bar{y}$，使得模型可以捨去截距項為
$$
\tilde{y} = \tilde{X}B, B_0 = \bar{y} - \bar{X}B
$$

2. **迴圈計算（重複 $K$ 次）**：
   - **步驟 1**：計算權重向量 $w_i \in \mathbb{R}^M, w_i = X_i^\top y_i/\|X_i^\top y_i\|$。（$X_i^\top y_i$ 是表示自變數 $X_i$ 與因變數 $y_i$ 的相關性向量）
   - **步驟 2**：計算得分向量（特徵向量）$t_i\in \mathbb{R}^N, t_i = X_iw_i/\|X_iw_i\|$。（$t_i$ 表示 $X_i$ 要投影的基底向量，根據當前 $X_i, y_i$ 的相關性）
   - **步驟 3**：
     - 計算載荷向量 $p_i \in \mathbb{R}^M, p_i = X_i^T t_i$。
     - 計算回歸係數 $q_i \in \mathbb{R}, q_i = y_i^T t_i$。
   - **步驟 4**：更新 $X$，$X_{i+1} = X_i - t_i p_i^T$。（新的方向只考慮 $X_i$ 的 residual，使每個特徵無相關）

3. **最終模型**：
   - 權重矩陣 $W = [w_1, w_2, ..., w_K] \in \mathbb{R}^{M\times K}$，
   - 載荷矩陣 $P = [p_1, p_2, ..., p_K] \in \mathbb{R}^{M\times K}$
   - 回歸係數向量 $q = [q_1, q_2, ..., q_K]^\top \in \mathbb{R}^{K}$。
   - 最終的回歸係數為 $B = W (P^T W)^{-1} q \in \mathbb{R}^{K}, B_0 = B_0 = \bar{y} - \bar{X}B$。

### PLS 回歸的優點

- **處理多重共線性**：PLS 能夠有效處理自變數之間的高度相關性，這在傳統的最小二乘回歸中可能導致不穩定的估計。
- **降維**：通過提取潛在因素，PLS 能夠在降低模型複雜度的同時保留主要資訊。
- **適用於高維小樣本**：當樣本數量少於變數數量時，PLS 仍能建立穩健的模型。



