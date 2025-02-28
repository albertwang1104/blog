---
title: 檢定方法
order: 6
category:
  - Statistics
tag:
  - Study Note
---

<!-- # 檢定方法（單、雙樣本檢定） -->

## 統計檢定總說
- One- or two-sample problem
    - Background knowledge of the study 
    - Population
    - Sample
    - Units
    - Variables: response, group/treatment
- Study design (and which inference you can draw) 
    - Random sampling (inference to the populations) or not
        - random/non-random selection of units
    - A randomized experiment (causal inference因果推論) or an observational study
        - random/non-random allocations
        - In an observational study, confounding variables (混淆變數) are related both to group membership and to the outcome 
- Look at the data – Data visualization
    - Stem-and-leaf plot (莖葉圖)
    - Boxplot (盒狀圖) [box-and-whisker plot(盒鬚圖)] 
    - Histogram (直方圖)
    - Scatter plot (散佈圖)

- Tools for statistical inference
    - Hypothesis testing and confidence interval
    - Significance level; confidence level
    - One- or two-sided test
    - p-value approach; rejection region approach 
    - Parametric or nonparametric methods
- Inference to the mean/median 
    - One-sample t-test; paired t-test
    - Two-sample t-test; Welch’s t-test 
    - Assumptions for the t-tests
    - Permutation tests
    - Rank-sum test; signed-rank test; sign test
- Inference for the variance/dispersion 
    - Variance test (F-test)
    - Levene’s test

<!-- 

## 檢定方法的性質

### Robustness

在統計學中，檢定方法的 **Robustness**（穩健性）是指該方法在一定的違背假設（如非常態分布、變異數不等或存在異常值）的情況下，仍能保持合理的準確性。檢定方法的穩健性取決於方法本身對這些假設的敏感度。穩健的檢定方法在假設條件不完全滿足時，仍然能提供相對可靠的結果。

### Nonparametric and Parametric statistics

 -->
## t-test

### One-sample t-test

#### 假設條件
- 樣本資料來自常態分布。
- 樣本量不大時要求常態性較嚴格，樣本量大時則較為寬鬆。

#### Hypothesis
- $H_0$：$\mu = \mu_0$，母體平均數。
- $H_0$：
   - 雙尾檢定：$\mu \neq \mu_0$
   - 單尾檢定：$\mu > \mu_0$，$\mu < \mu_0$

#### 檢定統計量公式
   $$
   t = \frac{\bar{X} - \mu_0}{s / \sqrt{n}}
   $$
   where $\bar{X}$ is sample mean, $s$ is sample standard deviation, $n$ is sample size.

### Independent two-sample t-test

#### 假設條件
- 兩組資料來自常態分布。
- 兩組樣本彼此獨立且變異數相等（等變異數）。

#### Hypothesis
- $H_0$：$\mu_1 = \mu_2$，兩組平均數相等。
- $H_0$：
   - 雙尾檢定：$\mu_1 - \mu_2 - c \neq 0$
   - 單尾檢定：$\mu_1 - \mu_2 - c > 0$，$\mu_1 - \mu_2- c < 0$

#### 檢定統計量公式
   $$
   t = \frac{\bar{X}_1 - \bar{X}_2 - c}{s_p \sqrt{\frac{1}{n_1} + \frac{1}{n_2}}}
   $$
   where the *pooled standard deviation* $s_p = \sqrt{\frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}}$.
   
   
### Paired two-sample t-test

#### 假設條件
- 配對數據的差異符合常態分布。
- 兩組樣本是依賴的（配對設計）。

#### Hypothesis
- $H_0$：$\mu_d = 0$，配對樣本的平均差。
- $H_0$：
   - 雙尾檢定：$\mu_d \neq 0$
   - 單尾檢定：$\mu_d > 0$，$\mu_d < 0$

#### 檢定統計量公式

$$
t = \frac{\bar{D}}{s_d / \sqrt{n}}
$$

其中 $\bar{D}$ 是配對樣本差異的平均值，$s_d$ 是差異的樣本標準差，$n$ 是配對數量。


### Welch’s t-test

