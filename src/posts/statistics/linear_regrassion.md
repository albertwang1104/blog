---
title: Linear Regession
order: 9
date: 2025-03-01
category:
  - Statistics
tag:
  - Study Note
---
<!-- # Linear Regession -->

## 簡單線性迴歸模型與假設
給定資料 $(X_i, Y_i), i = 1, \ldots, n$，其中：
- $Y_i$ 是反應變數（隨機變數）
- $X_i$ 是解釋變數（通常視為固定值）

模型形式為：
$$
Y_i = \beta_0 + \beta_1 X_i + \epsilon_i
$$
假設：
1. **常態性**：$\epsilon_i \sim N(0, \sigma^2)$
2. **線性關係**：$\mathbb{E}(Y_i) = \beta_0 + \beta_1 X_i$
3. **等變異性**：$\text{Var}(Y_i) = \sigma^2$
4. **獨立性**：$\epsilon_i \perp \epsilon_j, \, \forall i \neq j$

## 最小平方法 (Least Squares Estimation)

### 估計參數
目標是最小化以下目標函數：
$$
\min_{\beta_0, \beta_1} \sum_{i=1}^n \left(Y_i - \beta_0 - \beta_1 X_i\right)^2
$$
解得：
$$
\hat{\beta}_1 = \frac{\sum_{i=1}^n (X_i - \bar{X})(Y_i - \bar{Y})}{\sum_{i=1}^n (X_i - \bar{X})^2}, \quad \hat{\beta}_0 = \bar{Y} - \hat{\beta}_1 \bar{X}
$$

### 殘差和變異數估計
殘差定義為：
$$
e_i = Y_i - \hat{Y}_i = Y_i - (\hat{\beta}_0 + \hat{\beta}_1 X_i)
$$
殘差平方和 (Residual Sum of Squares, RSS)：
$$
RSS = \sum_{i=1}^n e_i^2
$$
變異數估計：
$$
\hat{\sigma}^2 = \frac{RSS}{n - 2}
$$

## 統計推論
### 參數的信賴區間
- **斜率 $\beta_1$ 的信賴區間**：
$$
\hat{\beta}_1 \pm t_{n-2}(\alpha/2) \cdot SE(\hat{\beta}_1), \quad SE(\hat{\beta}_1) = \sqrt{\frac{\hat{\sigma}^2}{\sum (X_i - \bar{X})^2}}
$$
- **截距 $\beta_0$ 的信賴區間**：
$$
\hat{\beta}_0 \pm t_{n-2}(\alpha/2) \cdot SE(\hat{\beta}_0), \quad SE(\hat{\beta}_0) = \sqrt{\hat{\sigma}^2 \left( \frac{1}{n} + \frac{\bar{X}^2}{\sum (X_i - \bar{X})^2} \right)}
$$

### 參數信賴區間的推導

在線性迴歸模型，$Y_i = \beta_0 + \beta_1 X_i + \epsilon_i$，$\epsilon_i \sim N(0, \sigma^2)$。

對模型的參數 $\beta_0$ 和 $\beta_1$，建構信賴區間，表示在一定置信水平 $\alpha$ 下，估計值與真實值的可能偏差範圍。

#### 概念與公式
參數估計值 $\hat{\beta}_0$ 和 $\hat{\beta}_1$ 是隨機變數，其分佈為：
$$
\hat{\beta}_1 \sim N\left(\beta_1, \frac{\sigma^2}{\sum_{i=1}^n (X_i - \bar{X})^2}\right)
$$
$$
\hat{\beta}_0 \sim N\left(\beta_0, \sigma^2 \left( \frac{1}{n} + \frac{\bar{X}^2}{\sum_{i=1}^n (X_i - \bar{X})^2} \right) \right)
$$

但因為真實變異數 $\sigma^2$ 未知，我們用 $\hat{\sigma}^2$ 作為估計，導致 $\hat{\beta}_1$ 和 $\hat{\beta}_0$ 的分佈轉為 **t 分佈**。

#### 推導過程

**1. 樣本變異數 $\hat{\sigma}^2$ 的估計為：**
$$
\hat{\sigma}^2 = \frac{\text{RSS}}{n-2} = \frac{\sum_{i=1}^n (Y_i - \hat{Y}_i)^2}{n-2}
$$
其中 $\text{RSS}$ 為殘差平方和。

註：$\hat{\sigma}^2$ 是 $\sigma^2$ 的無偏估計量。

