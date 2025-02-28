---
title: Sampling Distribution
order: 1
category:
  - Statistics
tag:
  - Study Note
---

<!-- {%hackmd aPqG0f7uS3CSdeXvHSYQKQ %}
# 樣本分布（Sampling Distribution） -->


在統計學中，抽樣分佈（sampling distribution）是指從一個母體中抽取的所有可能的樣本的統計量的分佈。也就是我們假設母體服從某一個分布$X$，因為抽樣是隨機的，所以抽出來的每一個樣本是一個服從母體分布的 random variable。

在這種情況下，我們討論的是樣本均值 $\overline X$ 和樣本變異數 $S^2$ 的抽樣分佈。

假設我們從一個母體中抽取了 $n$ 個樣本 $X_1, X_2, \cdots, X_n$，$X_i$ 是 iid random variable。

<!-- $X_i \overset{\text{i.i.d.}}{\sim}$ -->

## 樣本均值 $\overline X$ 的抽樣分佈

樣本均值 $\overline X$ 是這些樣本值的平均值，用來估計母體平均，定義為：
$$
\overline X = \frac{1}{n} \sum_{i=1}^n X_i
$$

假設如果母體均值為 $\mu$ 母體標準差為 $\sigma$。根據中心極限定理，當樣本數 $n$ 足夠大時，樣本均值 $\overline X$ 的抽樣分佈接近於常態分佈，且其均值為 $\mu$ ，標準差為 $\frac{\sigma}{\sqrt n}$。即：
$$
\overline X \sim N(\mu, \frac{\sigma^2}{n})
$$

## 樣本變異數 $S^2$ 的抽樣分佈

樣本變異數 $S^2$ 是樣本值相對於樣本均值的平方差的平均值，用來估計母體變異數。定義為：

$$
S^2 = \frac{1}{n-1} \sum_{i=1}^{n} (X_i - \overline{X})^2
$$

樣本變異數的抽樣分佈取決於母體是否為常態分佈。如果母體為常態分佈，樣本變異數 $S^2$ 與母體變異數 $\sigma^2$ 的比值（即 $\frac{(n-1)S^2}{\sigma^2}$ ）服從卡方分佈，具有 n-1 個自由度。

$$
\frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1}
$$