#### 假設條件  
- 兩組樣本獨立且資料來自常態分布。
- 不要求兩組樣本具有等變異數。

#### Hypothesis
- $H_0$：兩組平均數相等：\( \mu_1 = \mu_2 \)。
- $H_a$：  
    - 雙尾檢定：$\mu_1 \neq \mu_2$
    - 單尾檢定：$\mu_1 > \mu_2$，$\mu_1 < \mu_2$

#### 檢定統計量公式 
   $$
   t = \frac{\bar{X}_1 - \bar{X}_2}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}} \sim t_p
   $$
where the degree of freedom df ：  
$$
df = \frac{\left( \frac{s_1^2}{n_1} + \frac{s_2^2}{n_2} \right)^2}{\frac{1}{n_1 - 1}\left( \frac{s_1^2}{n_1} \right)^2 + \frac{1}{n_2 - 1}\left( \frac{s_2^2}{n_2} \right)^2}
$$

### t-test 的穩健性比較

- **One-sample t-test 和 Paired two-sample t-test**：
  - 這些檢定要求樣本來自常態分布，但當樣本量大時，即使分布稍有偏離常態，結果仍然相對穩健（依據中心極限定理，樣本平均數會趨近常態分布）。
  - 如果樣本量較小且分布偏離常態性，t 檢定的結果可能會不可靠。

- **Independent two-sample t-test**：
  - 當樣本來自常態分布且變異數相等時，該檢定最為穩健。若兩組變異數不等，則結果可能偏差，需使用更穩健的 **Welch's t-test**。
  - 若資料出現極端值或違背常態假設，t 檢定不再穩健。

- **Welch’s t-test**：
  - 比標準的獨立 t 檢定更具穩健性，特別是在變異數不等的情況下仍能給出較可靠的結果，且對常態性要求不嚴格。

## Equality of Varience
### F test

#### 假設條件
   - 資料來自常態分布。
   - 兩組樣本獨立。

#### Hypothesis
- $H_0$：兩組母體變異數相等：$\frac{\sigma_1^2}{\sigma_2^2}=1$。
- $H_a$：兩組母體變異數不等：$\frac{\sigma_1^2}{\sigma_2^2} \neq 1$。

#### 檢定統計量公式
   $$
   F = \frac{s_1^2}{s_2^2} \sim F_{n_1-1, n_2-1}
   $$
   其中 $s_1^2$ 和 $s_2^2$ 是兩組樣本的變異數。

### Levene’s Test 要重新確認

#### 假設條件
- 不需要假設數據來自常態分布，因此適用於非常態分布的資料。
- 適用於多組資料，檢測這些組的變異數是否相等。

#### Hypothesis
- $H_0$：各組之間的變異數相等（變異數齊性）。
- $H_a$：至少有一組的變異數不同。

#### 檢定統計量公式
- Levene’s Test 使用各觀測值與其組內平均值的差值的絕對值來計算偏差，然後進行變異數分析（ANOVA）：
  $$
  F = \frac{\sum_{i=1}^{k} n_i (Z_i - \bar{Z})^2 / (k - 1)}{\sum_{i=1}^{k} \sum_{j=1}^{n_i} (Z_{ij} - Z_i)^2 / (N - k)}
  $$
- $Z_{ij} = |X_{ij} - \bar{X}_i|$，其中 $X_{ij}$ 是第 $i$ 組的第 $j$ 個觀測值，$\bar{X}_i$ 是第 $i$ 組的平均數。
- $Z_i$ 是第 $i$ 組的平均偏差，$\bar{Z}$ 是所有組的平均偏差。
- $k$是組數，$n_i$ 是第 $i$ 組的樣本數，$N$ 是所有觀測值的總數。

#### 檢定步驟
1. **計算每組的偏差**：計算每組內各觀測值與其組平均數的絕對偏差 $Z_{ij}$。
2. **計算平均偏差和檢定統計量**：計算各組的平均偏差 $Z_i$ 及總體平均偏差 $\bar{Z}$，然後利用公式計算 $F$-值。
3. **比較臨界值或計算 $p$-值**：在給定顯著性水準下，查找 $F$-分布的臨界值或計算 $p$-值。
4. **結果判斷**：若 $p$-值小於顯著性水準，則拒絕 $H_0$，說明至少有一組的變異數不同。


