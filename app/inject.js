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

/**
 * Represents a single "course event" (e.g. a discussion section, lecture).
 * @param title the title of the event (e.g. "CSE 30 - Lecture")
 * @param days the days the event is being held, represented as an array of days and
 *             an optional date (e.g. for finals), example: ["MWF"] or ["W", "12/14/2017"]
 * @param time the time the event is being held, as an array (e.g. ["8:00a","8:50a"], ["6:30p","9:20p"])
 * @param location the location the event is being held in, as a string (e.g. "WLH 2001", "APM B402A") 
 */
class CourseEvent {
	constructor(title, days, time, location) {
		this.title = title;
		this.days = days;
		this.time = time;
		this.location = location;
	}
}

/**
 * Represents an entire academic calendar for the quarter.
 * @param quarter the four-character code for the quarter (e.g. "FA17")
 */
class AcademicCalendar {
	constructor(quarter) {
		this.quarter = quarter;
		this.events = [];
	}

    /**
     * Adds a CourseEvent to the internal array of CourseEvents.
     * @param course the CourseEvent being added to the calendar
     */
	addCourseEvent(course) {
		this.events.push(course);
	}
}

// event listener for clicks on the export button
document.getElementById("export-id").addEventListener("click", function() {

	// gets main WebReg course table
	var table = document.getElementById("list-id-table").childNodes[0];

	// gets 4-digit code for the quarter
	var terms = document.getElementById("mainpage-select-term");
	var current = terms.childNodes[0].getAttribute("value").slice(-4);
	var calendar = new AcademicCalendar(current);

	var crse, status;	// within table scope because they carry over between rows

	// iterates through table rows
	for (var i = 1, row; row = table.rows[i]; i++) {

		// row-specific properties
		var type, days, time, bldg, room;

		// iterates through row cells
		for (var j = 0, cell; cell = row.cells[j]; j++) {

			// gets cell type and assigns values as appropriate
			switch (cell.getAttribute("aria-describedby")) {
				case "list-id-table_colsubj":
					crse = cell.innerText && cell.innerText != " " ? cell.innerText : crse;
					break;
				case "list-id-table_FK_CDI_INSTR_TYPE":
					type = cell.innerText && cell.innerText != " " ? cell.innerText : null;
					break;
				case "list-id-table_DAY_CODE":
					days = cell.innerText && cell.innerText != " " ? cell.innerText.split(' ') : null;
					break;
				case "list-id-table_coltime":
					time = cell.innerText && cell.innerText != " " ? cell.innerText.split('-') : null;
					break;
				case "list-id-table_BLDG_CODE":
					bldg = cell.innerText && cell.innerText != " " ? cell.innerText : null;
					break;
				case "list-id-table_ROOM_CODE":
					room = cell.innerText && cell.innerText != " " ? cell.innerText : null;
					break;
				case "list-id-table_colstatus":
					status = cell.innerText && cell.innerText != " " ? cell.innerText : status;
					break;
			}
		}
		if (type != null) {
			var title = crse + " - " + type;
			var location = bldg + " " + room;
			var event = new CourseEvent(title, days, time, location);
			calendar.addCourseEvent(event);
//			console.log("MTuWThF".split(/(?=[A-Z])/));
		}
	}

	console.log(calendar);
});