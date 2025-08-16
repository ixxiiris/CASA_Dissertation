// === 1. 加载贵州县界数据 ===
var guizhou = ee.FeatureCollection("projects/casa0004dissertation/assets/guizhou_county");

// === 2. 加载SRTM高程数据 ===
var dem = ee.Image("USGS/SRTMGL1_003");

// === 3. 计算每个县的平均高程 ===
var elevStats = dem.reduceRegions({
  collection: guizhou,
  reducer: ee.Reducer.mean(),  // 可改为 median() 作为稳健估计
  scale: 90,  // SRTM 分辨率
  crs: 'EPSG:4326'
});

// === 4. 只保留县名 + 平均高程 字段用于导出 ===
var exportTable = elevStats.select(["ENG_NAME", "mean"]);

// === 5. 导出到 Google Drive ===
Export.table.toDrive({
  collection: exportTable,
  description: "guizhou_mean_elevation_export",
  fileFormat: "CSV"
});