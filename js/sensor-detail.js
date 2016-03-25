(function(){
  var sensorId = $.url().param('id');
  $.ajax({
    url: 'sensors/' + sensorId,
  })
  .done(function(sensors) {
    var sensor = sensors[0];
    var sensorName = $('#sensor-name');
    var sensorKey = $('#sensor-key')
    var sensorDescription = $('#sensor-description');
    var latestUpdate = $('#latest-update');
    var pm25 = $('#pm25');
    sensorName.text(sensor.name);
    sensorKey.text(sensor._id);
    sensorDescription.text(sensor.description);
    latestUpdate.text(sensor.latestUpdate);
    pm25.text(sensor.pm25Index)
  })
  .fail(function(error) {
    console.error(error);
  });

  $.ajax({
    url: 'sensors/' + sensorId + '/data',
  })
  .done(function(dataArray) {
    var sensorData = $('#sensor-data');
    var html = '';
    dataArray.forEach(function(data) {
      sensorData.append('<li class="collection-item">' + 
        new Date(data.datetime) + ', ' + data.pm25Index + '</li>');
    });
  })
  .fail(function(error) {
    console.error(error);
  });
})();
