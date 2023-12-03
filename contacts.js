const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(readResult);
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => {
      return contact.id === contactId.toString();
    });

    if (contact) {
      console.log(contact);
    } else {
      console.log(`Contact with ID ${contactId} not found.`);
    }
  } catch (error) {
    console.error(`Error fetching contacts: ${error.message}`);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    let contacts = await listContacts();
    const contact = contacts.filter(({ id }) => id !== contactId.toString());
    console.log(contact);
    fs.writeFile(contactsPath, newContacts, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("File written successfully.");
      }
    });
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
