const { Kafka } = require('kafkajs')
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
var dateFormat = require('dateformat');


class Log{
	constructor(clientId, brokers, module_name){
		this.clientId = clientId;
		this.brokers = brokers;
		this.moduleName = module_name;
	}


	async log(message, log_level, log_name) {		
		if(log_name === undefined){
				log_name = "log"
			}
		if(log_level === undefined){
				log_level = "info"
			}
		const myFormat = printf(({ level, message, timestamp }) => {
	 	 	return `${timestamp} ${level} : ${message}`;
		});

		
		const logger = createLogger({
		  	format: combine(
	    		timestamp({
	            format: 'YYYY-MM-DD HH:mm:ss'
	        }),
	    		myFormat
	  		),
		  	transports: [new transports.File({
	      filename: log_name+".log",
	    }),]
		});
		await logger.log(log_level, message);
		const kafka = new Kafka({ clientId: this.clientId,
    		brokers: this.brokers,
    		moduleName: this.moduleName
    		 })
		const producer = kafka.producer()
		
		var day = dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss.l");
	    await producer.connect()
		await producer.send({
				topic: "log-test",
				messages: [
					{
						value: `{\"message\": \"${message}\",\"log_level\": \"${log_level}\", \"module_name\": \"${this.moduleName}\"}`,
					},
				],
			})
		await producer.disconnect()
	}
}

module.exports.Log = Log;