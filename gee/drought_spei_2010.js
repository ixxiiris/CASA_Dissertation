// === 用户参数设置 ===
var counties = ee.FeatureCollection("projects/casa0004dissertation/assets/guizhou_county");

// === Step 1: 加载 SPEI 3-month 数据并选定时间段 ===
var spei03 = ee.ImageCollection("CSIC/SPEI/2_10")
  .filterDate('2010-02-01', '2010-06-30')
  .select('SPEI_03_month');

// === 2. 计算每张影像的干旱掩膜（SPEI < -1.5） ===
var droughtBinaryCollection = spei03.map(function(img) {
  return img.lt(-1.5).rename('drought');  // 返回0或1的图像
});

// === 3. 将5个月的干旱掩膜取平均，得到干旱频率（0-1） ===
var droughtFrequency = droughtBinaryCollection.mean();  // 每个像元干旱频率

// Step 4: 以中位数作为频率代表值（更稳健）
var droughtStats = droughtFrequency.reduceRegions({
  collection: counties,
  reducer: ee.Reducer.median(),
  scale: 10000  // 可选更高分辨率
});

// Step 5: 使用四分位数分类 drought_class（相对干旱强度）
var classified = droughtStats.map(function(f) {
  var freq = ee.Number(f.get('median'));
  var cls = ee.Algorithms.If(freq.lte(0.4), 0,
    ee.Algorithms.If(freq.lte(0.6), 1,
    ee.Algorithms.If(freq.lte(0.8), 2, 3)));
  return f.set({
    'drought_pixel_rate': freq,
    'drought_class': cls
  });
});


// === 6. 可视化 ===
var styled = classified.map(function(f) {
  var c = ee.Number(f.get('drought_class'));
  var color = ee.Algorithms.If(c.eq(2), 'orange',
                ee.Algorithms.If(c.eq(1), 'yellow',
                ee.Algorithms.If(c.eq(0), 'green', 'grey')));  // fallback 加 grey
  return f.set('style', {
    color: 'black',
    width: 1,
    fillColor: color,
    fillOpacity: 0.5
  });
});


Map.centerObject(counties, 7);  // 居中显示贵州
Map.addLayer(droughtFrequency.clip(counties.geometry()), 
             {min: 0, max: 2, palette: ['green','orange','red']}, 
             'SPEI Drought Frequency (Feb–Jun 2010)');
Map.addLayer(styled.style({styleProperty: 'style'}), {}, 'County Drought Class (Q-Based)');

print(classified.aggregate_histogram('drought_class'));


// step6: 导出表格
Export.table.toDrive({
  collection: classified,
  description: 'guizhou_drought_class_2010_final',
  fileFormat: 'CSV'
});
