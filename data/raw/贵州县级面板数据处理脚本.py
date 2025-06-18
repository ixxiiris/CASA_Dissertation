
import pandas as pd
import numpy as np

# 读取数据（替换为你实际的文件路径）
df = pd.read_csv("贵州_线性插值.csv")

# 重命名主要字段
df = df.rename(columns={
    "区县": "county_name",
    "年份": "year",
    "年末总人口_万人": "pop_total",
    "乡村人口_万人": "pop_agri",
    "行政区域土地面积_平方公里": "pop_density",
    "城市": "city_name"
})

# 筛选 2008–2012 年
df = df[df["year"].between(2008, 2012)].copy()

# 添加城市核心区标志
urban_core_names = {
    "南明区", "云岩区", "花溪区", "乌当区", "白云区", "观山湖区",
    "钟山区", "红花岗区", "汇川区", "播州区", "西秀区", "碧江区", "万山区",
    "凯里市", "都匀市", "福泉市", "兴义市", "七星关区"
}
df["urban_core"] = df["county_name"].isin(urban_core_names)
df.loc[df["urban_core"], "pop_agri"] = 0.0

# 添加 post（干旱后年份 Dummy）
df["post"] = df["year"].apply(lambda y: 1 if y >= 2010 else 0)

# 添加万山区处理（仅保留2011年后数据）
df.loc[(df["county_name"] == "万山区") & (df["year"] < 2011),
       ["pop_total", "pop_agri"]] = np.nan

# 添加模拟出生/死亡（后续替换真实数据）
province_rates = {
    2008: {"birth": 13.4, "death": 5.7},
    2009: {"birth": 13.3, "death": 5.8},
    2010: {"birth": 13.0, "death": 5.9},
    2011: {"birth": 12.8, "death": 6.0},
    2012: {"birth": 12.5, "death": 6.1},
}
df["births"] = np.nan
df["deaths"] = np.nan
df["births_source"] = "missing"
df["deaths_source"] = "missing"

for idx, row in df.iterrows():
    y = row["year"]
    pop = row["pop_total"]
    if pd.isna(row["births"]) and y in province_rates:
        df.at[idx, "births"] = pop * 10000 * province_rates[y]["birth"] / 1000
        df.at[idx, "births_source"] = "estimated"
    if pd.isna(row["deaths"]) and y in province_rates:
        df.at[idx, "deaths"] = pop * 10000 * province_rates[y]["death"] / 1000
        df.at[idx, "deaths_source"] = "estimated"

# 构造净迁移变量
df = df.sort_values(by=["county_name", "year"])
df["pop_total_persons"] = df["pop_total"] * 10000
df["pop_change"] = df.groupby("county_name")["pop_total_persons"].diff()
df["natural_growth"] = df["births"].shift(1) - df["deaths"].shift(1)
df["net_migration"] = df["pop_change"] - df["natural_growth"]
df["net_migration_per_1000"] = df["net_migration"] / 1000

# 导出结果
df.to_csv("贵州省88县_面板数据_含净迁移变量.csv", index=False, encoding="utf-8-sig")
