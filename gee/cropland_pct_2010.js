// === Step 1: 输入县界 ===
var counties = ee.FeatureCollection("projects/casa0004dissertation/assets/guizhou_county");

// === Step 2: 加载 MCD12Q1（2010）地表覆盖数据 ===
var lc2010 = ee.ImageCollection("MODIS/006/MCD12Q1")
  .filter(ee.Filter.calendarRange(2010, 2010, 'year'))
  .first()
  .select('LC_Type1');

// === Step 3: 生成 cropland 掩膜（IGBP 类型 12）===
var cropland = lc2010.eq(12);  // 耕地像元
var valid = lc2010.neq(0);     // 有效像元（排除缺失）

// === Step 4: 统计每县 cropland 占比 ===
var stats = counties.map(function(f) {
  var area = cropland.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: f.geometry(),
    scale: 500,
    maxPixels: 1e8
  }).get('LC_Type1');

  var total = valid.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: f.geometry(),
    scale: 500,
    maxPixels: 1e8
  }).get('LC_Type1');

  var pct = ee.Number(area).divide(ee.Number(total)).multiply(100);
  return f.set('cropland_pct', pct);
});

// === Step 5: 导出 ===
Export.table.toDrive({
  collection: stats,
  description: 'guizhou_cropland_pct_2010',
  fileFormat: 'CSV'
});
