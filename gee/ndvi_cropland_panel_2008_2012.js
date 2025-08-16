// === 1. 输入 ===
var counties = ee.FeatureCollection("projects/casa0004dissertation/assets/guizhou_county");

// === 2. NDVI 数据集（MODIS MOD13Q1, scaled）===
var modisNDVI = ee.ImageCollection("MODIS/006/MOD13Q1")
  .select('NDVI')
  .map(function(img) {
    return img.multiply(0.0001).copyProperties(img, ['system:time_start']);
  });

// === 3. MCD12Q1 耕地掩膜（IGBP classification, value 12）===
var cropland_mask = ee.ImageCollection("MODIS/006/MCD12Q1")
  .filter(ee.Filter.calendarRange(2010, 2010, 'year'))  // 使用2010年作为代表年
  .first()
  .select('LC_Type1')
  .eq(12);  // cropland = 12 in IGBP scheme

// === 4. 设置年份 + growing season 时间范围 ===
var years = ee.List.sequence(2008, 2012);
var startMonth = 4;
var endMonth = 9;

// === 5. 主循环：每年 growing season NDVI mean（仅耕地）===
var annualNDVI_cropland = years.map(function(y) {
  var year = ee.Number(y);
  var start = ee.Date.fromYMD(year, startMonth, 1);
  var end = ee.Date.fromYMD(year, endMonth + 1, 1);

  var ndviSeason = modisNDVI.filterDate(start, end)
    .map(function(img) {
      return img.updateMask(cropland_mask);  // 应用耕地掩膜
    });

  var meanNDVI = ndviSeason.mean().rename('ndvi_cropland');

  var stats = meanNDVI.reduceRegions({
    collection: counties,
    reducer: ee.Reducer.mean(),
    scale: 250,
  }).map(function(f) {
    return f.set('year', year);
  });

  return stats;
});

// === 6. 合并并导出 ===
var ndvi_crop_panel = ee.FeatureCollection(annualNDVI_cropland).flatten();

Export.table.toDrive({
  collection: ndvi_crop_panel,
  description: 'guizhou_ndvi_cropland_panel_2008_2012',
  fileFormat: 'CSV'
});
