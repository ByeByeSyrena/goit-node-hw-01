const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath, "utf-8");
    const result = JSON.parse(readResult);
    console.table(result);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    console.table(contact);
    return contact;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    // let contacts = await listContacts();
    // contacts = contacts.filter(({ id }) => id !== contactId);
  } catch (err) {
    console.log(err);
    return [];
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
