const express = require("express")
const path = require('path')
const app = express()  

// if(process.env.NODE_ENV == 'production'){
	app.use(express.static(path.join(__dirname, 'build')));

	app.get('*', (req,res)=> {
		res.sendFile(path.join(__dirname, 'build/index.html'));
	});
// }
app.set('port', (process.env.PORT || 80));

app.listen(app.get('port'), function() {
  	console.log('React app is running on port', app.get('port'));
});
