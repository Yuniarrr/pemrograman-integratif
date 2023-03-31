import * as jspb from 'google-protobuf'



export class Contacts extends jspb.Message {
  getNama(): string;
  setNama(value: string): Contacts;

  getEmail(): string;
  setEmail(value: string): Contacts;

  getPhone(): string;
  setPhone(value: string): Contacts;

  getCategory(): string;
  setCategory(value: string): Contacts;

  getDescription(): string;
  setDescription(value: string): Contacts;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Contacts.AsObject;
  static toObject(includeInstance: boolean, msg: Contacts): Contacts.AsObject;
  static serializeBinaryToWriter(message: Contacts, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Contacts;
  static deserializeBinaryFromReader(message: Contacts, reader: jspb.BinaryReader): Contacts;
}

export namespace Contacts {
  export type AsObject = {
    nama: string,
    email: string,
    phone: string,
    category: string,
    description: string,
  }
}

export class Contact_id extends jspb.Message {
  getId(): string;
  setId(value: string): Contact_id;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Contact_id.AsObject;
  static toObject(includeInstance: boolean, msg: Contact_id): Contact_id.AsObject;
  static serializeBinaryToWriter(message: Contact_id, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Contact_id;
  static deserializeBinaryFromReader(message: Contact_id, reader: jspb.BinaryReader): Contact_id;
}

export namespace Contact_id {
  export type AsObject = {
    id: string,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class ContactList extends jspb.Message {
  getContactsList(): Array<Contacts>;
  setContactsList(value: Array<Contacts>): ContactList;
  clearContactsList(): ContactList;
  addContacts(value?: Contacts, index?: number): Contacts;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContactList.AsObject;
  static toObject(includeInstance: boolean, msg: ContactList): ContactList.AsObject;
  static serializeBinaryToWriter(message: ContactList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContactList;
  static deserializeBinaryFromReader(message: ContactList, reader: jspb.BinaryReader): ContactList;
}

export namespace ContactList {
  export type AsObject = {
    contactsList: Array<Contacts.AsObject>,
  }
}

