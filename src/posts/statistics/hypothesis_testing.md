---
title: Hypothesis Testing
order: 5
category:
  - Statistics
tag:
  - Study Note
---
<!-- # 假設檢定（Hypothesis Testing） -->

假設檢定是一種統計方法，用來判斷數據是否提供足夠的證據來支持特定的假設。假設檢定通常涉及以下步驟：

1. **設立假設**：
   - **零假設 $H_0$（Null Hypothesis）**：通常是一個陳述，表示沒有效果或沒有差異。例如，平均數等於某個值。
   - **對立假設 $H_a$ 或 $H_1$（Alternative Hypothesis）**：與零假設相反的陳述，表示存在效果或差異。一般是我們想要的結果。
2. **選擇顯著性水準 (significant level) $\alpha$**：顯著性水準通常設置為 0.05、0.01 等，表示我們有 5% 或 1% 的風險錯誤地拒絕零假設。
3. **計算檢定統計量**：根據數據計算出檢定統計量，這個統計量將用來決定是否拒絕零假設。不同的檢定方法會有不同的檢定統計量，常見的檢定統計量有 z 值、t 值、$\chi^2$ 值等。
4. **確定臨界值或 p-value**：如果檢定統計量超過臨界值，或 p-value 小於顯著性水準，則拒絕零假設。
5. **得出結論**：根據檢定結果，決定是否拒絕零假設，並解釋結果的意義。



|              | $H_0$ is true                                                          | $H_a$ is true                                                         |
| ------------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------- |
| reject $H_0$ | **type I error** $P(\text{reject } H_0 \| H_0 \text{ is true})=\alpha$ | correct (power) $P(\text{reject } H_0\|H_a \text{ is true})=1-\beta$  |
| accept $H_0$ | correct $P(\text{accept } H_0 \|H_0 \text{ is true})=1-\alpha$         | **type II error**  $P(\text{accept } H_0\|H_0 \text{ is true})=\beta$ |


### 計算 p-value

- 單尾檢定（One-Tailed Test）
    - 右尾檢定 ( $H_a: \mu > \mu_0$ )：  
       $$
       p\text{-value} = P(TS \geq ts | H_0 \text{ is true }) = 1- CDF(ts)
       $$
    - 左尾檢定 ( $H_a: \mu < \mu_0$ )：  
       $$
       p\text{-value} = P(TS \leq ts | H_0 \text{ is true }) = CDF(ts)
       $$
- 雙尾檢定（Two-Tailed Test）( $H_a: \mu \neq \mu_0$) :
    $$
     p\text{-value} = 2 \times P(TS \geq |ts| | H_0 \text{ is true }) = 2 \times [1- CDF(|ts|)]
     $$

**Notation:**
- ts：從數據中算出統計量的觀察值。
- TS：檢定統計量。
- CDF：假設下檢定統計量所符合的cdf。

### Neyman - Pearson Lemma



### Likelihood Ratio Test (LRT)



### Uniformly Most Powerful (UMP) Test


