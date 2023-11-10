import { Request, Response, NextFunction } from 'express';
import { ContactType } from '../db/contactModel';
import {
  getAllContacts,
  getOneContact,
  addNewContact,
  deleteContactById,
  updateOneContact,
} from '../services/contacts';

export const getContacts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      contentType: 'application/json',
      ResponseBody: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req: Request<ContactType>, res: Response, next: NextFunction) => {
  try {
    const contact = await getOneContact(req.params.name);
    res.status(200).json({
      contentType: 'application/json',
      ResponseBody: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req: Request<ContactType>, res: Response, next: NextFunction) => {
  try {
    const newContact = await addNewContact(req.body);
    res.status(201).json({
      contentType: 'application/json',
      ResponseBody: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req: Request<ContactType>, res: Response, next: NextFunction) => {
  try {
    const { name, ...contactData } = req.params;

    const updatedContact = await updateOneContact(name, contactData);

    if (!updatedContact) {
      return res.status(404).json({ message: "Couldn't update contact" });
    }

    res.status(200).json({
      contentType: 'application/json',
      ResponseBody: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req: Request<ContactType>, res: Response, next: NextFunction) => {
  try {
    const contacts = await deleteContactById(req.params.name);

    if (!contacts) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};

export const downloadFile = async (req: Request<ContactType>, res: Response, next: NextFunction) => {
  try {
    const name = req.params.name;
    const contact = `public/resume/${name}`;
    res.download(contact, name);
  } catch (error) {
    next(error);
  }
};

export const downloadAvatar = async (req: Request<ContactType>, res: Response, next: NextFunction) => {
  try {
    const name = req.params.name;
    const contact = `public/avatar/${name}`;
    res.download(contact, name);
  } catch (error) {
    next(error);
  }
};