**2. 參數估計值的標準誤差**
- **斜率 $\beta_1$ 的標準誤差：**
$$
SE(\hat{\beta}_1) = \sqrt{\frac{\hat{\sigma}^2}{\sum_{i=1}^n (X_i - \bar{X})^2}}
$$
- **截距 $\beta_0$ 的標準誤差：**
$$
SE(\hat{\beta}_0) = \sqrt{\hat{\sigma}^2 \left( \frac{1}{n} + \frac{\bar{X}^2}{\sum_{i=1}^n (X_i - \bar{X})^2} \right)}
$$

**3. t 分佈引入**
根據常態性假設：
$$
t = \frac{\hat{\beta}_1 - \beta_1}{SE(\hat{\beta}_1)} \sim t_{n-2}, \quad t = \frac{\hat{\beta}_0 - \beta_0}{SE(\hat{\beta}_0)} \sim t_{n-2}
$$

**4. 信賴區間建構**
在置信水平 $1-\alpha$ 下，對於 t 分佈：
$$
P\left(\left| \frac{\hat{\beta}_1 - \beta_1}{SE(\hat{\beta}_1)} \right| \leq t_{n-2, \alpha/2}\right) = 1 - \alpha
$$

$\beta_0$ 同理可得。

#### 信賴區間公式
- **斜率 $\beta_1$ 的信賴區間**：
$$
\beta_1 \in \left[\hat{\beta}_1 - t_{n-2, \alpha/2} \cdot SE(\hat{\beta}_1), \, \hat{\beta}_1 + t_{n-2, \alpha/2} \cdot SE(\hat{\beta}_1)\right]
$$
- **截距 $\beta_0$ 的信賴區間**：
$$
\beta_0 \in \left[\hat{\beta}_0 - t_{n-2, \alpha/2} \cdot SE(\hat{\beta}_0), \, \hat{\beta}_0 + t_{n-2, \alpha/2} \cdot SE(\hat{\beta}_0)\right]
$$


#### 說明
- **自由度** $n-2$ 是因為回歸模型估計了 2 個參數（$\beta_0$ 和 $\beta_1$），因此樣本自由度減少了 2。
- 信賴區間的寬度由樣本大小 $n$、解釋變數 $X_i$ 的分佈和變異數估計 $\hat{\sigma}^2$ 決定。


### 反應變數的信賴區間
對未來反應變數 $Y_0$ 預測的 $100\times (1-\alpha)\%$ 信賴區間：

$$
\hat{Y}_0 \pm t_{n-2}(\alpha/2) \cdot \text{SE}(\hat{Y}_0), \text{SE}(\hat{Y}_0) = \sqrt{\hat{\sigma}^2 \left( 1 + \frac{1}{n} + \frac{(X_0 - \bar{X})^2}{\sum (X_i - \bar{X})^2} \right)}
$$


### 推導反應變數的變異數

#### **實際的反應變數**

$$
Y_0 = \beta_0 + \beta_1 X_0 + \epsilon_0
$$

#### **實際的反應變數條件均值**
$$
\mu_Y(X_0) = \mathbb{E}[Y | X_0] = \beta_0 + \beta_1 X_0.
$$

#### **估計的條件均值**

在樣本中，$\beta_0$ 和 $\beta_1$ 使用最小平方法估計為 $\hat{\beta}_0$ 和 $\hat{\beta}_1$，條件均值的估計為：
$$
\hat{\mu}_Y(X_0) = \hat{\beta}_0 + \hat{\beta}_1 X_0.
$$

#### **$\hat{\mu}_Y(X_0)$ 的變異數**

1. **$\hat{\beta}_1$ 的變異數**：
$$
\text{Var}(\hat{\beta}_1) = \frac{\sigma^2}{\sum_{i=1}^n (X_i - \bar{X})^2}.
$$
2. **$\hat{\beta}_0$ 的變異數**：
$$
\text{Var}(\hat{\beta}_0) = \sigma^2 \left( \frac{1}{n} + \frac{\bar{X}^2}{\sum_{i=1}^n (X_i - \bar{X})^2} \right).
$$

3. **$\hat{\beta}_0$ 與 $\hat{\beta}_1$ 的共變異數**：
$$
\text{Cov}(\hat{\beta}_0, \hat{\beta}_1) = -\frac{\sigma^2 \bar{X}}{\sum_{i=1}^n (X_i - \bar{X})^2}.
$$

#### **條件均值 $\hat{\mu}_Y(X_0)$ 的變異數**

$$
\text{Var}(\hat{\mu}_Y(X_0)) = \text{Var}(\hat{\beta}_0) + X_0^2 \cdot \text{Var}(\hat{\beta}_1) + 2 X_0 \cdot \text{Cov}(\hat{\beta}_0, \hat{\beta}_1).
$$