### Brown-Forsythe Test 要重新確認

#### 假設條件
- 不要求樣本來自常態分布。
- 適用於檢測多組的變異數是否相等（與 Levene’s Test 類似，但使用中位數來增加穩健性）。

#### Hypothesis
- $H_0$：各組的變異數相等。
- $H_a$：至少有一組的變異數不同。

#### 檢定統計量公式
- Brown-Forsythe Test 使用以下公式計算變異數差異：
  $$
  F = \frac{\sum_{i=1}^{k} n_i (Z_i - \bar{Z})^2 / (k - 1)}{\sum_{i=1}^{k} \sum_{j=1}^{n_i} (Z_{ij} - Z_i)^2 / (N - k)}
  $$
  - 其中 $Z_{ij} = |X_{ij} - \text{med}(X_i)|$，$\text{med}(X_i)$ 是每組的中位數。
  - $k$ 是組數，$n_i$ 是第 $i$ 組的樣本數，$Z_i$ 是第 $i$ 組的平均偏差，$\bar{Z}$ 是所有組的平均偏差。

#### 檢定步驟
1. **計算每組偏差**：計算每組數據與該組中位數的絕對偏差 $Z_{ij}$。
2. **計算檢定統計量**：使用公式計算 $F$-值。
3. **比較臨界值**：在給定顯著性水準下，根據 $F$-分布查表確定臨界值，或計算 $p$-值。
4. **結果判斷**：若 $p$-值小於顯著性水準，則拒絕 $H_0$，表示至少有一組的變異數不同。



### Robustness of the methods for Equality of Variances

- 對常態性假設非常敏感，當數據不符合常態分布時，F 檢定的 Type I 錯誤率會顯著增加。
- 如果有非常態性或異常值，F 檢定變得不穩健，因此若兩組變異數不等且樣本數小，建議使用更穩健的替代方法（如 Levene’s Test 或 Brown-Forsythe Test）。

**Levene's Test 和 Brown-Forsythe Test（檢測變異數齊性）**

- **Levene's Test**：
  - 對常態性不敏感，適合在數據偏離常態性時檢測變異數齊性，適用於中位數、平均數或其他中心位置的穩健估計。

- **Brown-Forsythe Test**：
  - 是 Levene’s Test 的一個變體，使用中位數而非平均數來計算變異數齊性，更加穩健且適合極端值較多的情況。


## Normality test

### Kolmogorov–Smirnov test 要重新確認

#### 假設條件
- 無特定假設，適用於任何連續分布。

#### Hypothesis
- $H_0$：觀察樣本來自指定的理論分布（常見為常態分布）。
- $H_a$：觀察樣本不來自指定的理論分布。

#### 檢定統計量公式
   $$
   D = \sup_x |F_n(x) - F(x)|
   $$
   其中 $F_n(x)$是樣本的累積分布函數CDF，$F(x)$是理論分布的累積分布函數。


### Shapiro–Wilk test 要重新確認

#### 假設條件 
   - 樣本為連續資料，樣本量一般要求在 3 至 2000 之間。

#### Hypothesis
- $H_0$：資料來自常態分布。
- $H_a$：資料不來自常態分布。

#### 檢定統計量公式：  
   $$
   W = \frac{\left( \sum_{i=1}^n a_i x_{(i)} \right)^2}{\sum_{i=1}^n (x_i - \bar{x})^2}
   $$
   其中 $x_{(i)}$ 是排序後的樣本值，$a_i$ 是預先計算的常數，依賴於樣本量和常態分布假設。


### 非參數檢定方法（如 Kolmogorov–Smirnov Test 和 Mann–Whitney U Test）

- **Kolmogorov–Smirnov Test**：
  - 該檢定對樣本大小較小時敏感度較低，但對非常態分布有較強的穩健性。
  - 主要用於檢測兩組分布是否相同，適用於任何連續分布，但對於具有離散分布的數據不夠穩健。

