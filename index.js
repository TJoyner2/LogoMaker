const fs = require('fs');
const inquirer = require('inquirer');
const chroma = require('chroma-js');

async function getUserInputAndGenerateLogo() {
    try {
        // Prompt user for input
        const userInput = await inquirer.prompt([
            {
                type: 'input',
                name: 'text',
                message: 'Enter up to three characters:',
                validate: (input) => input.length > 0 && input.length <= 3,
            },

            {
                type: 'input',
                name: 'textColor',
                message: 'Enter text color (keyword or hex):',
            },

            {
                type: 'list',
                name: 'shape',
                message: 'Choose a shape:',
                choices: ['circle', 'triangle', 'square'],
            },

            {
                type: 'input',
                name: 'shapeColor',
                message: 'Enter shape color (keyword or hex):',
            },
        ]);

        // Initialize svgContent
        let svgContent = '';

        // Generate SVG content
        if (userInput.shape === 'square') {
            svgContent =
                `<svg xmlns="http://www.w3.org/2000/svg"width="200" height="200">
      <rect width="100%" height="100%" fill="${chroma(userInput.shapeColor)}"/>
      <text x="50" y="50" font-size="30" fill="${chroma(userInput.textColor)}" dominant-baseline="middle">${userInput.text}</text>
    </svg>`;

        } else if (userInput.shape === 'circle') {
            svgContent =
                `<svg xmlns="http://www.w3.org/2000/svg"width="200" height="200">
      <circle r="45" cx="50" cy="50" fill="${chroma(userInput.shapeColor)}"/>
      <text x="50" y="50" font-size="30" fill="${chroma(userInput.textColor)}" dominant-baseline="middle">${userInput.text}</text>
    </svg>`;

        } else if (userInput.shape === 'triangle') {
            svgContent =
                `<svg xmlns="http://www.w3.org/2000/svg"width="200" height="200">
      <polygon points="100,10 150,190 50,190" fill="${chroma(userInput.shapeColor)}"/>
      <text x="50" y="50" font-size="30" fill="${chroma(userInput.textColor)}" dominant-baseline="middle">${userInput.text}</text>
   </svg>`;
        }


        // Write SVG content to logo.svg file
        fs.writeFileSync('logo.svg', svgContent);
        console.log('Generated logo.svg');
    } catch (error) {
        console.error('Error:', error);
    }
}
// Call the async function to prompt user input and
getUserInputAndGenerateLogo();
