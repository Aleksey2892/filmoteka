import addOnlineUser from './addOnlineUser';

export let users = [
  {
    userId: 0,
    userName: 'admin',
    userPass: 'admin',
    isOnline: false,
    lib: {
      watched: [],
      queue: [],
    },
  },
];

// export let lib = [
//   {
//     watched: [],
//     queue: [],
//   },
// ];

try {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
  } else {
    users = [...JSON.parse(localStorage.getItem('users'))];

    users.find(el => {
      if (el.isOnline === true) {
        const userName = localStorage.getItem('isOnline');
        addOnlineUser(userName);
      }
    });
  }
} catch (error) {
  console.log(error);
}
