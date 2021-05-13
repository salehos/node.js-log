# node.js-log

to import this log module to your module use "npm install nodejs-log-ganjineh"

there is one class in log.js file that has named Log.
it has a constructor with 3 variable, "clientId", "brokers" and "brokers". we want this variables for kafka producer.

Log class has a log function that you need. it has 3 variable for log too. "message", "log_level" and "log_name". it must have "message" but if you didn't fill log_level and log_name, it will fill automatically with "info" for log level and "log.log" for local file name.