- **Mann–Whitney U Test**（非參數替代 t 檢定）：
  - 對偏態、異常值和非常態分布都非常穩健。
  - 不需要等變異數假設，也無需樣本來自常態分布，適用於排名和順序數據。

- **Shapiro-Wilk Test for Normality**：
  - 在常態性檢定方面非常有效且穩健，對小樣本具有高度靈敏度。
  - 若樣本量大，即使輕微偏離常態分布，也可能顯著，因此更適合用於小樣本的常態性檢測。



## Bootstrapping

#### 假設條件
- 不需要資料符合特定分布。
- 可用於任意統計量（如均值、中位數、差異等）的抽樣分布估計。
- 假設觀察樣本具有代表性且可通過重抽樣來逼近母體分布。

#### Hypothesis
- $H_0$：樣本統計量的抽樣分布是隨機的，即無顯著偏差。
- $H_a$：統計量的抽樣分布顯著偏離無顯著性假設的隨機分布。

#### 檢定統計量公式
- Bootstrapping 主要生成重抽樣的統計量（如平均數、差異等），其統計量公式根據檢測目標而定。
- 常見統計量：$\bar{X}_{\text{bootstrap}}$、$\text{SD}_{\text{bootstrap}}$ 等。

#### 檢定步驟
1. **重抽樣**：從樣本中隨機抽取（有放回）許多次，形成多組 bootstrapped 樣本。
2. **計算統計量**：對每組 bootstrapped 樣本計算目標統計量，並記錄其分布。
3. **構建信賴區間**：根據重抽樣統計量的分布構建百分位信賴區間。
4. **判斷結果**：檢查觀察統計量是否在信賴區間內，若不在信賴區間，則拒絕 $H_0$。



## Permutation tests

https://medium.com/@mingyutu1219/permutation-test-置換檢驗-轉-57e008c16558

Permutation test （置換檢驗）是 Fisher 於20世紀30年代提出的一種基於大量計算（computationally intensive），利用樣本資料的全（或隨機）排列，進行統計推斷的方法，因其對總體分佈自由，應用較為廣泛，特別適用於總體分佈未知的小樣本資料，以及某些難以用常規方法分析資料的假設檢驗問題。在具體使用上它和 Bootstrap Methods 類似，通過對樣本進行順序上的置換，重新計算統計檢驗量，構造經驗分佈，然後在此基礎上求出 p-value 進行推斷。

#### 假設條件
- 不需要假設特定的分布形狀，適合於樣本較小且分布不明的情況。
- 資料必須是可交換的，即樣本之間具有相同的分布。

#### Hypothesis
- $H_0$：兩組之間無顯著差異，樣本之間的分配是隨機的。
- $H_a$：兩組之間有顯著差異。


#### 檢定步驟
1. 選擇一個檢定統計量（如平均差、t 檢定統計量等），並根據兩組樣本計算其值。
2. 將 $n_1 + n_2$ 個數字重新分組成大小為 $n_1$ 和 $n_2$ 的組合，並重新計算每個組合的檢定統計量，形成 permutation distribution。
3. 計算產生的檢定統計量至少與步驟 1 中觀察到的檢定統計量一樣極端的重新分組數量。
4. $p$-值為步驟 3 中找到的數量除以重新分組的總數。


<!-- 1. **計算原統計量**：計算實際樣本中的統計量（如平均差、t 檢定統計量等）。
2. **隨機置換**：將兩組樣本合為一組，隨機交換，並計算每次置換的統計量，形成 permutation distribution。
3. **計算 p-value**：統計在置換分布中觀察統計量極端或更極端的**比例**作為 p-value。
4. **結果判斷**：若 p-value 小於顯著性水準，則拒絕 $H_0$，說明兩組間存在顯著差異。 -->

