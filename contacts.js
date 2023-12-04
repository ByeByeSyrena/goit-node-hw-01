const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const crypto = require("crypto");

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
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      ({ id }) => id !== contactId.toString()
    );
    const stringifiedContacts = JSON.stringify(updatedContacts);
    console.log(updatedContacts);
    fs.writeFile(contactsPath, stringifiedContacts, "utf8", (err) => {
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
  const newContact = {
    id: crypto.randomBytes(16).toString("hex"),
    name,
    email,
    phone,
  };

  const stringifiedContact = JSON.stringify(newContact);

  fs.writeFile(contactsPath, [...data, stringifiedContact], "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("File written successfully.");
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
