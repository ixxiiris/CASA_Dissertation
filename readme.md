# CASA Dissertation Project: From Food Belt to Migration Belt

**Full Title:**  
From Food Belt to Migration Belt: Assessing the Socio-Spatial Impacts of the 2010 Drought on Agricultural Land Use and Rural Migration in Guizhou, China

**Author:** Xinyi Zeng  
**Supervisor:** Dr. Ollie Ballinger  
**Institution:** Centre for Advanced Spatial Analysis (CASA), UCL  
**Year:** 2024–2025  

---

## Project Overview

This dissertation investigates the socio-spatial impacts of the 2010 Southwest China drought on rural land productivity and population migration in Guizhou Province.  
Using a spatial quasi-experimental design combining MODIS NDVI, CHIRPS/SPEI climate indices, and county-level demographic data, the study assesses how drought-induced agricultural stress may have driven rural out-migration at the county scale.

**Main research questions:**
1. Did the 2010 drought significantly reduce agricultural productivity in Guizhou?
2. Was there a corresponding increase in rural out-migration?
3. Were these effects spatially heterogeneous?

**Core methods:**  
- Event Study + Difference-in-Differences (DiD) panel regression  
- NDVI time series analysis (2008–2012)  
- Spatial heterogeneity assessment

---

## Repository Structure

``` text
CASA_DISSERTATION/
├── data/
│ ├── raw/ # Original and intermediate datasets
│ ├── cleaned/ # Final model-ready datasets (optional)
│ └── README.md # Data dictionary & variable explanation
├── DiD/ # Event Study + DiD modeling scripts & results
│ ├── models/ # Regression outputs
│ └── plots/ # Event study & effect visualizations
├── references/ # Key papers, PDFs, and citation .bib file
├── notebooks/ # Optional: Jupyter or .ipynb analysis steps
├── figures/ # Maps and visual outputs for the dissertation
├── scripts/ # Python or R scripts for data wrangling
│ └── process_guizhou_panel.py # Core panel data construction script
├── thesis/ # LaTeX or Word write-up folder (optional)
│ └── outline.md # Research design + structure
├── README.md # ← You are here
└── requirements.txt # Optional: Python environment spec
```

---

##  Data Summary

**Spatial unit:**  County level (贵州省县级单位）  
**Temporal range:** 2008–2012 (pre-, during-, and post-drought window)  
**Key datasets:**
- MODIS NDVI (MOD13Q1) via GEE  
- CHIRPS precipitation data (monthly)  
- SPEI drought classification  
- Guizhou statistical yearbook (人口、迁移、耕地比重)

Refer to [`data/raw/README.md`](./data/raw/README.md) for full data descriptions.

---

##  Methods Overview

**Step 1: Panel Construction**  
- Combine NDVI, precipitation, drought class, migration proxy, and controls by county-year  
- Final cleaned file: `guizhou_panel_cleaned.csv`

**Step 2: Treatment Assignment**  
- Define treated counties using 2010 SPEI threshold (SPEI ≤ -1.5)
- Create `treated` and `post` dummy variables

**Step 3: DiD Estimation**  
- Apply 2-way fixed effects DiD regression:

    $y_it = α + β1 * treated_i * post_t + FE_i + FE_t + ε_it$

- Conduct event study variant for dynamic effects:

    $y_it = α + ∑ β_k * treated_i * year_k + FE_i + FE_t + ε_it$


**Step 4: Spatial Analysis & Visualization**  
- Map NDVI drops and population change  
- Visualize heterogeneous effects by region

---

##  Tools & Stack

-  Python (pandas, statsmodels, linearmodels, geopandas)  
-  Google Earth Engine (MODIS, CHIRPS, SPEI)  
-  QGIS for spatial prep and map outputs  
-  R (optional: `fixest`, `plm`) for robustness checks  
-  Zotero for reference management  
-  Markdown + VS Code for writing & logging

---

##  Progress Log

-  Literature review & conceptual framing (April–May)  
-  Data collection & cleaning (May–June)  
-  Ongoing: Model testing, event study plotting  
-  Writing & final analysis (July–August)

---

##  References 【待添加】

> Core references are stored in `/references/`, including:  
> - Zheng et al. (2024), Wang et al. (2024), Yun et al. (2012), Liang et al. (2021)  
> - .bib file available for LaTeX/Zotero integration

---

##  Acknowledgements 【待完善】

Special thanks to Dr. Ollie Ballinger for guidance on methodological design and topic development.  
Field-level insights were inspired by Yun et al. (2012) and enriched by conversations around spatial causality in fragile ecosystems.

---

 *This README will be updated as the project progresses. Last updated: June 2025.*