將以上公式代入，整理得到：
$$
\text{Var}(\hat{\mu}_Y(X_0)) = \sigma^2 \left( \frac{1}{n} + \frac{(X_0 - \bar{X})^2}{\sum_{i=1}^n (X_i - \bar{X})^2} \right).
$$

#### 未來反應值的變異數

未來反應值 $Y_0$ 的分佈為：
$$
Y_0 | X_0 \sim N\left(\mu_Y(X_0), \text{Var}(Y_0 | X_0)\right).
$$

未來反應值的變異數包含兩部分：
1. 條件均值的估計變異數 $\text{Var}(\hat{\mu}_Y(X_0))$。
2. 隨機誤差項 $\epsilon$ 的變異數 $\sigma^2$。

未來反應值的總變異數為：
$$
\text{Var}(Y_0 | X_0) = \text{Var}(\hat{\mu}_Y(X_0)) + \sigma^2.
$$

將 $\text{Var}(\hat{\mu}_Y(X_0))$ 代入得：
$$
\text{Var}(Y_0 | X_0) = \sigma^2 \left( 1 + \frac{1}{n} + \frac{(X_0 - \bar{X})^2}{\sum_{i=1}^n (X_i - \bar{X})^2} \right).
$$


## 殘差分析

殘差分析是為了驗證估計模型是否符合迴歸模型的假設，包括常態性、等變異性、獨立性。

### 工具
- **殘差圖 (Residual Plot)**：檢查是否呈隨機分佈（同方差性與獨立性）
- **常態QQ圖**：檢查殘差 $\epsilon_i$ 是否符合常態分佈
- **統計檢定**：
  - 常態性檢定：Shapiro-Wilk test
  - 等變異性檢定：Breusch-Pagan test 或 White test、ncv test

### 改進
若假設不成立，可以考慮以下方式：
- **非線性轉換**：對變數進行對數、平方根等轉換。
- **加權最小平方法**：解決非等變異問題。
- **廣義線性模型**：適用於非常態反應變數


## 多變數線性迴歸

多變數線性迴歸模型的形式為：
$$
Y_i = \beta_0 + \sum_{j=1}^p \beta_j X_{ij} + \epsilon_i, \quad \epsilon_i \sim N(0, \sigma^2),
$$
或矩陣形式：
$$
\begin{bmatrix}
Y_1 \\ \vdots \\ Y_n
\end{bmatrix}= 
\begin{bmatrix}
1 & X_{1, 1} & \cdots & X_{1, p} \\
1 & X_{2, 1} & \cdots & X_{2, p} \\
\vdots & \vdots & \ddots & \vdots \\
1 & X_{n, 1} & \cdots & X_{n, p} \\
\end{bmatrix}
\begin{bmatrix}
\beta_0 \\ \beta_1 \\ \vdots \\ \beta_p
\end{bmatrix} + 
\begin{bmatrix}
\epsilon_1 \\ \vdots \\ \epsilon_n
\end{bmatrix}
$$
$$
\mathbf{Y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\epsilon},
$$
其中：
- $\mathbf{Y} \in \mathbb{R}^n$ 是響應變數向量。
- $\mathbf{X} \in \mathbb{R}^{n \times (p+1)}$ 是設計矩陣，其中每行為樣本，每列為解釋變數，並在第一列加上全為 1 的項（用於截距 $\beta_0$）。
- $\boldsymbol{\beta} \in \mathbb{R}^{p+1}$ 是回歸係數向量。
- $\boldsymbol{\epsilon} \in \mathbb{R}^n$ 是誤差向量，假設 $\boldsymbol{\epsilon} \sim N(\mathbf{0}, \sigma^2 \mathbf{I}_n)$。


### 目標函數
多變數線性迴歸使用最小平方法 (Ordinary Least Squares, OLS)，目標是最小化殘差平方和 (Residual Sum of Squares, RSS)：
$$
\text{RSS} = \sum_{i=1}^n \left(Y_i - \beta_0 - \sum_{j=1}^p \beta_j X_{ij}\right)^2.
$$
矩陣形式為：
$$
\text{RSS} = (\mathbf{Y} - \mathbf{X}\boldsymbol{\beta})^\top (\mathbf{Y} - \mathbf{X}\boldsymbol{\beta}).
$$

