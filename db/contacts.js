const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const readResult = await fs.readFile(contactsPath, "utf-8");
    console.log(readResult);
    const result = JSON.parse(readResult);
    // console.table(result);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ contact }) => contact.id === contactId);

    if (contact) {
      console.log(contact);
    } else {
      console.log(`Contact with ID ${contactId} not found.`);
    }

    return contact;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    let contacts = await listContacts();
    const contact = contacts.filter(({ id }) => id !== contactId);
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
