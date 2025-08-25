// Test script to verify form validation logic
const testValidation = () => {
  console.log('Testing Form Validation Logic...\n');

  // Mock validation function (simplified version)
  const validateForm = (formData) => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }

    return errors;
  };

  // Test cases
  const testCases = [
    {
      name: 'Empty form',
      data: { name: '', email: '', password: '' },
      expectedErrors: ['name', 'email', 'password']
    },
    {
      name: 'Valid data',
      data: { name: 'John Doe', email: 'john@example.com', password: 'Password123' },
      expectedErrors: []
    },
    {
      name: 'Invalid email',
      data: { name: 'John Doe', email: 'invalid-email', password: 'Password123' },
      expectedErrors: ['email']
    },
    {
      name: 'Weak password',
      data: { name: 'John Doe', email: 'john@example.com', password: 'weak' },
      expectedErrors: ['password']
    }
  ];

  let allPassed = true;

  testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}: ${testCase.name}`);
    const errors = validateForm(testCase.data);
    const errorKeys = Object.keys(errors);
    
    const passed = 
      errorKeys.length === testCase.expectedErrors.length &&
      testCase.expectedErrors.every(key => errorKeys.includes(key));
    
    if (passed) {
      console.log('✅ PASSED');
    } else {
      console.log('❌ FAILED');
      console.log('Expected errors:', testCase.expectedErrors);
      console.log('Actual errors:', errorKeys);
      allPassed = false;
    }
    console.log('---');
  });

  if (allPassed) {
    console.log('🎉 All validation tests passed!');
  } else {
    console.log('⚠️  Some tests failed. Please review the validation logic.');
  }
};

testValidation();