### 最小化目標函數
對 $\text{RSS}$ 對 $\boldsymbol{\beta}$ 求導：
$$
\frac{\partial \text{RSS}}{\partial \boldsymbol{\beta}} = -2\mathbf{X}^\top (\mathbf{Y} - \mathbf{X}\boldsymbol{\beta}).
$$
令導數為 0：
$$
\mathbf{X}^\top \mathbf{Y} - \mathbf{X}^\top \mathbf{X}\boldsymbol{\beta} = \mathbf{0}.
$$
整理得 **正規方程**：
$$
\mathbf{X}^\top \mathbf{X}\boldsymbol{\beta} = \mathbf{X}^\top \mathbf{Y}.
$$

### 回歸係數的估計
若 $\mathbf{X}^\top \mathbf{X}$ 可逆，則解得回歸係數的估計值：
$$
\hat{\boldsymbol{\beta}} = (\mathbf{X}^\top \mathbf{X})^{-1} \mathbf{X}^\top \mathbf{Y}.
$$

#### 幾何解釋
- $\mathbf{X}\hat{\boldsymbol{\beta}}$ 是 $\mathbf{Y}$ 在 $\mathbf{X}$ 所張成的列空間中的正交投影。
- $\hat{\boldsymbol{\beta}}$ 確保 $\mathbf{Y} - \mathbf{X}\hat{\boldsymbol{\beta}}$ 與 $\mathbf{X}$ 的列空間正交。


### 模型的性質

#### 反應變數的估計值
反應變數的估計值為：
$$
\hat{\mathbf{Y}} = \mathbf{X}\hat{\boldsymbol{\beta}} = \mathbf{X}(\mathbf{X}^\top \mathbf{X})^{-1} \mathbf{X}^\top \mathbf{Y}.
$$
其中 $\mathbf{H} = \mathbf{X}(\mathbf{X}^\top \mathbf{X})^{-1} \mathbf{X}^\top$ 是投影矩陣，滿足 $\mathbf{H}^2 = \mathbf{H}$ 且 $\mathbf{H}^\top = \mathbf{H}$。

#### 殘差
殘差為：
$$
\mathbf{e} = \mathbf{Y} - \hat{\mathbf{Y}} = (\mathbf{I} - \mathbf{H})\mathbf{Y}.
$$

#### 回歸係數的分佈
在常態性假設下：
$$
\hat{\boldsymbol{\beta}} \sim N(\boldsymbol{\beta}, \sigma^2 (\mathbf{X}^\top \mathbf{X})^{-1}).
$$

### 回歸模型的變異數估計
樣本變異數的無偏估計為：
$$
\hat{\sigma}^2 = \frac{\mathbf{e}^\top \mathbf{e}}{n - p - 1} = \frac{(\mathbf{Y} - \mathbf{X}\hat{\boldsymbol{\beta}})^\top (\mathbf{Y} - \mathbf{X}\hat{\boldsymbol{\beta}})}{n - p - 1}.
$$


### 信賴區間與推論
#### 1. 係數的信賴區間
對於每個回歸係數 $\beta_j$，其估計值 $\hat{\beta}_j$ 的標準誤差為：
$$
SE(\hat{\beta}_j) = \sqrt{\hat{\sigma}^2 \cdot [(\mathbf{X}^\top \mathbf{X})^{-1}]_{jj}},
$$
其信賴區間為：
$$
\hat{\beta}_j \pm t_{n-p-1}(\alpha/2) \cdot SE(\hat{\beta}_j).
$$

#### 2. 預測值的信賴區間
反應變數 $\mathbf{Y}$ 在 $X_0$ 的估計為：
$$
\hat{Y}_0 = \mathbf{X}_0^\top \hat{\boldsymbol{\beta}},
$$
其變異數為：
$$
\text{Var}(\hat{Y}_0) = \hat{\sigma}^2 \cdot \left(\mathbf{X}_0^\top (\mathbf{X}^\top \mathbf{X})^{-1} \mathbf{X}_0\right).
$$

則信賴區間為：
$$
\hat{Y}_0 \pm t_{n-p-1}(\alpha/2) \cdot SE(\hat{Y}_0).
$$

### 多變數線性迴歸的總結
- **回歸係數估計公式**：
$$
\hat{\boldsymbol{\beta}} = (\mathbf{X}^\top \mathbf{X})^{-1} \mathbf{X}^\top \mathbf{Y}.
$$
- **響應變數的估計值**：
$$
\hat{\mathbf{Y}} = \mathbf{X}\hat{\boldsymbol{\beta}}.
$$
- **殘差與樣本變異數**：
$$
\mathbf{e} = \mathbf{Y} - \hat{\mathbf{Y}}, \quad \hat{\sigma}^2 = \frac{\mathbf{e}^\top \mathbf{e}}{n - p - 1}.
$$

