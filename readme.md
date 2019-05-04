![](https://cdn.dribbble.com/users/444784/screenshots/5418922/vidly-final-logo-color.jpg)

# Vidly Express Server

A practical node-express project in order to increase my backend implement skills using javaScript .

# Getting Started

### These instructions will get you a copy of the project up and running on your local machine for development and testing purposes:

## Primary exception of sharing this is repository is your attention on notes I'm attached on the following of this passage:

## Prerequisites

- clone the source code using git or download it using top right link

## Installing

run following command on project root in order to installing dependencies and dev-dependencies

> npm install

# Running the tests

Application writing base on test driven development;
whole tests source codes available on tests directory.

## Break down into unit and integration tests

### jest testing command embedded into npm scripts test you can test all aspects of application using following command:

> npm run test

### here's lists of all tests passed by _routeHandlers_ and _middleWares_ also end point address provided as topic on top of each describe:

```
PASS  tests/integration/movie.test.js
  /api/movie
    GET/
      ✓ Should return all movies when send GET request (414ms)
      ✓ should return 404 if no movie found (7ms)
    GET/:id
      ✓ Should return 404 when receive an invalid id (9ms)
      ✓ Should return the movie by given id. (9ms)
    POST/
      ✓ Should return 401 if no token provided (15ms)
      ✓ Should return 400 if movieTitle less than 3 character (11ms)
      ✓ Should return 400 if movieTitle more than 255 character (5ms)
      ✓ Should return 400 no genresId is provided (5ms)
      ✓ Should return 400 no numberInStock is less than 0 (6ms)
      ✓ Should return 400 dailyRentalRate is less than 0 (5ms)
      ✓ should return 200 if request is valid (7ms)
      ✓ Should save the movie if request is valid (8ms)
      ✓ Should return movie if request is valid (6ms)
    PUT/
      ✓ Should return 401 if no token provided (5ms)
      ✓ Should return 400 if movieTitle less than 3 character (6ms)
      ✓ Should return 400 if movieTitle more than 255 character (21ms)
      ✓ Should return 400 no genresId is provided (15ms)
      ✓ Should return 400 no numberInStock is less than 0 (5ms)
      ✓ Should return 400 dailyRentalRate is less than 0 (5ms)
      ✓ Should return 404 if no movie founded by the given id (9ms)
      ✓ should return 200 if request is valid (13ms)
      ✓ Should update the movie if request is valid (11ms)
      ✓ Should send Updated movie if request is valid (10ms)
    DELETE/
      ✓ should return 401 if token not provided (4ms)
      ✓ should return 404 if no movie founded by the given id (5ms)
      ✓ should return 200 if user is admin and id is valid (5ms)
      ✓ should remove movie given id if user is admin and id is valid (7ms)
      ✓ should send movie genre to the user (5ms)

 PASS tests/integration/users.test.js
  /api/users
    GET/me
      ✓ should return 401 if no token provided (80ms)
      ✓ should return 200 if request is valid (91ms)
      ✓ should send user if request is valid (76ms)
    POST/
      ✓ should return 401 if not token provided (3ms)
      ✓ should return 400 if user name is less than 3 character (2ms)
      ✓ should return 400 if user email is less than 10 character (7ms)
      ✓ should return 400 if user name is more than 50 character (9ms)
      ✓ should return 400 if user email is more than 255 character (4ms)
      ✓ should return 400 if user password is less than 8 character (3ms)
      ✓ should return 400 if user password is more than 30 character (2ms)
      ✓ should return 400 if user password does not contain at least one lowerCase character (3ms)
      ✓ should return 400 if user password does not contain at least one UpperCase character (2ms)
      ✓ should return 400 if user password does not contain at least one numeric character (3ms)
      ✓ should return 400 if user already exist by given email (5ms)
      ✓ should save the user if request is valid (85ms)
      ✓ should return 200 if request is valid (75ms)
      ✓ should send userInfo if request is valid (74ms)

 PASS  tests/integration/authentication.test.js
   /auth
    POST/
      ✓ should return 400 if email less than 10 character (148ms)
      ✓ should return 400 if password less than 8 character (75ms)
      ✓ should return 400 if email more than 255 character (75ms)
      ✓ should return 400 if password more than 1024 character (73ms)
      ✓ should return 400 if user by the given email not found (77ms)
      ✓ should return 400 if password is not correct (146ms)
      ✓ return 200 if request is valid (140ms)
      ✓ should send specific string if request is valid (140ms)

 PASS  tests/integration/rental.test.js
     /api/rentals
    GET/
      ✓ should return 401 if no token provided (81ms)
      ✓ should return 404 if not rental available (15ms)
      ✓ should return 200 if request is valid (16ms)
      ✓ should send all rentals (15ms)
    GET/:id
      ✓ should return 401 if no token provided (10ms)
      ✓ should return 404 if not rental available by given id (12ms)
      ✓ should return 200 if request is valid (13ms)
      ✓ should send rental if request is valid (13ms)
    POST/
      ✓ should return 401 if no token provided (14ms)
      ✓ should return 400 if no customer found by the given id (21ms)
      ✓ should return 400 if no movie found by the given id (14ms)
      ✓ should return 400 if movie.numberInStock is zero (22ms)
      ✓ should return 200 if request is valid (19ms)
      ✓ should save rental in db if request is valid (21ms)
      ✓ should decrease movie number in stock if request is valid (19ms)
      ✓ should send rental if request is valid (20ms)

 PASS  tests/integration/home.test.js
  /
    GET/
      ✓ should 200 receiving get request (444ms)

 PASS  tests/integration/customer.test.js
  /api/customer
    GET/
      ✓ should return 404 if customer by the given id not found (94ms)
      ✓ should return 200 if request is valid (6ms)
      GET/:id
        ✓ should return 404 if customer by given id not found (6ms)
        ✓ should return 200 if request is valid (7ms)
      POST/
        ✓ should return if not token provided (6ms)
        ✓ should return 400 if customer name is less than 3 character (6ms)
        ✓ should return 400 if customer phone is less than 5 character (5ms)
        ✓ should return 400 if customer name is more than 255 character (5ms)
        ✓ should return 400 if customer phone is more than 255 character (4ms)
        ✓ should return 400 if customer phone is more than 255 character (4ms)
        ✓ should return 200 if request is valid (5ms)
        ✓ should add the given customer into the db if request is valid (6ms)
        ✓ should send customer to user (6ms)
      PUT/
        ✓ should return if not token provided (4ms)
        ✓ should return 400 if customer name is less than 3 character (4ms)
        ✓ should return 400 if customer phone is less than 5 character (3ms)
        ✓ should return 400 if customer name is more than 255 character (4ms)
        ✓ should return 400 if customer phone is more than 255 character (4ms)
        ✓ should return 400 if customer phone is more than 255 character (4ms)
        ✓ should return 200 if requset is valid (7ms)
        ✓ should change the given customer into the db if request is valid (8ms)
        ✓ should send edited customer to user if requset is valid (11ms)
      DELETE/
        ✓ should return 401 if no toke provided (4ms)
        ✓ should return 404 if no customer by the given id (4ms)
        ✓ should return 200 request is valid (5ms)
        ✓ should delete customer by the given id if request is valid (5ms)
        ✓ should send deleted customer to user if request is valid (5ms)

 PASS  tests/integration/genres.test.js
  /api/genres
    GET/
      ✓ Should return all genres when send GET request (60ms)
    GET/:id
      ✓ Should return the genre by given id. (8ms)
      ✓ Should return 404 when receive an invalid id (5ms)
    POST/
      ✓ Should return 401 when user not logged in. (5ms)
      ✓ Should return 400 when genre name is less than 5 character (3ms)
      ✓ Should return 400 when genre name is more than 50 character (3ms)
      ✓ Should save the genres req is valid (7ms)
      ✓ Should return genre if req is valid (4ms)
    PUT/
      ✓ should return 401 if user not provided token (12ms)
      ✓ should return 400 if id not found (11ms)
      ✓ should return 400 if genre no name provided (10ms)
      ✓ should return 400 if genre name lessThan 5 character (13ms)
      ✓ should return 400 if genre name moreThan 50 character (14ms)
      ✓ should return 200 if genre name is valid (28ms)
      ✓ should update genre by the given id (9ms)
      ✓ should place updated genre into res.body (6ms)
    DELETE/
      ✓ should return 401 if token not provided (4ms)
      ✓ should return 403 if user not admin (5ms)
      ✓ should return 404 if genre not found (5ms)
      ✓ should return 200 if user is admin and id is valid (6ms)
      ✓ should remove genre by given id if user is admin and id is valid (5ms)
      ✓ should send removed genre to the user (6ms)

 PASS  tests/integration/return.test.js
  /api/return
    POST/
      ✓ should return 401 if user not logged in. (76ms)
      ✓ should return 400 if customerId is not provided (12ms)
      ✓ should return 400 if userId is not provided (8ms)
      ✓ should return 404 if no rental found for given customer or movie (11ms)
      ✓ should return 400 if rental already processed. (13ms)
      ✓ should return 200 if we have a valid  request (16ms)
      ✓ should set dateReturned on rental object if request is valid (17ms)
      ✓ should calculate rental fee (17ms)
      ✓ should increase number of movie in stock (17ms)
      ✓ should return rental if request is valid (13ms)

 PASS  tests/integration/authorization.test.js
  authorization-integration
    ✓ should return 401 if no token perovide (151ms)
    ✓ should return 400 if token is invalid (7ms)

info: listening on port 3000...
info: Connected to mongodb://localhost/vidly-test
 PASS  tests/unit/middlewares/authorization.test.js
  authorization-unit
    ✓ should place decoded into req.user if token is valid (3ms)

 PASS  tests/unit/models/user.test.js
  user.generateAuthToken
    ✓ Should return a valid jwt by the given payload (2ms)
```

# Built With

- @types/jest
- bcrypt
- compression
- config
- debug
- express
- express-async-errors
- fawn
- helmet
- joi
- joi-objectid
- joi-password-complexity
- jsonwebtoken
- lodash
- moment
- mongoose
- morgan
- pug
- winston
- winston-mongodb
- jest
- supertest

also linting using es-lint

## Versioning

I use SemVer for versioning. For the versions available, see the tags on this repository.

# Authors

- Pouria Tajdivand -_initial work_ -Mosh Hamedani

# License

### This project is licensed under the MIT License - see the LICENSE.md file for details

# Notes

## Section One (Building RESTful API_s)

```javascript
1. Environment variables:

  eg.
  const port = process.env.PORT;
  export PORT=5000;

2. Route parameters:

  //req.params will return a string
  eg.
  const course =
  courses.find(c=>c.id === parseInt(req.params.id))
  or
  courses.find(c=>c.id == req.params.id)

    1- route params eg.'localhost:3000/api/1380/2' app.get('/api/:year/:id',(req,res)=>{res.send(req.params.id);

    2- route queryparams eg.'localhost:3000/api/2?sortByname=1' app.get('/api/:id',(req,res)=>{res.send(req.query)});

3. Response status:
  (req,res)=>res.status(404).send('404 not found')

	404 not found | 400 bad request | 200 Ok | 500 internal server failed | 401 UNAUTHORIZED(client error) | 403 forbidden |

4. Parsing json req.body:

  "in order to express can parse json in req.body need to enable app.use(express.json()) it's actually place a piece of middleware request processing pipe line"

5. input validation using joi:

 	const Joi = require('joi');
	const schema = {name:Joi.string().min(3).required()};
	const result = Joi.validate(req.body, schema);


6. There is six falsy values in JavaScript: undefined, null, NaN, 0, "" (empty string), and false;

```

## Section Two (Express Advance Topics)

```javascript

1. module.exports.log => add it to exports object || module.exports = log => make exports an single thing!

2. installing middleware into request pipe line:
  app.use(function(req,res,next){//})

3. parsing urlencoded body {key:value}
  app.use(express.urlencoded({ extended : true }))

4. serve static files:
  app.use(express.static('public'))

5. helmet secure app by setting various header:
  app.use(helmet());

6. environment :
	process.env.NODE_ENV  by_default = undefined
  app.get('env')  by_default = development

  export NODE_ENV=production

7. config module:
	config is using to override various data for different env
	const config = require('config')
  eg. config.get('mail.host')

  use 'custom-environment-variables.json' to define costume env variables

8. debug module:
	const startupDebug = require('debug')('app:startup')
	const dbDebug = require('debug')('app:db')
  DEBUG=app:startup,app:db nodemon

9. using pug template engine
	app.set('view engine', 'pug') //express load this module
  app.set('views','./views')   //default path is './view ' override path to templates

	show a view and pass data into it:
  app.render('view', {title:'my title', massage: 'Hello World'})

10. Router:
	const router = express.Router()
	router.get
	router.post
	...
	module.exports = router

	in index.js
	app.use('/',home);

```

## Section Three (Asynchronous JavaScript)

```javascript
1. error object:
  error = new Error('error message') -> console.log(error.message)  //error message

2. handle async javaScript:

  1-using callback functions:

	console.log("Before");
	getUserName(1, getReposetories);
	console.log("After");

	function getUserName(id, callback) {
	  setTimeout(() => {
	    console.log("Get username from db...");
	    const username = [id];
	    callback(username, getCommit);
	  }, 2000);
	}

	function getReposetories(username, callback) {
	  setTimeout(() => {
	    console.log("Get reposetories from github");
	    const repos = ["repo1", "repo2", "repo3"];
	    if (username[0] === 1) callback(repos);
	  }, 2000);
	}

	function getCommit(repos) {
	  setTimeout(() => {
	    if (repos[0] === "repo1") console.log("Commit one");
	  }, 2000);
  }

  2-define Promise

	const p = new Promise((resolve,reject)=>{
	      resolve('result')
               or
               reject(new Error('error message');
      });

	p.then( result => console.log(result)).catch( err => console.log(err.message))

	eg .

  console.log("Before");

	getUserName(1)
	  .then(username => getReposetories(username))
	  .then(repos => getCommit(repos[0]))
	  .then(commit => console.log(commit))
	  .catch(err => console.log(err.nessage));

	console.log("After");

	function getUserName(id) {
	  return new Promise((resolve, reject) => {
	    setTimeout(() => {
	      resolve("username");
	    }, 2000);
	  });
	}

	function getReposetories(username) {
	  if (username === "username") {
	    return new Promise((resolve, reject) => {
	      setTimeout(() => {
		resolve(["repo1", "repo2", "repo3"]);
	      }, 2000);
	    });
	  }
	}

	function getCommit(repo) {
	  return new Promise((resolve, reject) => {
	    setTimeout(() => {
	      resolve("this is a commit!");
	    }, 2000);
	  });
	}

	2- Promise api:

	//is useful for unit testing and so on:
	const p = Promise.resolve('this is a value')
	// the promise is already resolved
	p.then(result => console.log(result))

	//Promise.all will resolve when all index of array that passed resolve for catch case will return first reject!
	const p1 = new Promise((resolve, reject) => {
	  setTimeout(() => {
	    console.log("p1: Some async operations happening");
	    return resolve(1);
	  }, 2000);
	});

	const p2 = new Promise((resolve, reject) => {
	  setTimeout(() => {
	    console.log("p2: Some async operations happening");
	    return resolve(2);
	  }, 2000);
	});

	Promise.all([p1, p2]).then(result => console.log(result)); // [1,2]

	//Promise.race will resolve as soon as each index of array that passed resolve
	Promise.race([p1, p2]).then(result => console.log(result)); // 1

	3- Async and await syntactical sugar
	// it can use await syntax every time we receive a promise:
	//the await should wrap by an async function

	console.log("Before");

	logCommit(1);

	console.log("After");

	async function logCommit(id) {
	  try {
	    const username = await getUserName(id);
	    const repos = await getReposetories(username);
	    const commit = await getCommit(repos[0]);
	    console.log(commit);
	  } catch (err) {
	    console.log(err.message);
	  }
	}

	function getUserName(id) {
	  return new Promise((resolve, reject) => {
	    setTimeout(() => {
	      resolve("username");
	    }, 2000);
	  });
	}

	function getReposetories(username) {
	  if (username === "username") {
	    return new Promise((resolve, reject) => {
	      setTimeout(() => {
		resolve(["repo1", "repo2", "repo3"]);
	      }, 2000);
	    });
	  }
	}

	function getCommit(repo) {
	  return new Promise((resolve, reject) => {
	    setTimeout(() => {
	      resolve("this is a commit!");
	    }, 2000);
	  });
	}

```

## Section Four (CRUD operation using MongoDB)

```javascript
1. creating schema in mongoose:
	const courseSchema = mongoose.Schema({
	  name:String,
	  tags:[String],
	  date:{
	    type:Date,
	    default: Date.now();
	  }
  })

  	data Type for creating schema :
  String, Number, Boolean, Array, Date, Buffer(for storing binary data), ObjectID(unique identifier)

2. creating Model in mongoose:
	const Course = mongoose.model('Course',courseSchema)
	//crating a course object:
	const course = new Course({
	name:'node',...
	})
	//save the object is a promise!!
	const result = await course.save()

3. query builder in mongoose:

  const pageNumber = 2 ; const pageSize = 10;

	const courses = await Course.find({author:'Pouria'})
				.skipe(pageNumber - 1 * pageSize)
				.limit(pageSize)
				.sort({name:-1}) or sort('-name')
				.select({name:1, author:1}) or select('name author')
				//.count()


	Comparison operators: $eq $neq $gt $gte $lt $lte $in $nin
	eg1. const course = await Course.find({price:{$gte:10, $lte:20}}
	eg2. const course = await Course.find({price:{$in:[10,20,50]})

	logical operators: or and
  eg.
  const course = await Course.find().or([{author:'Pouria'},{isPublished:true}])

  Regular expressions(regex):

	eg. const course = await Course
					//start with Mosh
					.find({author: /^Mosh/})
					// end with Hamedani and case insensitive
					.find({author: /Hamedani$/i})
					//contains Mosh
					.find({author: /.*Mosh.*/})

4. import data in mongodb:

	mongoimport --db <dbname> --collection <collectionName> --file <file-name> --jsonArray

5. updating data by mongoose:
	// queryFirst approach:

	async function updateCourse(id){
	const course = await Course.findById(id);
	//findById return null in courseSchema set _id:String
	//way one:
	course.name = 'Another name'
	course.price = 60
	//way two:
	course.set({
	name: 'Another name'
	price: 60
	})
	return await course.save()
	}

	//updateFirst approach

	async function updateCourse(id){
	return await Course.update({_id:id},{$set:{ isPublished: false }})
	}

	async function updateCourse(id){
	return await Course.findByIdAndUpdate(id, {$set:{ isPublished:false }},{new:true}) //return new value to console
	}

6. removing data in mongoose :
	// delete firs document by given filter
	await Course.deleteOne({isPublished: true});
	await Course.findByIdAndDelete(id);
	// dalete multipy document by given filter
	await Course.deleteMany({isPublished : false});

```

## Section Five (DataValidation)

```javascript
1. catch the UnhandledPromiseRejectionWarning:
	try{return await course.save()}
	catch(err){return err.message }

2. some mongoose validations:

	new mongoose.model({
		isPublished: Boolean;
		name:{
			type:String,
      required: function(){return this.isPublished}
      //it's not possible to use arrow function
			minLenght:5,
			maxlength:255,
			match : /^regex/
			enum : ['node','express','graphQl'] //only should be this values
			lowercase: true, //mongoose automaticlly convert document to lowecase,
			uppercase: true,
			trim : true,

       },
		price:{
			type: Number,
			min :10,
			max :30,
			get : v => Math.round(v); // is called when we read the value of a property
			set : v => Math.round(v); // is called when set the value of a property
		},
		date:{
			type:Date:
			min: 1997,
			max: 2019
		}
	})

3. Costume validators:

    new mongoose.schema({
      tags:{
        type: Array,
        validate:{
          validator: function(value){ value && value.length > 0};
          message : 'Every course should have at least one tag '
        }
      }
    })

4. Async validators:

   new mongoose.Schema({
     tags:{
      type:Array,
      validate:{
      isAsync: true,
      validator: (v, callback)=>{
        setTimeout(()=>{
          v && v.length > 0;
        },4000)
      }
      message: 'Every course should at least have one tag '
      }
     }
  })
```

## Section Six (Mongoose Modeling Relationships)

```javascript
1. Referencing documents:
   eg.
        const Author = new mongoose.model(
    'Author',
     mongoose.Schema({
      name: String
    })
  );

  const Course = mongoose.model(
    'Course',
    new mongoose.Schema({
      name: String,
      author: {
       type: mongoose.Schema.Types.ObjectId,
       ref : 'Author'  //collection that is referenced
      }
    })
  );

  //populate('path','select')

  eg. async function getCourses(){
    return await Course.find().populate('author','-_id name').select('-_id name');
  }

2. embedded document

  const Course = mongoose.model('Course',new mongoose.Schema({
    name : String,
    author:{
      type : new mongoose.Schema({name: String}),
      required : true
    }
  }))

  async function createCourse(name, author){
    const course = new Course({name, author});
    return await course.save()
  }

  createCourse('Node js', new Author({name: 'Mosh' }))

  update embedded document:

 async function updateCourse(id){
  // approach one:
  const course = Course.findById(id)
  course.author.name = 'Mosh Hamedani'
  return await course.save()
  //approach two:
  return await Course.update({_id:id},{$set:{       //{$unset:{author:''}}
    'author.name' : 'Mosh hamedani'
  }})
 }

3. Array of embedded documents:

   const Course = mongoose.model('Course',new mongoose.Schema({
    name: String,
    author:[ {type: new mongoose.Schema({name: String})} ]
   }))

   createCoures('React', [new Author({name: 'Mosh'}), new Author({name: 'Pouria'}))])

   // add an object

   async fucntion addAuthor(id, author){
    const course = await Course.findById(id)
    course.authors.push(author);
    return await course.save();
   }

   // removing an object

   async function removeAuthor(id, authorId){
    const course = await Coures.findById(id);
    const author = Course.authors.id(authorId);
    author.remove()
    course.save()
   }

4. Transaction

		FAWN NOT WORKED IN VIDLY RENTAL TEST

	fawn implement:
		const Fawn = require('fawn')
		Fawn.init(mongoose)
		// task object which is like the transaction
		try{
		new Fawn.Task()
			.save('rentals',rental) //('name of collection', 'object to save')
			.update('movies',{_id: movie.id},{$inc:{numberInStock: -1}}) //('name of collection',{which?},{opetator})
			.run() //it should set
			}catch(ex){console.log(ex.message)}

5. objectID
	const id = mongoose.types.ObjectId() // create a objectID
	console.log(id.getTimeStamp , mongoose.types.ObjectId.isValid(id) )

	Validating ObjectId by joi

	Joi.objectId = require('objectId')(Joi)
	//into joi schema:

	customerId : Joi.objectId().required()
```

## Section Seven (Authentication and Authorization)

```javascript
1. modify response:
  //approach 1
  res.send({name : user.name, email : user.email})
  //approach 2 using loadash.pick
  res.send(_.picK(user,['name','email'])) //will return an object with given props

2. joi-password-complexity:
  const PasswordComplexity = require('joi-password-complexity')
	const complexityOption:{
		min: 10,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2
	}
	return Joi.validate(value,new PasswordComplexity(complexityOptions))

3. hashing passwords
	const bcrypt = require('bcrypt')

	async function hashing(data){
		const salt = bcrypt.genSalt(10);
		return async bcrypt.hash(data,salt)
	}
	//compare hash is valid:
		await bcrypt.compare(data,hash) //return true or false

4. JWT
	//sign a jwt
	const jwt = require('jsonwebtoken')
	const token = jwt.sign({_id:user._id},'jwtPrivateKey') //first arg === payload

	//if jwtPriveteKey not set:

	if(!config.get('jwtPrivateKey')){
		console.error('FATAL ERROR: jwtPrivateKey is not defined');
		process.exit(1) => // 0 === OK
	}

5. setting res Header:

	res.header('x-auth-token','token').send('hello') //first arg is name of header second is payload

6. Adding methods to models

	const userSchema = new mongoose.Schema({
		name: String
	})

	userSchema.methods.generateToken = function(){
		const _id = this._id //we can't user arrow function cuz this
		return _id;
	}

	const user = mongoose.model('User',userSchema)

7. Authorization jwt
	//access header:
	const token = req.header('x-auth-token');

	try{
		const decoded = jwt.verify(token,'jwtPrivateKey')
		req.user = decoded
		next()
	}catch(ex){
	res.status(400).send(ex.message);
	}

8. Protecting Routes
	router.post('/', MIDDLEWARE or [middlewareOne , middlewareTwo], (req,res)=>{//})
	//middleware(s) will execute before next function
```

## Section Eight(Handling and Logging Errors)

```javascript
1. handling error by middlewares:
	eg.
	router.get('/',(req,res,next)=>{
		try{//}
		catch(ex){next(ex)}
	})
	// express error middleware should use after all middlewares.
	app.use(function(err,req,res,**next**){
	 	//log the exception 3.loggger
		res.status(500).send('something field.')
	})

2. replace all try catch by middleware:
	// approach 1 using own asyncMiddleWare:
	eg.
	async asyncMiddleWare(handler){
		return async (req,res,next)=>{
			try{
				await handler(req,res)
			}catch(ex){
				next(ex)
			}
		}
	}

	router.get('/',asyncMiddleWare(
		(req,res)=> res.send(req.value)
	))
	// approach 2 using express-async-errors
	require('express-async-errors')

3. logging:

	setup 'winston@2.4.0**':
	const winston = require('winston');
	winston.add(winston.transports.File, {filename: 'logfile.log'});

	logging:
	eg. winston.error(err.message, err) //second arg is metadata

	//logging level:
	1.winston.error 2.winston.warn 3.winston.info 4.winston.verbose 5.winston.debug 6.winston.silly

// store errors in mongodb:
	npm i winston-mongodb@3.0.0

	require('winston-mongodb')

	winston.add(winston.transport.MongoDB, {db:'mongodb://localhost/playground',
																					level: 'info' //only level 1-3 will store}

4. handling uncaught exception // exception that happening in node level:

	process.on('uncaughtException', (ex) =>{
		console.log('UNCAUGHT EXCEPTION')
		winston.error(ex.message, ex)
		process.exit(1) //as best practice exit the process every time have uncouthError or rejection
	})
// this approach only work with sync codes

5. handle promise rejection

	process.on('unhadledRejection',(ex)=>{
		console.log('UNHADLED REJECTION');
		winston.error(err.message, err);
		process.exit(1)
	})

6. handle uncoughtExeption and unhandledRejection using winston: //not working ????

	winston.handleException( new winston.transport.File({filename: 'uncoughtException.log'})) //handle uncough exception

	process.on('unhadledRejection',(ex)=>{
		throw ex;
	})
```

## Section Eight (Unit Testing)

```javascript
1. intalling jest:
	npm i jest --save-dev  //flag is to not deploy dependency
	npm i @types/jest
	into package.json scripts:{"test":"jest"} or {"test":"test --watchAll"}

2. writing command:
	it('name',()=>{
		const result = function(1);
		expect(result).toBe(1)
		})

		"matcehers :"
		//Truthly	toBeNull  toBeUndefined  toBeDefined toBeTruthly toBeFalsy
		//Numbers	toBe toEqual toBeGreaterThan toBeGreaterThanOrEqual toBeLessThan toBeLessThanOrEqual toBeCloseTo
		//Strings toMatch toContain

3. grouping tests:

	describe('groupName',()=>{
		//it
		//it
		//it
	})

4. testing string should not be too specific eg. .toMatch(/Mosh/) or .toContain('Mosh')

5. testing array
	eg.
		describe('getCurrencies',()=>{
			it('should return supported currencies',()=>{
				const result = getCurrncies()
				// too general
					expect(result).toBeDefined;
					expect(result).not.toBeNull

			// too specific
				expect(result[0]).toBe('USD')
				expect(result[1]).toBe('EUR')
			// proper way
				expect(result).toContain('USD')
				expect(result).toContain('EUR')
			//Ideal way
				expect(result).toEqual(expect.arrayContaining(['USD','EUR']))
			})
		})

6. testing objects:
	1 //toBe compare the reference into memory too  but toEqual just compare equality:
		toBe({id : 1}) => not passed
		toEqual({id: 2}) => passed

	2 //test specific props
		expect(result).toMatchObject({id:1, name: 'ali'})
		expect(result).toHaveProperty('id',1)


7. testing exceptions

  eg.

		except(()=>{registerUser(null)}).toThrow();

8. creating Moke function
		// Unit testing should not related on external dependency:
		eg.
			it('should discount totalPrice if customer point be more than 10', () => {
				const order = { customerId: 1, totalPrice: 20 };
				db.getCustomerSync = function(customerId) {
					return { id: customerId, points: 20 };
				};
				lib.applyDiscount(order);
				expect(order.totalPrice).toEqual(18);
			});

9. jest mock functions
			const mockFunctuion  = jest.fn()
			mockFunctuion.mokeReturnValue(1)
			mockFunctuion.mokeResolveValue(1)
			mockFunctuion.mokeRejectValue(new Error('...'))

			// mock functions matchers:
			expect(mockFunctuion).toHaveBeenCalled()
			expect(mockFunctuion).toHaveBeenCalledWith( args )
			expect(mockFunctuion.mock.calls[0][0]).toBe(value)
```

## Section Nine(Integration testing)

```javascript

1. see troubleShot in jest terminal : "script" {"test":"jest --watchAll --verbose"}

for mongoose error ./jest.config.js : module.exports = {testEnvironment: 'node'}

2.  winston-mongodb configuration cuz bug in integration test

2. in order to using database or other external dependency to will be needed to setup it s env:

	eg. config/test.json:
				{"db":"mongodb://localhost/vidly-test", "jwtPrivateKey": "123"}

3. in order to test express apk need to install supertest lib "npm i --save-dev supertest"

4. writing api tests:
	1 make sure to require server : let server = require('../index')
			*/ beforeEach() and afterEach()  funtions provided by jest will execude before and after test block:
					make sure run server and close it before and after integration test:

				eg. beforeEach(()=>{ server = require('../index'})
						afterEach(async()=> {await sever.close()}) */

	2 sending api req using supertest:
		const request = require('supertest')
		eg.
			it('Should return all genres when send GET req',async()=>{
				const res = await request(server).get('api/genres');
				expect(res.status).toBe(200)
			})

5. add data to db and test it:
	eg.
		beforeEach(async()=>{await server.close(), await Genre.deleteMany({})}) //make sure also remove db after test
		it('Should return all genres when send Get req',async()=>{
			await Genre.collection.insertMany([{name: "genre1"},{name: 'genre2'}] , (err, docs)=>{} ) //using to insert many data to mongodb.

			const res = await request(server).get('/api/genres')

			expect(res.body.length).toBe(2)
			expect(res.body.some( g => g.name === 'genre1')).toBeTruthy();
			expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
		})

6. send body using supertest => response= await request(server).post('/api/genres/').send({name: 'genre2'})

7. set the header of request using supertest => requst(server).post('/api/genres').set('x-auth-token', '123'):
	when using set method evething you pass as second arg will be an string eg: .set('x-auth-token', 'null' )

8. console.log(new Array(5).join('a')) 'aaaa'

9. enable jest coverage report "test": "jest --watchAll --verbose --coverage  "

10. port on use  "scripts": {"test": "jest --watchAll --verbose --forceExit --maxWorkers=1"},

```

## Section Ten (Test Driven Development)

```javascript
1. in oop two types of methods:
	Instance methods : available in instance of class eg. new User().genrateAuthToken()
	Static methods : directly available in class eg. Rental.lookup()

  add static method to mongoose model:

   eg.
   rentalSchema.statics.lookup = function(customerId, movieId){ return this.findOne({'customer._id': customerId,'movie_id': movie_id})}

																		// it can t using arrow function here. cuz this
```

- npm i helmet comperssion(use to compress http response to Client)
  app.use(helmet())
  app.use(compression())
