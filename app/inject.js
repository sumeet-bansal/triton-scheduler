/* TODO
 * 1. inject export button
 * 2. isolate schedule from page DOM
 * 3. process each row as class obj
 * 4. generate Google Calendar
 * 5. populate calendar obj-by-obj
*/

// inject export button
var exportButton = $("#add-event-id").clone(true);
exportButton.attr('id', "export-id");
exportButton.attr('value', "Export");
$("#schedule-addevent-div").append(exportButton);
$("#export-id").copyCSS($("#add-event-id"));
