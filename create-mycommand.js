#!/usr/bin/env node

const gitClone = require('git-clone');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const repositoryUrl = 'https://github.com/Thiago099/magic-dom-vite-example.git'; // Replace with the URL of the repository you want to clone

const customName = process.argv[2];

if (!customName) {
  console.error('Please provide the project name. example: "npm create magic-dom@latest my-project-name"');
  process.exit();
}

const cloneDirectory = path.join(process.cwd(), customName);

if(fs.existsSync(cloneDirectory))
{
  console.error('Project directory already exists');
  process.exit();
}

gitClone(repositoryUrl, cloneDirectory, null, (err) => {
  if (err) {
    console.error('Failed to create project:', err);
    process.exit();
  }

  fs.rmSync(path.join(cloneDirectory, '.git'), { recursive: true });
  fs.rmSync(path.join(cloneDirectory, 'update.ps1'), { recursive: true });

  console.log('Project successfully created.');
  process.exit();
});

