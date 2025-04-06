const fs = require('fs');
const path = require('path');

const profileFilePath = path.join(__dirname, '../data/users.json');

function getAccounts() {
  if (!fs.existsSync(profileFilePath)) {
    fs.writeFileSync(profileFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(profileFilePath);
  return JSON.parse(data);
}

function insertAccount(accounts) {
  fs.writeFileSync(profileFilePath, JSON.stringify(accounts, null, 2));
}

function editProfile(id, updatedData) {
  const accounts = getAccounts();
  const index = accounts.findIndex(b => b.id === id);
  if (index === -1) return null;

  accounts[index] = { ...accounts[index], ...updatedData };
  insertAccount(accounts);
  return accounts[index];
}

function getaccountById(id) {
  const accounts = getAccounts();
  const account = accounts.find((account) => account.id === id);
  console.log(`Looking for account with ID ${id}, found:`, account);
  return account || null; 
}

module.exports = {
  getAccounts,
  insertAccount,
  editProfile,
  getaccountById
};