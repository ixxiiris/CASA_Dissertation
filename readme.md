# MSc Dissertation Project: Guizhou Drought–Migration Analysis

**Full Title:**  
From Food Belt to Migration Belt: Assessing the Socio-Spatial Impacts of the 2010 Drought on Agricultural Land Use and Rural Migration in Guizhou, China

**Author:** Xinyi Zeng  
**Supervisor:** Dr. Ollie Ballinger  
**Institution:** Centre for Advanced Spatial Analysis (CASA), UCL  
**Year:** 2024–2025  

---

## Project Overview

This dissertation examines how the 2010 Southwest China drought affected agricultural productivity and rural migration in Guizhou Province.  
Using a county-level spatial quasi-experimental design with MODIS NDVI, CHIRPS/SPEI drought indices, and demographic statistics, it estimates causal effects via Difference-in-Differences (DiD) and event study methods, and explores spatial heterogeneity.


**Core research questions:**
1. Did the 2010 drought significantly reduce cropland productivity?
2. Did it trigger changes in net migration?
3. Were responses heterogeneous across different county characteristics?
---

## Repository Structure
``` text
CASA_DISSERTATION/
├── data/                # Pre-processed raw datasets (before panel merge)
│   └── raw/             # Original climate, NDVI, and statistical yearbook files
├── DiD/                 # Core modelling scripts & outputs (DiD + Event Study)
│   ├── models/          # Regression result tables
│   └── plots/           # Coefficient/event study visualisations
├── figures/             # Maps and figures used in the dissertation
├── references/          # Key literature (PDFs) + citation .bib file
├── scripts/             # Python processing scripts
│   └── process_panel.py # County-level panel construction workflow
├── thesis               # Drafts and final write-up (Word)   
analysis
├── README.md            # ← This file
└── requirements.txt     # Python environment dependencies
```

---

##  Data Summary

**Unit of analysis**: County-level (88 counties in Guizhou)
**Period**: 2008–2012 (pre-, during-, and post-drought)
**Main data sources**:

MODIS NDVI (MOD13Q1) – cropland growing season greenness

MODIS MCD12Q1 – cropland mask (2010, IGBP classification)

SPEIbase v2.10 – Standardised Precipitation Evapotranspiration Index

CHIRPS – monthly precipitation

Guizhou Statistical Yearbooks & 2000/2010 census – population & migration

---

##  Methods Overview

**1. Panel Data Construction**

- Merge NDVI, climate, migration, and county attributes into a balanced 2008–2012 panel.

**2. Treatment Definition**

- Counties in top 50% of drought pixel rate (SPEI < -1.5, Feb–Jun 2010) assigned as treated.

**3. Estimation**

- Two-way fixed effects DiD for average treatment effect.

- Event study for dynamic effects.

**4. Heterogeneity Analysis**

- Interaction models for elevation, cropland share, population density, and agricultural dependence.

**5. Robustness Checks**

- Alternative drought thresholds, placebo years, outlier exclusion, and spatial spillover controls.

**6. Visualisation
**
- Maps of NDVI change, drought exposure, and migration patterns; coefficient plots.

---

##  Tools & Stack

- Python: pandas, geopandas, statsmodels, linearmodels, matplotlib

- Google Earth Engine: MODIS, CHIRPS, SPEI processing

- GIS pro: spatial analysis & mapping

- Zotero: reference management

---

##  Progress Log

- April-May: Literature review & conceptual framing.

- May–June: Data acquisition & preprocessing in GEE/Python.

- July: Core DiD/event study modelling; robustness checks.

- August: Heterogeneity analysis, figure finalisation, dissertation write-up.
---

##  References 【待添加】

