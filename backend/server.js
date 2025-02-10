const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require("multer");
const cors = require("cors");
const path = require("path");


const MySchema = require('./models/model');  // Import the User model
const { log } = require('@angular-devkit/build-angular/src/builders/ssr-dev-server');


const app =  express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));


// connect to MongoDB
mongoose.connect('mongodb://localhost:27017/temp')
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error(error))



// Configure Multer and Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: './uploads', // Folder where images will be stored
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });


// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));



// API to add an employee with an image
app.post('/employee/add-employee', upload.single('image'), async (req, res) => {
  try {
      const { firstname, lastname, email, phone, address, state, city, zipcode } = req.body;
      const image = req.file ? req.file.path : null;

      const newEmployee = new MySchema.Employee({
          firstname,
          lastname,
          email,
          phone,
          address,
          state,
          city,
          zipcode,
          image
      });

      await newEmployee.save();

      res.status(201).json({
          message: 'Employee added successfully',
          status: 201,
          employee: newEmployee
      });
  } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Failed to add employee', status: 500, error: err });
  }
});





// add user
app.post('/users/add-user', (req, res) => {
    console.log('Request body:', req.body);
    const { name, email, password } = req.body;
    const newUser = new MySchema.User({ name, email, password });
    newUser.save()
    .then(user => {
      console.log('User saved:', user);
      res.status(201).json({
        message: 'User added successfully',
        status: '201',
        user: user
      });
    })
    .catch(err => {
      console.error('Error saving user:', err); // Log errors
      res.status(500).json({
        message: 'Failed to add user',
        status: '500',
        error: err
      });
    });
});




// validate-user
app.post('/users/validate-user', (req, res) => {
  console.log('Request body:', req.body);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (can be restricted)
  const { email, password } = req.body;

  User.findOne({ email, password })
    .then(user => {
      if (user) {
        console.log('User found:', user);
        res.status(200).json({
          message: 'User found',
          status: '200',
          user: user
        });
      } else {
        console.log('User not found');
        res.status(404).json({
          message: 'User not found',
          status: '404'
        });
      }
    })
    .catch(err => {
      console.error('Error validating user:', err);
      res.status(500).json({
        message: 'Failed to validate user',
        status: '500',
        error: err
      });
    });
});






// add-employee
// app.post('/employee/add-employee', (req, res) => {
//   console.log('Request body:', req.body);
//   const { firstname, lastname, email, phone, address, state, city, zipcode } = req.body;
//   const newEmployee = new MySchema.Employee ({ firstname, lastname, email, phone, address, state, city, zipcode });
//   newEmployee.save()
//   .then(employee => {
//     console.log('Employee saved:', employee);
//     res.status(201).json({
//       message: 'Employee added successfully',
//       status: '201',
//       employee: employee
//     });
//   })
//   .catch(err => {
//     console.error('Error saving employee:', err);
//     res.status(500).json({
//       message: 'Failed to add employee',
//       status: '500',
//       error: err
//     });
//   });
// });




// view-employee
app.get('/employee/view-employee', (req, res) => {
  MySchema.Employee.find()
    .then(employees => {
      console.log('Employees retrieved:', employees);
      res.status(200).json({
        message: 'Employees retrieved successfully',
        status: '200',
        employees: employees
      });
    })
    .catch(err => {
      console.error('Error retrieving employees:', err);
      res.status(500).json({
        message: 'Failed to retrieve employees',
        status: '500',
        error: err
      });
    });
});



// get-employee
app.get('/employee/get-employee/:id', (req, res) => {
  const id = req.params.id;
  MySchema.Employee.findById(id)
    .then(employee => {
      if (employee) {
        console.log('Employee found:', employee);
        res.status(200).json({
          message: 'Employee found successfully',
          status: '200',
          employee: employee
        });
      } else {
        console.log('Employee not found');
        res.status(404).json({
          message: 'Employee not found',
          status: '404'
        });
      }
    })
    .catch(err => {
      console.error('Error retrieving employee:', err);
      res.status(500).json({
        message: 'Failed to retrieve employee',
        status: '500',
        error: err
      });
    });
});


// update-Employee
app.put('/employee/update-employee/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log(req.body);
  
  const { firstname, lastname, email, phone, address, state, city, zipcode } = req.body;
  MySchema.Employee.findByIdAndUpdate(id, { firstname, lastname, email, phone, address, state, city, zipcode }, { new: true })
    .then(employee => {
      if (employee) {
        console.log('Employee updated:', employee);
        res.status(200).json({
          message: 'Employee updated successfully',
          status: '200',
          employee: employee
        });
      } else {
        console.log('Employee not found');
        res.status(404).json({
          message: 'Employee not found',
          status: '404'
        });
      }
    })
    .catch(err => {
      console.error('Error updating employee:', err);
      res.status(500).json({
        message: 'Failed to update employee',
        status: '500',
        error: err
      });
    });
});




// delete-employee
app.delete('/employee/delete-employee/:id', (req, res) => {
  const id = req.params.id;
  MySchema.Employee.findByIdAndDelete(id)
    .then(employee => {
      if (employee) {
        console.log('Employee deleted:', employee);
        res.status(200).json({
          message: 'Employee deleted successfully',
          status: '200',
          employee: employee
        });
      } else {
        console.log('Employee not found');
        res.status(404).json({
          message: 'Employee not found',
          status: '404'
        });
      }
    })
    .catch(err => {
      console.error('Error deleting employee:', err);
      res.status(500).json({
        message: 'Failed to delete employee',
        status: '500',
        error: err
      });
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });