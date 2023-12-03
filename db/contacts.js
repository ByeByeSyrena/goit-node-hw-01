const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath);
    const result = JSON.parse(readResult);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter((id) => {
      id === contactId;
    });
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter((id) => {
      id !== contactId;
    });
  } catch (err) {
    console.log(err);
  }
}

function addContact(name, email, phone) {
  // ...your code
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
