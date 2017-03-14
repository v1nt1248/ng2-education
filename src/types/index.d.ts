declare namespace app {

  type ScrollingData = {
    childs: HTMLCollection;
    qtChilds: number;
    position: number;
    delta: number;
  }

  type Login = {
    name: string;
    password: string;
  }

  type Auth = {
    auth: any;
    uid: string;
    provider: number;
  }

  type ErrorTextObj = {
    name: string;
    limit?: boolean;
    text: string;
  }

/*
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
    phone: string;
    email: string;
  }

  type Contact = {
    id: string;
    base: app.UserBase;
    communication: app.UserCommunication,
    place: string;
  }
*/

  type Contact = {
    id?: string;
    avatar?: string;
    firstName: string;
    middleName?: string;
    lastName?: string;
    birthDate?: Date;
    company?: string;
    position?: string;
    phone?: string;
    email?: string;
    place?: string;
  }


}
