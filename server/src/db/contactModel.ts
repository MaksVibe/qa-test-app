import { Document, Schema, model, Model } from 'mongoose';

export type ContactType = {
  name: string;
  job_title: string;
  comment: string;
  avatar: string;
  links: Links;
};

interface Links {
  github: string;
  linkedin: string;
  email: string;
  resume: string;
}

const contactsSchema = new Schema<ContactType & Document>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  job_title: {
    type: String,
    required: [true, 'Job is required'],
  },
  comment: {
    type: String,
    // required: [true, "Description is required"],
  },
  avatar: {
    type: String,
  },
  links: {
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    email: {
      type: String,
    },
    resume: {
      type: String,
    },
  },
});

export const Contacts: Model<ContactType & Document> = model('contacts', contactsSchema);
