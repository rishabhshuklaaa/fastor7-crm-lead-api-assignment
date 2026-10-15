const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await Employee.create({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: 'Employee registered successfully',
      data: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email }).select('+password');
    if (!employee) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(employee._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
      },
    });
  } catch (err) {
    next(err);
  }
};