
## Clone App Instruction

### ` npm install`

### `npm install react-scripts --save`

### `npm install @material-ui/lab`

### `npm install @material-ui/core`

### `npm install react-router-dom `

  

## Rename BackEnd to backend

### Install these

  

#### `npm install react-router-dom --save`

#### `npm install mongoose express cors body-parser`

#### `npm install nodemon --save-dev`

#### `npm install axios`

#### `npm install dotenv`

#### `npm install jsonwebtoken --save`

#### `npm install react-scripts --save`

#### `npm install @material-ui/core@next and npm install @material-ui/lab@next`

#### `npm install @mui/material @emotion/react @emotion/styled`

#### `npm i crypto-js`  

### Tutorials For axios:

[How To Use Axios with React](https://www.digitalocean.com/community/tutorials/react-axios-react)

[Official Repo](https://github.com/axios/axios#example)

  

### MAKE API

#### Without parameter

##### Get Method

    router.route('/').get((req, res) => {
    
	    userSchema .find((error, data) => {
	    
		    if (error) {
		    
		    return  next(error)
		    
		    } else {
	    
			    let  filtered_data = data.map(({_id, name, username, email, salary, roll}) => ({_id, name, username, email, salary, roll}));
	    
			    res.json(filtered_data)
	    
		    }
    
	    })
    
    })

#### With parameter

##### Get Method


    router.route('/employees').get((req, res) => {
    
    	userSchema .find({roll:"Employee"},(error, data) => {
    
    		if (error) {
    
    			return  next(error)
    
    		} else {
    
    			let  emp_data = data.map(({name, _id}) => ({name, _id}));
    
    			res.json(emp_data)
    
    		}
    
    	})
    
    })
### Help Links For Update Methods:

[Mongoose: findOneAndUpdate doesn't return updated document](https://stackoverflow.com/questions/32811510/mongoose-findoneandupdate-doesnt-return-updated-document)


`![Good Luck](https://i.imgur.com/aLRN2U0.gif)