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


}
