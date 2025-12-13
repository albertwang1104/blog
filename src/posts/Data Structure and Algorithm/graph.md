---
title: Graph
order: 2
date: 2025-11-30
category:
  - DSA
tag:
  - Study Note
---

## Representation of a Graph

### Adjacency Matrix

**Direct Graph**
求頂點i的In/Out-Degree？In-Degree將第i列加總；Out-Degree將第i行加總

## Minimum Spanning Tree

### Kruskal's algorithm

通過不斷選擇當前情況下的最優解，也就是權重最小的邊，並使用"不形成循環"的條件來確保最終生成樹是一棵樹，並且包含所有節點。

Kruskal演算法的主要步驟如下：

1. 初始化：首先，將所有的邊按照權重升序排序，同時初始化一個空的最小生成樹。
2. 依次選擇最小權重的邊：從排序後的邊中選擇權重最小的邊，然後將其添加到最小生成樹中。
3. 檢查是否形成循環：在添加新邊之後，檢查是否形成了循環。如果形成循環，則捨棄該邊，以確保生成樹的連通性，然後繼續選擇下一個最小權重的邊。
4. 重複步驟2和步驟3：持續執行步驟2和步驟3，直到最小生成樹包含所有節點或所有邊已經被考慮完。

Kruskal演算法是一種貪心算法，因為它優先選擇當前情況下的最優解，而不關心全局最優解。演算法的時間複雜度通常為O(E log E)，其中E是邊的數目。

### Sollin's algorithm
Steps:
1. 將各頂點視為獨立的一棵樹
2. 就每棵樹挑出成本最小的邊，並加入此樹
3. 刪除重複挑出的邊，只保留一份
4. 重複2~3直到只剩一棵樹，或是無邊可挑

> 若圖的邊權重有重複，則最小生成樹不唯一；若權重全不同，則此圖有唯一的最小生成樹。（cut property）

- [Graph](https://garychang.gitbook.io/data-structure/4-graph)
- [最小生成樹-minimum-spanning-tree-mst](https://medium.com/@ralph-tech/演算法學習筆記-最小生成樹-minimum-spanning-tree-mst-26c9482419a7)