> Core references are stored in `/references/`, including:  
>- Beine, M. and Parsons, C. (2015). ‘Climatic Factors as Determinants of International Migration’. The Scandinavian Journal of Economics. Wiley, 117 (2), pp. 723–767. doi: 10.1111/sjoe.12098.
>- Black, R., Adger, W. N., Arnell, N. W., Dercon, S., Geddes, A. and Thomas, D. (2011). ‘The effect of environmental change on human migration’. Global Environmental Change, 21, pp. S3–S11. doi: 10.1016/j.gloenvcha.2011.10.001.
>- Bohra-Mishra, P., Oppenheimer, M., Cai, R., Feng, S. and Licker, R. (2017). ‘Climate variability and migration in the Philippines’. Population and Environment, 38 (3), pp. 286–308. doi: 10.1007/s11111-016-0263-x.
>- Cai, R., Feng, S., Oppenheimer, M. and Pytlikova, M. (2016). ‘Climate variability and international migration: The importance of the agricultural linkage’. Journal of Environmental Economics and Management. Elsevier BV, 79, pp. 135–151. doi: 10.1016/j.jeem.2016.06.005.
>- Cattaneo, C., Beine, M., Fröhlich, C. J., Kniveton, D., Martinez-Zarzoso, I., Mastrorillo, M., Millock, K., Piguet, E. and Schraven, B. (2019). ‘Human Migration in the Era of Climate Change’. Review of Environmental Economics and Policy, 13 (2), pp. 189–206. doi: 10.1093/reep/rez008.
>- Central Committee of the Communist Party of China and State Council of the People’s Republic of China. (2025). The Rural Revitalisation Plan (2024–2027). Beijing, China: Government of the People’s Republic of China. Available at: https://www.gov.cn/zhengce/202501/content_7000493.htm.
>- Chan, K. W. (2010). ‘The Household Registration System and Migrant Labor in China: Notes on a Debate’. Population and Development Review, 36 (2), pp. 357–364. doi: 10.1111/j.1728-4457.2010.00333.x.
>- De Haas, H. (2021). ‘A theory of migration: the aspirations-capabilities framework’. Comparative Migration Studies. Springer Science and Business Media LLC, 9 (1). doi: 10.1186/s40878-020-00210-4.
>- Gray, C. and Mueller, V. (2012). ‘Drought and Population Mobility in Rural Ethiopia’. World Development. Elsevier BV, 40 (1), pp. 134–145. doi: 10.1016/j.worlddev.2011.05.023.
>- Guizhou Provincial Bureau of Statistics. (2011). Guizhou Statistical Yearbook 2011. Beijing: China Statistics Press.
>- Hoffmann, R. (no date). ‘Drought and aridity influence internal migration worldwide’. Nature Climate Change. doi: doi.org/10.1038/s41558-024-02165-1.
>- Hoffmann, R., Abel, G., Malpede, M., Muttarak, R. and Percoco, M. (2024). ‘Drought and aridity influence internal migration worldwide’. Nature Climate Change. Springer Science and Business Media LLC, 14 (12), pp. 1245–1253. doi: 10.1038/s41558-024-02165-1.
>- Huang, J. (2012). ‘Spatial changes of population and economic causes in Guizhou Province in the past decade’. Contemporary Economics, (8), pp. 94–96.
>- Intergovernmental Panel On Climate Change (Ipcc). (2023). Climate Change 2022 – Impacts, Adaptation and Vulnerability: Working Group II Contribution to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change. 1st edn. Cambridge University Press. doi: 10.1017/9781009325844.
>- Liang, S., Wu, W., Sun, J., Li, Z., Sun, X., Chen, H., Chen, S., Fan, L., You, L. and Yang, P. (2021). ‘Climate-mediated dynamics of the northern limit of paddy rice in China’. Environmental Research Letters, 16 (6), p. 064008. doi: 10.1088/1748-9326/abfac0.
>- Liang, Z. and Ma, Z. (2004). ‘China’s Floating Population: New Evidence from the 2000 Census’. Population and Development Review, 30 (3), pp. 467–488. doi: 10.1111/j.1728-4457.2004.00024.x.
>- Lu, M. and Xia, Y. (2016). ‘Migration in the People’s Republic of China’.
>- Luo, Y., Tian, M., Wu, H., Wang, C. and Zhang, J. (2019). ‘Spatio-temporal distribution and climatic background of agricultural drought in Guizhou Province’. Jilin Agriculture, (10), pp. 108–112. doi: 10.14025/j.cnki.jlny.2019.10.071.
>- McLeman, R. (2018). ‘Thresholds in climate migration’. Population and Environment. Springer Science and Business Media LLC, 39 (4), pp. 319–338. doi: 10.1007/s11111-017-0290-2.
>- Mueller, V., Gray, C. and Kosec, K. (2014). ‘Heat stress increases long-term human migration in rural Pakistan’. Nature Climate Change. Springer Science and Business Media LLC, 4 (3), pp. 182–185. doi: 10.1038/nclimate2103.
>- National Climate Center, C. M. A. (2025). China Climate Change Blue Book (2025). 9787030824820. Beijing, China: Science Press.
>- Sun, Y. (2023). ‘Temperature effects on rural household outmigration: Evidence from China’. Population and Environment, 45 (4), p. 25. doi: 10.1007/s11111-023-00441-4.
>- The State of Food and Agriculture 2021: Making Agrifood Systems More Resilient to Shocks and Stresses. (2021). S.l.: Food and Agriculture Organization of the United Nations.
>- Vicente-Serrano, S. M., Beguería, S. and López-Moreno, J. I. (2010). ‘A Multiscalar Drought Index Sensitive to Global Warming: The Standardized Precipitation Evapotranspiration Index’. Journal of Climate, 23 (7), pp. 1696–1718. doi: 10.1175/2009JCLI2909.1.
>- Wang, H., Chen, B. and Shen, X. (2024). ‘Extreme rainfall, farmer vulnerability, and labor mobility—Evidence from rural China’. Science of The Total Environment, 918, p. 170866. doi: 10.1016/j.scitotenv.2024.170866.
>- Wang, X. (2013). ‘Different Roles of Land in Rural–Urban Migration: Evidence from China’s Household Survey’. China & World Economy, 21 (1), pp. 107–126. doi: 10.1111/j.1749-124X.2013.12011.x.
>- Wei, W. and Li, X. (2021). ‘Changes of NDVI in Beipan River Basin of Guizhou Province and its relationship with terrain gradient and population distribution during 2000–2018’. Bulletin of Soil and Water Conservation, 41 (6), pp. 361–368. doi: 10.13961/j.cnki.stbctb.2021.06.046.
>- Yun, S., Jun, Y. and Hong, S. (2012). ‘Social perception and response to the drought process: a case study of the drought during 2009–2010 in the Qianxi’nan Prefecture of Guizhou Province’. Natural Hazards, 64 (1), pp. 839–851. doi: 10.1007/s11069-012-0274-6.
>- Zheng, W., Chen, X., Xu, W. and Wu, Z. (2024). ‘Heterogeneous and short-term effects of a changing climate on farmers’ labor allocation: An empirical analysis of China’. PLOS ONE. Edited by Z. Mushtaq, 19 (7), p. e0306260. doi: 10.1371/journal.pone.0306260.


---

##  Acknowledgements 【待完善】

Special thanks to Dr. Ollie Ballinger for guidance on methodological design and topic development.  
Field-level insights were inspired by Yun et al. (2012) and enriched by conversations around spatial causality in fragile ecosystems.

---

 *This README will be updated as the project progresses. Last updated: August 2025.*