<!-- ![image](https://hackmd.io/_uploads/rknTSrGMkl.png) -->



#### Exact p-value

permutation distribution 是樣本的所有排列組合，但當樣本數越來越大，組合數也會變得很大，計算量會太大。

#### Simulate p-value

permutation distribution 的生成方式是隨機分配樣本 k（=1000，…）次。

#### Approximate p-value

$$Z = \frac{S_1-E(S_1)-0.5 sign(S_1-E(S_1))}{\sqrt{var(S_1)}} \sim N(0, 1)$$




#### Exact p-value

Exact p-value 是根據檢定統計量的精確分布計算出的 p 值，無需近似或模擬。這種方法在樣本數較小或檢定分布已知的情況下較為常用。

**推導與計算方式**：
- 首先根據樣本數計算檢定統計量（例如 T, U 等）。
- 然後根據該統計量的精確分布，找到大於等於觀察到的統計量值的機率，這個機率即為 p 值。
$$\text{Exact p-value} = \frac{\text{大於等於觀察到的統計量值的組數}}{\text{所有的排列組合的組數}}$$
  
**優缺點**：
- **優點**：因為計算的是精確分布，所以結果完全正確。
- **缺點**：當樣本數增加時，精確計算的組合數量急劇增加，計算複雜度變高。因此在大樣本時難以實現。

#### Simulate p-value

Simulate p-value是通過蒙地卡羅模擬或隨機抽樣來計算的。在精確計算不可行的情況下，可通過模擬大量隨機樣本來近似出 p 值。

**推導與計算方式**：
- 在給定的無效假設下，隨機生成許多樣本，並計算每個樣本的檢定統計量。
- 計算這些檢定統計量中，與觀察到的檢定統計量一樣極端的比例，這個比例即為 p 值。
- **例子**：在兩組樣本進行 permutation test（置換檢定）時，可隨機重排兩組樣本的標籤，計算重排後的檢定統計量，重複這一過程並估計 p 值。
  
**優缺點**：
- **優點**：適用於計算困難的情況，尤其適合分布未知或複雜的情況。
- **缺點**：模擬需要大量樣本以獲得精確結果，並且可能需要較長的計算時間。

#### Approximate p-value（近似 p 值）

**概念**：  
近似 p 值是基於檢定統計量的漸近分布（如常態分布、卡方分布等）來計算的。當樣本數較大時，根據中心極限定理，某些統計量的分布趨向於特定分布，因此可以用來估計 p 值。

**推導與計算方式**：
- 根據檢定的假設和檢定統計量的性質，推導出漸近分布。
- 通過觀察值與該分布的理論累積分布函數（CDF）比較，計算出 p 值。
- **例子**：在大樣本下，t 檢定的 t 統計量近似於常態分布，這樣可以用常態分布計算 p 值。

**優缺點**：
- **優點**：計算速度快且適合大樣本。
- **缺點**：當樣本數較小或數據違反漸近分布假設時，近似 p 值可能不準確。

#### 總結

- **Exact p-value**：適用於小樣本且計算精確，但不適合大樣本。
- **Simulate p-value**：適用於分布不明或精確計算困難的情況，但可能需要大量模擬以達到精確。
- **Approximate p-value**：適用於大樣本且計算快速，但小樣本下可能不精確。

這三種方法根據數據大小和檢定需求選擇最適合的方法。

#### Example



### Rank-sum test （Mann–Whitney U Test）

- Rank-sum test 的其他名稱是 Wilcoxon test 和 Mann–Whitney test。不同的名稱是源於不同形式檢定統計量的提出者。需要注意的是，還有一種稱為 Wilcoxon 簽名秩檢定的檢定——這是一種完全不同的檢定方法。
- Rank-sum test 是一種非參數或分布無關的統計工具，這意味著不需要特定的分布假設。
- 雖然當母體為常態時，t 檢定更有效率（它能更好地利用可用數據），但在常態模型中，rank-sum test 的效果並不差很多，並且在許多其他情況下表現更佳，尤其適用於長尾分布。

#### 假設條件

- 兩組數據需要來自同一分布（可以是任意的分布但兩組要是同一分布），中位數可以不同，但變異數要相同。
- 適用於兩組獨立樣本，數據可為連續或順序資料，數據可比較且可排序。
- 類似 independent two sample t-test

#### Hypothesis
- $H_0$：兩組之間的分布相同（兩組的中位數相等）。
- $H_a$：兩組之間的分布不同（中位數不同）。

#### 檢定統計量公式
Rank-Sum Test 計算 U 統計量，根據兩組樣本的 rank-sum 計算：
  $$
  U = n_1 n_2 + \frac{n_1(n_1+1)}{2} - R_1
  $$
其中：
- $n_1$ 和 $n_2$ 分別為兩組的樣本數，
- $R_1$ 是組 1 样本的 rank-sum。

#### 檢定步驟
1. **合併排序**：將兩組資料合併，按大小順序排序並分配排名，如果大小相同則 rank 取平均。
2. **計算 rank-sum**：對兩組分別計算rank-sum。
3. **計算 p-value**：
    - Exact p-value: 找出所有分組的排列組合，計算組1 rank-sum。 $$\text{Exact p-value} = \frac{\text{大於資料的rank-sum的組數}}{所有的排列組合的組數}$$
    - Simulate p-value: 隨機分組 k（=1000、…），計算分組的 rank-sum。 $$\text{Simulate p-value} = \frac{\text{大於資料的rank-sum的組數}}{k}$$
    - Approximate p-value: $\text{Approximate p-value} = \Phi (Z)$, $\Phi$ is the CDF of normal distribution. $$Z = \frac{S_1-E(S_1)-0.5 sign(S_1-E(S_1))}{\sqrt{var(S_1)}} \sim N(0, 1)$$ where $E(S_1) = n_1\bar{R}, var(S_1) = \frac{n_1n_2}{n_1+n_2}s^2_R$. $\bar{R}$ and $s^2_R$ are the sample average and sample variance of the whole ranks. And $0.5 sign(S_1-E(S_1))$ is continuity correction.
4. **結果判斷**：若 p-值小於顯著性水準，拒絕 $H_0$，說明兩組分布不同。

![image](https://hackmd.io/_uploads/rkEZ8Szzkl.png)


![image](https://hackmd.io/_uploads/rkSySSzfyg.png)



### Wilcoxon Signed-Rank Test

**Wilcoxon Signed-Rank Test** 是一種非參數檢定方法，用於比較兩組配對數據（如配對樣本或重複測量），或一組數據與假設的中位數的差異。它是對應於配對樣本 t 檢定的非參數檢定方法。

#### 假設條件
- 配對的兩組數據（即每個樣本有兩個測量值，如測量前和測量後），或單組數據與特定中位數進行比較。
- 假設數據是對稱的，但如果違反此假設，結果仍相對穩健。
- 類似 paired two sample t-test

#### Hypothesis
- $H_0$：median(X) - median(Y) - c = 0
- $H_a$：median(X) - median(Y) - c $\neq ( \geq, \leq)$ 0

#### 檢定步驟
1. **計算差值**：對於配對的兩組數據，計算每對數據的差值 $D_i = X_i - Y_i$。
2. **差值排序**：忽略差值為 0 的樣本，對所有非 0 的差值取絕對值，並按大小排名，如果大小相同則 rank 取平均。
3. **分配正負號**：根據差值的正負分配符號。
4. **計算秩和統計量 $W^+$**：$W^+$ 表示所有正號 rank-sum。
5. **計算 p-value**:
    - Exact p-value: 對差值的正負號做交換組合，計算每組的 $W^+$。$$\text{Exact p-value} = \frac{\text{大於資料的 }W^+{ 的組數}}{所有的排列組合的組數}$$
    - Simulate p-value: 隨機交換正負號 k（=1000、…），計算每組的 $W^+$。 $$\text{Simulate p-value} = \frac{\text{大於資料的 }W^+{ 的組數}}{k}$$
    - Approximate p-value: $\text{Approximate p-value} = \Phi (Z)$, $\Phi$ is the CDF of normal distribution.$$Z = \frac{W^+-E(W^+)-0.5 sign(W^+-E(W^+))}{\sqrt{var(W^+)}} \sim N(0, 1)$$ where $E(W^+) = n(n+1)/4, var(W^+) = \frac{n(n+1)(2n+1)}{24}$. $0.5 sign(S_1-E(S_1))$ is continuity correction.



![image](https://hackmd.io/_uploads/ryzUBHGzJx.png)

