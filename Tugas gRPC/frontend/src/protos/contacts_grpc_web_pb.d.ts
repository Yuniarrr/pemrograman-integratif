import * as grpcWeb from 'grpc-web';

import * as server_contacts_pb from '../server/contacts_pb';


export class ContactServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getAll(
    request: server_contacts_pb.Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: server_contacts_pb.ContactList) => void
  ): grpcWeb.ClientReadableStream<server_contacts_pb.ContactList>;

  addContact(
    request: server_contacts_pb.Contacts,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: server_contacts_pb.Contacts) => void
  ): grpcWeb.ClientReadableStream<server_contacts_pb.Contacts>;

  deleteContact(
    request: server_contacts_pb.Contact_id,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: server_contacts_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<server_contacts_pb.Empty>;

  updateContact(
    request: server_contacts_pb.Contact_id,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: server_contacts_pb.Contacts) => void
  ): grpcWeb.ClientReadableStream<server_contacts_pb.Contacts>;

  getContact(
    request: server_contacts_pb.Contact_id,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: server_contacts_pb.Contacts) => void
  ): grpcWeb.ClientReadableStream<server_contacts_pb.Contacts>;

  createDatabase(
    request: server_contacts_pb.Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: server_contacts_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<server_contacts_pb.Empty>;

  deleteDatabase(
    request: server_contacts_pb.Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: server_contacts_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<server_contacts_pb.Empty>;

}

export class ContactServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getAll(
    request: server_contacts_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<server_contacts_pb.ContactList>;

  addContact(
    request: server_contacts_pb.Contacts,
    metadata?: grpcWeb.Metadata
  ): Promise<server_contacts_pb.Contacts>;

  deleteContact(
    request: server_contacts_pb.Contact_id,
    metadata?: grpcWeb.Metadata
  ): Promise<server_contacts_pb.Empty>;

  updateContact(
    request: server_contacts_pb.Contact_id,
    metadata?: grpcWeb.Metadata
  ): Promise<server_contacts_pb.Contacts>;

  getContact(
    request: server_contacts_pb.Contact_id,
    metadata?: grpcWeb.Metadata
  ): Promise<server_contacts_pb.Contacts>;

  createDatabase(
    request: server_contacts_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<server_contacts_pb.Empty>;

  deleteDatabase(
    request: server_contacts_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<server_contacts_pb.Empty>;

}

