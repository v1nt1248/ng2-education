declare namespace app {

  type Login = {
    name: string;
    password: string;
  }

  type Auth = {
    auth: any;
    uid: string;
    provider: number;
  }

  type FieldErrorObj = {
    limit?: boolean;
    text: string;
  }

  type PhoneType = 'мобильный' | 'рабочий' | 'домашний' | 'иной';

  type EmailType = 'личный' | 'рабочий' | 'иной';

  type AddressType = 'домашний' | 'рабочий' | 'иной';

  type Communication = {
    type: app.PhoneType | app.EmailType;
    value: string;
  }

  type Address = {
    city: string;
    street: string;
    house: string;
    build: string;
    room: string;
    type: AddressType;
  }

  type UserBase = {
    avatar: string;
    firstName: string;
    middleName: string;
    lastName: string;
    birthDate: Date;
    company: string;
    position: string;
  }

  type UserCommunication = {
    phones: app.Communication[];
    emails: app.Communication[];
  }

  type Contact = {
    id: string;
    base: app.UserBase;
    communication: app.UserCommunication,
    place: app.Address[];
  }


}
