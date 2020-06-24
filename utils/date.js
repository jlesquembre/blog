const { DateTime } = require("luxon");

function readableDate(dateObj) {
  return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
}

// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
function htmlDateString(dateObj) {
  return DateTime.fromJSDate(dateObj).toFormat("yyyy-LL-dd");
}

function dateToISO(dateObj) {
  return DateTime.fromJSDate(dateObj).toISO({
    includeOffset: true,
    suppressMilliseconds: true,
  });
}

module.exports = { dateToISO, readableDate, htmlDateString };
