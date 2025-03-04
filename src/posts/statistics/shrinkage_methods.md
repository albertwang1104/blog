---
title: Shrinkage Methods
order: 11
date: 2025-03-01
category:
  - Statistics
tag:
  - Study Note
---
<!-- # Shrinkage Methods -->


縮減方法 (Shrinkage Methods) 是一種通過將回歸係數「向零收縮」來降低模型複雜度並提高模型泛化性能的技術。這些方法能有效地處理高維數據，尤其是在樣本數 $n$ 小於變數數量 $p$ 的情況下。

<!-- more -->

## Ridge Regression

Ridge Regression 是一種線性迴歸方法，它在普通最小二乘法 (ordinary least squares，OLS) 的基礎上添加了一個二次懲罰項，從而限制回歸係數的大小。

### 公式
Ridge Regression 的損失函數為：
$$
\underset{\beta}{\text{Minimize}} \quad \sum_{i=1}^n \left( y_i - \beta_0 - \sum_{j=1}^p x_{ij} \beta_j \right)^2 + \lambda \sum_{j=1}^p \beta_j^2
$$
- 第一部分是普通最小二乘法的殘差平方和 (RSS)。
- 第二部分是懲罰項，控制回歸係數 $\beta_j$ 的大小。
- $\lambda$ 是正則化參數，用來調節模型的偏差與方差：
  - 當 $\lambda = 0$ 時，嶺迴歸退化為普通最小二乘法。
  - 當 $\lambda \to \infty$ 時，所有 $\beta_j$ 都趨近於零。



### 特點
1. 嶺迴歸傾向於將所有的回歸係數收縮到接近零，但不會完全等於零。
2. 適用於處理多重共線性問題，因為它可以穩定估計。
3. 無法執行變數選擇，因為所有的係數都保留在模型中。

### 優缺點
- **優點**：有效地減少模型的方差，提高泛化能力。適合高維數據集。
- **缺點**：無法產生稀疏模型，即不能將不重要的變數完全剔除。



## Lasso 

Lasso (Least Absolute Shrinkage and Selection Operator) 是另一種縮減方法，它在普通最小二乘法的基礎上添加了一個 L1 懲罰項，從而實現變數選擇和模型壓縮。

### 公式
Lasso 的損失函數為：
$$
\underset{\beta}{\text{Minimize}} \quad \sum_{i=1}^n \left( y_i - \beta_0 - \sum_{j=1}^p x_{ij} \beta_j \right)^2 + \lambda \sum_{j=1}^p |\beta_j|
$$
- L1 懲罰項 $\sum_{j=1}^p |\beta_j|$ 強制一些回歸係數完全等於零。
- $\lambda$ 是正則化參數：
  - 當 $\lambda = 0$ 時，Lasso 退化為普通最小二乘法。
  - 當 $\lambda$ 足夠大時，某些 $\beta_j$ 會被壓縮為零。


### 特點
1. Lasso 通過 L1 懲罰實現了變數選擇，可以產生稀疏模型。
2. 適合處理高維數據，尤其是當變數數 $p$ 遠大於樣本數 $n$ 時。
3. Lasso 比嶺迴歸更容易將不重要的變數剔除。

### 優缺點
- **優點**：能執行變數選擇，產生稀疏解。適用於高維數據，且易於解釋。
- **缺點**：當變數高度相關時，Lasso 的選擇可能不穩定，因為它傾向於選擇其中一個而忽略其他。


## Ridge Regression 與 Lasso 的比較

| 特性         | Ridge Regression                 | Lasso                              |
| ------------ | -------------------------------- | ---------------------------------- |
| **懲罰項**   | $\lambda \sum_{j=1}^p \beta_j^2$ | $\lambda \sum_{j=1}^p \|\beta_j\|$ |
| **效果**     | 收縮回歸係數但不為零             | 收縮回歸係數且可能為零             |
| **變數選擇** | 不支持                           | 支持                               |
| **適用場景** | 多重共線性和高維數據             | 高維數據且需要變數選擇             |



## Elastic Net (彈性網絡)

嶺迴歸和 Lasso 的結合方法，通過同時添加 L1 和 L2 懲罰項來解決 Lasso 在高相關變數下的不穩定性問題：
$$
\underset{\beta}{\text{Minimize}} \quad \sum_{i=1}^n \left( y_i - \beta_0 - \sum_{j=1}^p x_{ij} \beta_j \right)^2 + \lambda_1 \sum_{j=1}^p |\beta_j| + \lambda_2 \sum_{j=1}^p \beta_j^2
$$

### 特點
1. 保留了 Lasso 的變數選擇能力。
2. 通過加入 L2 懲罰項，改進了在高度相關變數下的性能。


## 總結

- 嶺迴歸和 Lasso 是常用的縮減方法，能有效處理高維數據，並改善模型的泛化性能。
- 嶺迴歸適用於穩定估計，Lasso 更適合需要稀疏解的場景。
- 根據具體問題和數據特點，可以靈活選擇或結合這兩種方法（如使用 Elastic Net）。

這些方法的核心思想是通過引入正則化，實現模型簡化和性能提升，同時應對多重共線性與過擬合的挑戰。



## **模型選擇與縮減方法的比較**

### **子集選擇方法 (Subset Selection Methods)**

- 子集選擇方法利用最小平法法（least square method）來擬合一個線性模型，其中模型只包含部分預測變數（predictors）。
- 雖然這些方法專注於挑選一部分重要的預測變數，但它們完全依賴於傳統的最小二乘法進行估計。


### **縮減與正則化方法**

- 作為子集選擇方法的替代方案，我們可以構建一個包含所有 $p$ 個預測變數的模型，並通過一些方法對回歸係數進行約束或正則化 (regularization)。這些方法將回歸係數的估計值「縮減」(shrinkage) 向零靠攏。


### Bias-Variance Trade-off

**為什麼要加入約束？**
- 在初看時，對回歸係數添加約束似乎會降低模型的靈活性，因而不會明顯改善模型擬合效果。但事實上，通過對回歸係數進行適當的縮減，我們能夠顯著降低回歸係數的方差，從而提高模型的穩定性。

**代價：**
- 雖然縮減回歸係數會略微增加模型的偏差 (bias)，但在實際應用中，這種方法通常能顯著提高模型的泛化能力，因為它減少了過擬合的風險。


### 總結
- **子集選擇方法**：專注於挑選部分變數，但依賴最小二乘法，可能會受到多重共線性或高維問題的影響。
- **縮減與正則化方法**：通過對係數進行縮減，有效降低模型的方差，實現偏差與變異的平衡。
- **偏差-變異權衡**：通過略微增加偏差來大幅降低變異，從而改善模型的預測性能。

