---
title: Model Selection
order: 10
date: 2025-03-01
category:
  - Statistics
tag:
  - Study Note
---


## 為什麼要做 Model Selection


1. **提升預測準確性（Prediction Accuracy）**：特別是當變數數量 $p > n$ 時，透過控制模型的變異來提高預測準確性。
2. **增強模型的可解釋性（Model Interpretability）**：藉由移除不相關的特徵（即將對應的回歸係數估計值設為零），可以獲得一個更易於解釋的模型。

<!-- more -->

<!-- ### 常見的降維方法

1. **特徵選擇（Feature Selection）**：從原始特徵中挑選一部分子集。例子：前向選擇、後向剔除。
2. **特徵提取（Feature Extraction）**：通過構造新特徵來表示原始數據，通常使用線性或非線性方法。例子：主成分分析 (PCA)、偏最小二乘回歸 (PLS)。 -->

### 替代方法

1. **子集選擇（Subset Selection）**：找出與預測變數相關的特徵子集 $\tilde{\mathbf{X}} \subseteq \mathbf{X} = \{ X_1, X_2, \dots, X_p \}$，在這個子集上擬合模型。
2. **縮減方法（Shrinkage）**：對包含所有 $p$ 個預測變數的模型進行擬合，透過 **縮減（Shrinkage）**，將估計係數向零靠攏，相較於最小平方法的估計值會變小。這種縮減（也稱為 **正則化（Regularization）**）可以有效地降低變異（儘管可能會稍微增加偏差），通常會降低均方誤差（MSE），並具備變數選擇的功能。
3. **降維（Dimension Reduction）**：將 $p$ 個預測變數投影到一個 $M$ - 維的子空間，其中 $M < p$。然後使用這些 $M$ 個投影作為新的預測變數來擬合線性回歸模型。這是透過計算 $p$ 個變數的 **線性組合（Linear Combinations）** 或 **投影（Projections）** 成 $M$ 個變數，得到新的特徵來表示原始數據。


## Best Subset Selection

**最佳子集選擇**：找出與反應變數相關的特徵子集 $\tilde{\mathbf{X}} \subseteq \mathbf{X} = \{ X_1, X_2, \dots, X_p \}$，在這個子集上擬合模型。

對於 $k = 0, 1, \dots, p$ 個解釋變數，擬合所有 $\binom{p}{k}$ 種模型。使用如 RSS、$R^2$、AIC、BIC 或 adjusted $R^2$ 等標準選擇最佳模型。

### 前向逐步選擇（Forward stepwise selection）

1. 設定 $\mathcal{M}_0$ 為零模型（null model），該模型不包含任何預測變數（此模型僅預測每個觀測值的樣本平均值）。
2. 對於 $k = 1, 2, \dots, p$：
   - 擬合所有剛好包含 k  個預測變數的模型（共有 $\binom{n}{k}$ 個模型）。
   - 從這些 $\binom{n}{k}$ 個模型中選擇「最佳」模型，記為 $\mathcal{M}_k$（「最佳」可以定義為擁有最小的 RSS，或等價地，最大的 $R^2$ ）。
3. 從 $\mathcal{M}_0, \mathcal{M}_1, \dots, \mathcal{M}_p$ 中選擇單一的最佳模型（使用交叉驗證的預測誤差、$C_p$、AIC、BIC 或調整後的 $R^2$）。

### 後向逐步選擇（Backward stepwise selection）

後向逐步選擇和前向逐步選擇類似，但是從完整模型（full model）開始，逐步移除不能改進模型的變數，進而得到最佳模型。


## 選擇標準

Mallow's $C_p$ and Adjusted $R^2$ are defined for linear regression problems; the AIC and BIC are defined for a larger class of models by maximum likelihood.

1. **Mallow's $C_p$**：$C_p$ 越小越好，因為它在擬合程度和模型複雜度之間尋找平衡。
   $$
   C_p = \frac{1}{n}(\text{RSS} + 2d\hat{\sigma}^2)
   $$
   
2. **Adjusted $R^2$**：Adjusted $R^2$ 越大越好，因為它修正了 $R^2$ 對模型參數數量增加的偏好，讓我們能更客觀地比較不同複雜度的模型。
   $$
   \text{adj } R^2 = 1 - \frac{\text{RSS} / (n - d - 1)}{\text{TSS} / (n - 1)}
   $$

3. **AIC（Akaike Information Criterion）**：AIC 越小越好，因為它同時考慮了模型的擬合優度和參數數量。
   $$
   \text{AIC} = -2\log L + 2d
   $$

4. **BIC（Bayesian Information Criterion）**：BIC 越小越好，因為它與 AIC 類似，但對模型複雜度的懲罰更嚴格。
   $$
   \text{BIC} = -2\log  L + \log(n)d
   $$

- $d$ is the number of parameters used.
- $\hat{\sigma}^2$ is an estimate of the $\text{var}(\epsilon)$.
- $L$ is the maximized value of the likelihood function for the estimated model.
- $n$ is the number of samples.

### 適用範圍與區別

- Mallow's $C_p$ 和 Adjusted $R^2$ 是專為線性回歸問題設計，所以這兩個變數更適合回歸模型的參數篩選和比較。
- AIC 和 BIC 適用於更廣泛的模型（包括回歸和其他通過最大似然估計的模型）。
- AIC 偏向於選擇擬合效果較好的模型，適合預測精度的場景。
- BIC 對模型複雜度的懲罰更嚴格，偏向於選擇較為簡潔的模型，適合需要解釋性或樣本數較少的情況。

**交叉驗證（Cross-Validation）**：通過計算驗證誤差或使用 $k$ 折交叉驗證，直接估計測試誤差。


