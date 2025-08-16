// === Step 1: 输入县界 ===
var counties = ee.FeatureCollection("projects/casa0004dissertation/assets/guizhou_county");

// === Step 2: CHIRPS 数据集（每日降水，单位mm）===
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
  .select("precipitation");

// === Step 3: 设置年份与 Growing Season 范围 ===
var years = ee.List.sequence(2008, 2012);
var startMonth = 4;
var endMonth = 9;

// === Step 4: 主循环，逐年计算 growing season 总降水 ===
var annualRainfall = years.map(function(y) {
  var year = ee.Number(y);
  var start = ee.Date.fromYMD(year, startMonth, 1);
  var end = ee.Date.fromYMD(year, endMonth + 1, 1);  // 包含9月

  var season = chirps.filterDate(start, end);

  // 累加 Growing Season 总降水
  var totalRain = season.sum().rename('rain_gs');

  // 空间聚合至县域
  var stats = totalRain.reduceRegions({
    collection: counties,
    reducer: ee.Reducer.mean(),
    scale: 5000,  // CHIRPS 分辨率约 5km
  }).map(function(f) {
    return f.set('year', year);
  });

  return stats;
});

// === Step 5: 合并输出 ===
var rain_panel = ee.FeatureCollection(annualRainfall).flatten();

Export.table.toDrive({
  collection: rain_panel,
  description: 'guizhou_chirps_rainfall_panel_2008_2012',
  fileFormat: 'CSV'
});
