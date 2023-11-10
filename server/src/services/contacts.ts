import { Contacts, ContactType } from '../db/contactModel';

const getAllContacts = async (): Promise<ContactType[]> => {
  const result = await Contacts.find({});
  return result;
};

const getOneContact = async (name: string): Promise<ContactType | null> => {
  const result = await Contacts.findOne({ name: name });
  return result;
};

const addNewContact = async ({ name, job_title, comment, avatar, links }: ContactType): Promise<ContactType | null> => {
  const { github, linkedin, email, resume } = links;

  const newContact = {
    name,
    job_title,
    comment,
    avatar,
    links: {
      github,
      linkedin,
      email,
      resume,
    },
  };
  try {
    const newContactS = new Contacts(newContact);
    await newContactS.save();
    return newContactS;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const updateOneContact = async (contactId: string, body: Partial<ContactType>): Promise<ContactType | null> => {
  try {
    await Contacts.findByIdAndUpdate(contactId, {
      $set: body,
    });
    return await Contacts.findById(contactId);
  } catch (err) {
    console.error(err);
    return null;
  }
};

const deleteContactById = async (contactId: string): Promise<ContactType | null> => {
  console.log(contactId);
  const deletedContact = await Contacts.findByIdAndRemove(contactId);
  return deletedContact;
};

export = {
  getAllContacts,
  getOneContact,
  addNewContact,
  updateOneContact,
  deleteContactById,
};
