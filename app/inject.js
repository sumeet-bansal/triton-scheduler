/* TODO
 * 1. inject export button
 * 2. isolate schedule from page DOM
 * 3. process each row as class obj
 * 4. generate Google Calendar
 * 5. populate calendar obj-by-obj
*/

// clones add-event-id and modifies key attributes
var exportButton = $("#add-event-id").clone(true);
exportButton.attr('id', "export-id");
exportButton.attr('value', "Export");
$("#schedule-addevent-div").append(exportButton);

// manually matches add-event-id CSS (auto copy copied overridden properties)
var exportButton = document.getElementById("export-id");
var styles = {
    width: '90px',
    height: '20px',
    'font-size': '12px',
    'font-weight': 'bold',
    'margin-left': '10px',
    border: 0,
    color: '#333',
    display: 'inline-block',
    outline: 0,
    cursor: 'pointer',
    'text-align': 'center',
    'text-decoration': 'none',
    'text-shadow': 'rgba(255,255,255,.5) 0 1px 1px',
    'margin-right': '.5em',
    'padding': '.25em 1em',
    'border-radius': '.25em',
    'boxshadow': '0 1px 2px rgba(0,0,0,.5)'
};
for(var i in styles) {
	exportButton.style[i] = styles[i];
}