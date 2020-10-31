import mock from "../../mock";

// Contact
let data = {
  contacts: [
    {
      uid: 1,
      displayName: "Neo Nguyễn",
      about: "",
      photoURL: require("../../../assets/img/portrait/small/avatar-s-1.jpg"),
      status: "online",
    },
    {
      uid: 3,
      displayName: "Huu Loi",
      about: "",
      photoURL: require("../../../assets/img/portrait/small/avatar-s-3.jpg"),
      status: "online",
    },
    {
      uid: 2,
      displayName: "Tiền",
      about: "",
      photoURL: require("../../../assets/img/portrait/small/avatar-s-2.jpg"),
      status: "online",
    },
  ],
  chats: {
    1: {
      isPinned: true,
      msg: [
        {
          textContent: "Hôm nay có nhậu ở đâu không!",
          time: "Mon Aug 21 2020 07:45:00 GMT+0000 (GMT)",
          isSent: true,
          isSeen: false,
        },
        {
          textContent: "Có a đang nhậu ở công ty nẹ sao á?",
          time: "Mon Aug 21 2020 07:45:23 GMT+0000 (GMT)",
          isSent: false,
          isSeen: false,
        },
        {
          textContent: "Nhậu xog đi massa ngen a.",
          time: "Mon Aug 21 2020 07:45:55 GMT+0000 (GMT)",
          isSent: true,
          isSeen: true,
        },
        {
          textContent: "ok Lun.",
          time: "Mon Aug 21 2020 07:45:55 GMT+0000 (GMT)",
          isSent: false,
          isSeen: true,
        },
      ],
    },
    2: {
      isPinned: true,
      msg: [
        {
          textContent: "Hôm nay có nhậu ở đâu không!",
          time: "Mon Aug 21 2020 07:45:00 GMT+0000 (GMT)",
          isSent: true,
          isSeen: false,
        },
        {
          textContent: "Có a đang nhậu ở công ty nẹ sao á?",
          time: "Mon Aug 21 2020 07:45:23 GMT+0000 (GMT)",
          isSent: false,
          isSeen: false,
        },
        {
          textContent: "Nhậu xog đi massa ngen a.",
          time: "Mon Aug 21 2020 07:45:55 GMT+0000 (GMT)",
          isSent: true,
          isSeen: true,
        },
        {
          textContent: "ok Lun.",
          time: "Mon Aug 21 2020 07:45:55 GMT+0000 (GMT)",
          isSent: false,
          isSeen: true,
        },
      ],
    },
    3: {
      isPinned: false,
      msg: [
        {
          textContent: "Hi",
          time: "Mon Aug 21 2020 07:45:00 GMT+0000 (GMT)",
          isSent: true,
          isSeen: true,
        },
        {
          textContent: "Hello. How can I help You?",
          time: "Mon Aug 22 2020 07:45:15 GMT+0000 (GMT)",
          isSent: false,
          isSeen: false,
        },
        {
          textContent:
            "Can I get details of my last transaction I made last month?",
          time: "Mon Aug 22 2020 07:46:10 GMT+0000 (GMT)",
          isSent: true,
          isSeen: true,
        },
        {
          textContent:
            "We need to check if we can provide you such information.",
          time: "Mon Aug 22 2020 07:45:15 GMT+0000 (GMT)",
          isSent: false,
          isSeen: true,
        },
        {
          textContent: "I will inform you as I get update on this.",
          time: "Mon Aug 22 2020 07:46:15 GMT+0000 (GMT)",
          isSent: false,
          isSeen: true,
        },
        {
          textContent: "If it takes long you can mail me at my mail address",
          time: "Mon Aug 22 2020 07:46:20 GMT+0000 (GMT)",
          isSent: true,
          isSeen: false,
        },
      ],
    },
  },
};

// GET : CHATS AND CONTACTS
mock.onGet("/api/app/chat/chats").reply(() => {
  return [200, data];
});

// GET : CHAT LIST
mock.onGet("/api/app/chat/chat-contacts").reply((request) => {
  const chatContactsArray = data.contacts.filter((contact) => {
    if (data.chats[contact.uid]) return data.chats[contact.uid];
    else return null;
  });

  return [200, chatContactsArray];
});

// POST : SEND MESSAGE
mock.onPost("api/app/chat/send-message").reply((request) => {
  let reqdata = JSON.parse(request.data);
  const { contactId, message, isPinned } = reqdata;
  if (data.chats[contactId]) {
    data.chats[contactId].msg.push(message);
  } else {
    let newMsg = {
      [contactId]: {
        isPinned: isPinned,
        msg: [message],
      },
    };
    Object.assign(data.chats, newMsg);
  }
  return [200];
});
mock.onPost("/api/apps/chat/mark-all-seen/").reply((request) => {
  let contactId = JSON.parse(request.data).contactId;

  // Get chat data
  let marked = data.chats[contactId];

  marked !== undefined &&
    marked.msg.forEach((msg) => {
      msg.isSeen = true;
    });

  return [200];
});
// POST : TOGGLE PINNED
mock.onPost("/api/apps/chat/set-pinned/").reply((request) => {
  let { contactId, value } = JSON.parse(request.data);
  data.chats[contactId].isPinned = data.chats[contactId].isPinned = value;
  return [200];
});
