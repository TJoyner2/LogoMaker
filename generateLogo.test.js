const fs = require('fs');
const { generateLogo } = require('./generateLogo.test.js')
const inquirer = require('inquirer');

jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

describe('generateLogo', () => {
  it('generates logo with valid input', async () => {
    // Mock user input
    inquirer.prompt.mockResolvedValueOnce({
      text: 'ABC',
      textColor: 'black',
      shape: 'circle',
      shapeColor: 'blue',
    });

    // Run the function
    await generateLogo();

    // Check if logo.svg file is created
    expect(fs.existsSync('logo.svg')).toBe(true);
  });

  it('handles invalid input gracefully', async () => {
    // Mock user input with invalid text length
    inquirer.prompt.mockResolvedValueOnce({
      text: '',
      textColor: 'black',
      shape: 'circle',
      shapeColor: 'blue',
    });
    
    // Run the function
    await generateLogo();
    // Check if logo.svg file is NOT created
    expect(fs.existsSync('logo.svg')).toBe(false);
  });
});